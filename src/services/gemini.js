/**
 * gemini.js
 * -----------------------------------------------------------------------
 * SERVER-SIDE ONLY. This module talks directly to the Gemini API and
 * reads the API key from process.env. It is imported exclusively by
 * /api/chat.js (a Vercel serverless function) — never import this file
 * from frontend/browser code, or the key would need to be exposed.
 * -----------------------------------------------------------------------
 */

// "gemini-flash-latest" is Google's alias that always points at the current
// stable Flash release, so you don't need to update this string by hand as
// Google ships new model versions. Pin to an exact version (e.g.
// "gemini-3.1-flash") instead if you want reproducible behavior.
const GEMINI_MODEL = "gemini-flash-latest";
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`;

/**
 * Converts our simple {role, content} history into Gemini's `contents` format.
 * Gemini uses "model" instead of "assistant" for the assistant role.
 */
function toGeminiContents(history, message) {
  const contents = (history || [])
    .filter((m) => m && typeof m.content === "string" && m.content.trim())
    .map((m) => ({
      role: m.role === "assistant" ? "model" : "user",
      parts: [{ text: m.content }],
    }));

  contents.push({ role: "user", parts: [{ text: message }] });
  return contents;
}

/**
 * Calls Gemini with the given system prompt, conversation history, and
 * new user message. Returns the plain text reply.
 *
 * @param {string} systemPrompt
 * @param {Array<{role: string, content: string}>} history
 * @param {string} message
 */
export async function callGemini(systemPrompt, history, message) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is not configured on the server.");
  }

  const payload = {
    systemInstruction: {
      parts: [{ text: systemPrompt }],
    },
    contents: toGeminiContents(history, message),
    generationConfig: {
      temperature: 0.6,
      topP: 0.9,
      maxOutputTokens: 700,
    },
    safetySettings: [
      { category: "HARM_CATEGORY_HARASSMENT", threshold: "BLOCK_ONLY_HIGH" },
      { category: "HARM_CATEGORY_HATE_SPEECH", threshold: "BLOCK_ONLY_HIGH" },
      { category: "HARM_CATEGORY_SEXUALLY_EXPLICIT", threshold: "BLOCK_ONLY_HIGH" },
      { category: "HARM_CATEGORY_DANGEROUS_CONTENT", threshold: "BLOCK_ONLY_HIGH" },
    ],
  };

  const res = await fetch(`${GEMINI_URL}?key=${apiKey}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    let errText = "";
    try {
      const errBody = await res.json();
      errText = errBody?.error?.message || "";
    } catch {
      // ignore
    }
    throw new Error(
      `Gemini request failed (${res.status}): ${errText || "unknown error"}`
    );
  }

  const data = await res.json();

  const candidate = data?.candidates?.[0];
  const finishReason = candidate?.finishReason;

  if (finishReason === "SAFETY" || finishReason === "RECITATION") {
    return "I'm not able to respond to that one — could you rephrase, or would you like help with something about your patio project instead?";
  }

  const text = candidate?.content?.parts?.map((p) => p.text || "").join("").trim();

  if (!text) {
    throw new Error("Gemini returned an empty response.");
  }

  return text;
}

export default callGemini;

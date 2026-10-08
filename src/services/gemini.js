const GEMINI_MODEL = process.env.GEMINI_MODEL || "gemini-flash-latest";
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`;

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

export async function callGemini(systemPrompt, history, message) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey)
    throw new Error("GEMINI_API_KEY is not configured on the server.");

  const payload = {
    systemInstruction: { parts: [{ text: systemPrompt }] },
    contents: toGeminiContents(history, message),
    generationConfig: {
      temperature: 0.6,
      topP: 0.9,
      maxOutputTokens: 4096, // room for thinking tokens + the answer
    },
    safetySettings: [
      { category: "HARM_CATEGORY_HARASSMENT", threshold: "BLOCK_ONLY_HIGH" },
      { category: "HARM_CATEGORY_HATE_SPEECH", threshold: "BLOCK_ONLY_HIGH" },
      {
        category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
        threshold: "BLOCK_ONLY_HIGH",
      },
      {
        category: "HARM_CATEGORY_DANGEROUS_CONTENT",
        threshold: "BLOCK_ONLY_HIGH",
      },
    ],
  };

  const res = await fetch(GEMINI_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-goog-api-key": apiKey,
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    let errText = "";
    try {
      const errBody = await res.json();
      errText = errBody?.error?.message || "";
    } catch {}
    console.error("Gemini error", res.status, errText);
    throw new Error(
      `Gemini request failed (${res.status}): ${errText || "unknown error"}`,
    );
  }

  const data = await res.json();
  const candidate = data?.candidates?.[0];
  const finishReason = candidate?.finishReason;

  if (finishReason === "SAFETY" || finishReason === "RECITATION") {
    return "I'm not able to respond to that one — could you rephrase, or would you like help with something about your patio project instead?";
  }

  const text = candidate?.content?.parts
    ?.filter((p) => !p.thought)
    .map((p) => p.text || "")
    .join("")
    .trim();

  if (!text) {
    console.error(
      "Empty Gemini response",
      JSON.stringify({
        finishReason,
        usage: data?.usageMetadata,
        promptFeedback: data?.promptFeedback,
      }),
    );
    throw new Error(
      `Gemini returned an empty response (finishReason: ${finishReason || "none"}).`,
    );
  }

  return text;
}

export default callGemini;

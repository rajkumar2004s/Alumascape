/**
 * api.js — thin frontend client for the /api/chat serverless function.
 * The Gemini API key never touches the browser; this file just talks
 * to our own backend endpoint.
 */

export class ChatApiError extends Error {
  constructor(message, status) {
    super(message);
    this.name = "ChatApiError";
    this.status = status;
  }
}

/**
 * Sends the current message + trimmed history to the backend and
 * returns the assistant's reply text.
 *
 * @param {string} message - the new user message
 * @param {Array<{role: 'user'|'assistant', content: string}>} history
 * @param {AbortSignal} [signal] - optional abort signal to cancel the request
 */
export async function sendChatMessage(message, history = [], signal) {
  let res;
  try {
    res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message, history }),
      signal,
    });
  } catch (err) {
    if (err.name === "AbortError") throw err;
    throw new ChatApiError(
      "Couldn't reach the Alumascape AI consultant. Please check your connection and try again.",
      0
    );
  }

  if (!res.ok) {
    let detail = "";
    try {
      const body = await res.json();
      detail = body?.error || "";
    } catch {
      // ignore body parse errors
    }
    throw new ChatApiError(
      detail || "Something went wrong reaching the AI consultant. Please try again.",
      res.status
    );
  }

  const data = await res.json();
  if (!data?.response) {
    throw new ChatApiError("Received an empty response. Please try again.", 500);
  }
  return data.response;
}

/**
 * /api/chat.js
 * -----------------------------------------------------------------------
 * The ONLY backend file. A Vercel Serverless Function (Node runtime).
 *
 * Request:  POST { message: string, history: Array<{role, content}> }
 * Response: { response: string }
 *
 * Keeps the Gemini API key server-side only (GEMINI_API_KEY env var).
 * -----------------------------------------------------------------------
 */

import { callGemini } from "../src/services/gemini.js";
import { buildSystemPrompt } from "../src/utils/systemPrompt.js";

// Very small in-memory rate limiter (per serverless instance).
// Good enough to blunt accidental spam/abuse; for stricter protection
// consider Vercel's Edge Config, Upstash, or a WAF rule in production.
const requestLog = new Map();
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 20;

function isRateLimited(key) {
  const now = Date.now();
  const entry = requestLog.get(key) || { count: 0, windowStart: now };

  if (now - entry.windowStart > RATE_LIMIT_WINDOW_MS) {
    entry.count = 0;
    entry.windowStart = now;
  }

  entry.count += 1;
  requestLog.set(key, entry);

  return entry.count > RATE_LIMIT_MAX;
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const clientKey =
    req.headers["x-forwarded-for"]?.split(",")[0]?.trim() ||
    req.socket?.remoteAddress ||
    "unknown";

  if (isRateLimited(clientKey)) {
    return res.status(429).json({
      error: "Too many messages in a short time. Please wait a moment and try again.",
    });
  }

  try {
    const { message, history } = req.body || {};

    if (!message || typeof message !== "string" || !message.trim()) {
      return res.status(400).json({ error: "A non-empty 'message' string is required." });
    }

    if (message.length > 2000) {
      return res.status(400).json({ error: "Message is too long." });
    }

    const safeHistory = Array.isArray(history)
      ? history
          .filter(
            (m) =>
              m &&
              (m.role === "user" || m.role === "assistant") &&
              typeof m.content === "string"
          )
          .slice(-20) // keep payload small and cheap
      : [];

    const systemPrompt = buildSystemPrompt();
    const response = await callGemini(systemPrompt, safeHistory, message.trim());

    return res.status(200).json({ response });
  } catch (err) {
    console.error("[/api/chat] error:", err);
    return res.status(500).json({
      error:
        "Something went wrong on our end. Please try again, or call us at (949) 415-8112.",
    });
  }
}

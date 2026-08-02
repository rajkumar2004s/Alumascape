/**
 * helpers.js — small shared utilities for the AI Consultant widget.
 */

/** Generates a reasonably unique id for messages (no extra dependency needed). */
export function generateId() {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 9)}`;
}

/** Formats a Date (or timestamp) into a compact "h:mm AM/PM" string. */
export function formatTime(date) {
  const d = date instanceof Date ? date : new Date(date);
  return d.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
}

export const STORAGE_KEYS = {
  MESSAGES: "alumascape_ai_messages",
  CONVERSATIONS: "alumascape_ai_conversations",
  ACTIVE_CONVERSATION: "alumascape_ai_active_conversation",
  HAS_VISITED: "alumascape_ai_has_visited",
};

/** Safe localStorage getter that never throws (SSR / private mode safe). */
export function loadFromStorage(key, fallback) {
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
}

/** Safe localStorage setter that never throws. */
export function saveToStorage(key, value) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Storage full or unavailable — fail silently, chat still works in-memory.
  }
}

export function removeFromStorage(key) {
  try {
    window.localStorage.removeItem(key);
  } catch {
    // no-op
  }
}

/** Builds a short auto-title for a conversation from its first user message. */
export function titleFromMessage(text, maxLen = 34) {
  if (!text) return "New conversation";
  const clean = text.trim().replace(/\s+/g, " ");
  return clean.length > maxLen ? `${clean.slice(0, maxLen).trim()}…` : clean;
}

/** Basic scroll-to-bottom helper for the message list container. */
export function scrollToBottom(ref, behavior = "smooth") {
  if (!ref?.current) return;
  ref.current.scrollTo({ top: ref.current.scrollHeight, behavior });
}

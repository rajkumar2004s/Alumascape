import { useCallback, useEffect, useRef, useState } from "react";
import { sendChatMessage, ChatApiError } from "../services/api";
import {
  generateId,
  loadFromStorage,
  saveToStorage,
  removeFromStorage,
  STORAGE_KEYS,
  titleFromMessage,
} from "../utils/helpers";

const WELCOME_MESSAGE = {
  id: "welcome",
  role: "assistant",
  content:
    "Hi 👋 I'm Alumascape's AI Patio Consultant. I can help you:\n\n- Choose the right patio cover\n- Explain products & materials\n- Compare louvered vs. solid roof vs. lattice\n- Explain permits & installation\n- Help you schedule a free consultation\n\nWhat can I help you with today?",
  createdAt: Date.now(),
};

function newConversation() {
  return {
    id: generateId(),
    title: "New conversation",
    messages: [WELCOME_MESSAGE],
    updatedAt: Date.now(),
  };
}

/**
 * useChat — owns all chat state for the AI Consultant widget:
 * - the list of saved conversations (sidebar)
 * - the active conversation's messages
 * - send / retry / clear / new-conversation actions
 * - streaming-style "typing" reveal of the assistant's reply
 */
export function useChat() {
  const [conversations, setConversations] = useState(() => {
    const saved = loadFromStorage(STORAGE_KEYS.CONVERSATIONS, null);
    if (saved && Array.isArray(saved) && saved.length > 0) return saved;
    return [newConversation()];
  });

  const [activeId, setActiveId] = useState(() => {
    const savedActive = loadFromStorage(STORAGE_KEYS.ACTIVE_CONVERSATION, null);
    return savedActive || conversations[0]?.id;
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const abortRef = useRef(null);
  const lastFailedRef = useRef(null); // { message, history } for retry

  // Persist to localStorage whenever conversations/active change
  useEffect(() => {
    saveToStorage(STORAGE_KEYS.CONVERSATIONS, conversations);
  }, [conversations]);

  useEffect(() => {
    if (activeId) saveToStorage(STORAGE_KEYS.ACTIVE_CONVERSATION, activeId);
  }, [activeId]);

  const activeConversation =
    conversations.find((c) => c.id === activeId) || conversations[0];
  const messages = activeConversation?.messages || [WELCOME_MESSAGE];

  const updateActiveConversation = useCallback(
    (updater) => {
      setConversations((prev) =>
        prev.map((c) => (c.id === activeId ? updater(c) : c))
      );
    },
    [activeId]
  );

  const appendMessage = useCallback(
    (message) => {
      updateActiveConversation((c) => {
        const messages = [...c.messages, message];
        const isFirstUserMsg =
          c.title === "New conversation" && message.role === "user";
        return {
          ...c,
          messages,
          title: isFirstUserMsg ? titleFromMessage(message.content) : c.title,
          updatedAt: Date.now(),
        };
      });
    },
    [updateActiveConversation]
  );

  const replaceMessage = useCallback(
    (id, patch) => {
      updateActiveConversation((c) => ({
        ...c,
        messages: c.messages.map((m) => (m.id === id ? { ...m, ...patch } : m)),
      }));
    },
    [updateActiveConversation]
  );

  const runSend = useCallback(
    async (text, { isRetry = false } = {}) => {
      const trimmed = text.trim();
      if (!trimmed || isLoading) return;

      setError(null);

      const history = messages
        .filter((m) => m.id !== "welcome" && !m.isError)
        .map((m) => ({ role: m.role, content: m.content }));

      if (!isRetry) {
        appendMessage({
          id: generateId(),
          role: "user",
          content: trimmed,
          createdAt: Date.now(),
        });
      }

      const assistantId = generateId();
      appendMessage({
        id: assistantId,
        role: "assistant",
        content: "",
        createdAt: Date.now(),
        isTyping: true,
      });

      setIsLoading(true);
      const controller = new AbortController();
      abortRef.current = controller;

      try {
        const reply = await sendChatMessage(trimmed, history, controller.signal);
        replaceMessage(assistantId, { content: reply, isTyping: false });
        lastFailedRef.current = null;
      } catch (err) {
        if (err.name === "AbortError") {
          replaceMessage(assistantId, {
            content: "Stopped.",
            isTyping: false,
            isError: false,
          });
          return;
        }
        const message =
          err instanceof ChatApiError
            ? err.message
            : "Something went wrong. Please try again.";
        replaceMessage(assistantId, {
          content: message,
          isTyping: false,
          isError: true,
        });
        lastFailedRef.current = { message: trimmed, history };
        setError(message);
      } finally {
        setIsLoading(false);
        abortRef.current = null;
      }
    },
    [messages, isLoading, appendMessage, replaceMessage]
  );

  const sendMessage = useCallback((text) => runSend(text), [runSend]);

  const retryLastMessage = useCallback(() => {
    if (!lastFailedRef.current) return;
    updateActiveConversation((c) => ({
      ...c,
      messages: c.messages.filter((m) => !m.isError),
    }));
    runSend(lastFailedRef.current.message, { isRetry: true });
  }, [runSend, updateActiveConversation]);

  const stopGenerating = useCallback(() => {
    abortRef.current?.abort();
  }, []);

  const clearChat = useCallback(() => {
    updateActiveConversation((c) => ({
      ...c,
      messages: [WELCOME_MESSAGE],
      title: "New conversation",
    }));
  }, [updateActiveConversation]);

  const startNewConversation = useCallback(() => {
    const conv = newConversation();
    setConversations((prev) => [conv, ...prev]);
    setActiveId(conv.id);
  }, []);

  const switchConversation = useCallback((id) => {
    setActiveId(id);
  }, []);

  const deleteConversation = useCallback(
    (id) => {
      setConversations((prev) => {
        const next = prev.filter((c) => c.id !== id);
        if (next.length === 0) {
          const fresh = newConversation();
          if (activeId === id) setActiveId(fresh.id);
          return [fresh];
        }
        if (activeId === id) setActiveId(next[0].id);
        return next;
      });
    },
    [activeId]
  );

  const clearAllHistory = useCallback(() => {
    removeFromStorage(STORAGE_KEYS.CONVERSATIONS);
    removeFromStorage(STORAGE_KEYS.ACTIVE_CONVERSATION);
    const conv = newConversation();
    setConversations([conv]);
    setActiveId(conv.id);
  }, []);

  return {
    messages,
    conversations,
    activeId,
    isLoading,
    error,
    sendMessage,
    retryLastMessage,
    stopGenerating,
    clearChat,
    startNewConversation,
    switchConversation,
    deleteConversation,
    clearAllHistory,
  };
}

export default useChat;

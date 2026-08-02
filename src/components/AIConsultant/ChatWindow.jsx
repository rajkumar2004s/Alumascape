import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Plus, Trash2, MessageSquareText } from "lucide-react";
import Header from "./Header";
import Messages from "./Messages";
import Input from "./Input";
import { useChat } from "../../hooks/useChat";

export default function ChatWindow({ onClose }) {
  const {
    messages,
    conversations,
    activeId,
    isLoading,
    sendMessage,
    retryLastMessage,
    stopGenerating,
    clearChat,
    startNewConversation,
    switchConversation,
    deleteConversation,
  } = useChat();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const windowRef = useRef(null);

  // Escape closes the window
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [onClose]);

  // Click outside closes the window
  useEffect(() => {
    const handleClick = (e) => {
      if (windowRef.current && !windowRef.current.contains(e.target)) {
        // Ignore clicks on the launcher button itself (it toggles separately)
        if (e.target.closest(".ac-launcher")) return;
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [onClose]);

  return (
    <motion.div
      ref={windowRef}
      className="ac-window"
      initial={{ opacity: 0, x: 40, scale: 0.98 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 40, scale: 0.98 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      role="dialog"
      aria-label="Alumascape AI Patio Consultant"
    >
      {sidebarOpen && (
        <div className="ac-sidebar">
          <div className="ac-sidebar-header">
            <button
              type="button"
              className="ac-sidebar-btn"
              onClick={startNewConversation}
            >
              <Plus size={13} /> New chat
            </button>
          </div>
          <div className="ac-conversation-list">
            {conversations.map((c) => (
              <button
                key={c.id}
                type="button"
                className={`ac-conversation-item${c.id === activeId ? " ac-active" : ""}`}
                onClick={() => switchConversation(c.id)}
              >
                <span className="ac-conversation-title">
                  <MessageSquareText
                    size={12}
                    style={{ marginRight: 5, flexShrink: 0, verticalAlign: "-2px" }}
                  />
                  {c.title}
                </span>
                <span
                  className="ac-conversation-delete"
                  role="button"
                  tabIndex={0}
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteConversation(c.id);
                  }}
                  aria-label="Delete conversation"
                >
                  <Trash2 size={12} />
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="ac-main">
        <Header
          onClose={onClose}
          onNewConversation={startNewConversation}
          onClearChat={clearChat}
          onToggleSidebar={() => setSidebarOpen((v) => !v)}
          showSidebarToggle
        />
        <Messages
          messages={messages}
          onRetry={retryLastMessage}
          onSelectSuggestion={sendMessage}
        />
        <Input onSend={sendMessage} isLoading={isLoading} onStop={stopGenerating} />
      </div>
    </motion.div>
  );
}

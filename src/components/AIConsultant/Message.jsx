import { useState } from "react";
import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";
import { Check, Copy, RotateCcw } from "lucide-react";
import { formatTime } from "../../utils/helpers";
import Typing from "./Typing";

export default function Message({ message, onRetry, isLast }) {
  const [copied, setCopied] = useState(false);
  const isUser = message.role === "user";

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(message.content);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // clipboard unavailable — fail silently
    }
  };

  return (
    <motion.div
      className={`ac-msg-row ${isUser ? "ac-user" : "ac-assistant"}`}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
    >
      <div style={{ display: "flex", flexDirection: "column", alignItems: isUser ? "flex-end" : "flex-start", maxWidth: "82%" }}>
        <div
          className={`ac-bubble ${isUser ? "ac-user" : "ac-assistant"}${
            message.isError ? " ac-error" : ""
          }`}
          style={{ maxWidth: "100%" }}
        >
          {message.isTyping ? (
            <Typing />
          ) : isUser ? (
            message.content
          ) : (
            <ReactMarkdown
              components={{
                a: (props) => (
                  <a {...props} target="_blank" rel="noopener noreferrer" />
                ),
              }}
            >
              {message.content}
            </ReactMarkdown>
          )}
        </div>

        {!message.isTyping && (
          <div className="ac-msg-meta">
            <span>{formatTime(message.createdAt)}</span>
            {!isUser && (
              <div className="ac-msg-actions">
                <button
                  type="button"
                  className="ac-msg-action-btn"
                  onClick={handleCopy}
                  aria-label="Copy message"
                  title="Copy"
                >
                  {copied ? <Check size={12} /> : <Copy size={12} />}
                </button>
                {message.isError && isLast && (
                  <button
                    type="button"
                    className="ac-msg-action-btn"
                    onClick={onRetry}
                    aria-label="Retry"
                    title="Retry"
                  >
                    <RotateCcw size={12} />
                  </button>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
}

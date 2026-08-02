import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, MessageCircle } from "lucide-react";
import { STORAGE_KEYS, loadFromStorage, saveToStorage } from "../../utils/helpers";

export default function ChatButton({ isOpen, onClick, hasUnread }) {
  const [showPulse, setShowPulse] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    const hasVisited = loadFromStorage(STORAGE_KEYS.HAS_VISITED, false);
    if (!hasVisited) {
      setShowPulse(true);
      saveToStorage(STORAGE_KEYS.HAS_VISITED, true);
      const timer = setTimeout(() => setShowPulse(false), 7000);
      return () => clearTimeout(timer);
    }
  }, []);

  if (isOpen) return null;

  return (
    <motion.button
      type="button"
      className={`ac-launcher${showPulse ? " ac-pulse" : ""}`}
      onClick={onClick}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
      aria-label="Ask Alumascape AI"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0, opacity: 0 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
    >
      <AnimatePresence mode="wait">
        {hasUnread ? (
          <motion.span
            key="unread"
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.6, opacity: 0 }}
          >
            <MessageCircle size={24} strokeWidth={2} />
          </motion.span>
        ) : (
          <motion.span
            key="sparkle"
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.6, opacity: 0 }}
          >
            <Sparkles size={24} strokeWidth={2} />
          </motion.span>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showTooltip && (
          <motion.span
            className="ac-launcher-tooltip"
            initial={{ opacity: 0, x: 8 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 8 }}
            transition={{ duration: 0.15 }}
          >
            Ask Alumascape AI
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
}

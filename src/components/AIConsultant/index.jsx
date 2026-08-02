import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import ChatButton from "./ChatButton";
import ChatWindow from "./ChatWindow";
import "../../styles/chat.css";

/**
 * <AIConsultant />
 * -----------------------------------------------------------------------
 * Drop this once near the root of your app (e.g. in App.jsx, alongside
 * your <Footer /> or right before the closing tag) and it renders the
 * floating launcher + slide-in chat window everywhere.
 *
 *   import AIConsultant from "./components/AIConsultant";
 *   ...
 *   <AIConsultant />
 * -----------------------------------------------------------------------
 */
export default function AIConsultant() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <ChatButton isOpen={isOpen} onClick={() => setIsOpen(true)} />
      <AnimatePresence>
        {isOpen && <ChatWindow onClose={() => setIsOpen(false)} />}
      </AnimatePresence>
    </>
  );
}

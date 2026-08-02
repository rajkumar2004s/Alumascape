import { useEffect, useRef, useState } from "react";
import { ArrowUp, Square } from "lucide-react";

export default function Input({ onSend, isLoading, onStop }) {
  const [value, setValue] = useState("");
  const textareaRef = useRef(null);

  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, 110)}px`;
  }, [value]);

  const handleSubmit = () => {
    const trimmed = value.trim();
    if (!trimmed || isLoading) return;
    onSend(trimmed);
    setValue("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="ac-input-bar">
      <textarea
        ref={textareaRef}
        className="ac-textarea"
        rows={1}
        placeholder="Ask anything about Alumascape..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        disabled={isLoading}
        aria-label="Message"
      />
      <button
        type="button"
        className="ac-send-btn"
        onClick={isLoading ? onStop : handleSubmit}
        disabled={!isLoading && !value.trim()}
        aria-label={isLoading ? "Stop generating" : "Send message"}
      >
        {isLoading ? <Square size={14} fill="currentColor" /> : <ArrowUp size={17} />}
      </button>
    </div>
  );
}

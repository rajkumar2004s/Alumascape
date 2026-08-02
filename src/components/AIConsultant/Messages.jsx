import { useEffect, useRef } from "react";
import Message from "./Message";
import SuggestionChips from "./SuggestionChips";
import { scrollToBottom } from "../../utils/helpers";

export default function Messages({ messages, onRetry, onSelectSuggestion }) {
  const containerRef = useRef(null);

  useEffect(() => {
    scrollToBottom(containerRef);
  }, [messages]);

  const lastMessage = messages[messages.length - 1];
  const showSuggestions = messages.length === 1 && messages[0].id === "welcome";

  return (
    <>
      <div className="ac-messages" ref={containerRef}>
        {messages.map((message) => (
          <Message
            key={message.id}
            message={message}
            onRetry={onRetry}
            isLast={message.id === lastMessage?.id}
          />
        ))}
      </div>
      {showSuggestions && <SuggestionChips onSelect={onSelectSuggestion} />}
    </>
  );
}

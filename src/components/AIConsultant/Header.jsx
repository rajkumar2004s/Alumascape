import { Sparkles, X, Plus, Trash2, PanelLeft } from "lucide-react";

export default function Header({
  onClose,
  onNewConversation,
  onClearChat,
  onToggleSidebar,
  showSidebarToggle,
}) {
  return (
    <div className="ac-header">
      <div className="ac-header-left">
        {showSidebarToggle && (
          <button
            type="button"
            className="ac-icon-btn"
            onClick={onToggleSidebar}
            aria-label="Toggle conversation history"
          >
            <PanelLeft size={16} />
          </button>
        )}
        <div className="ac-header-avatar">
          <Sparkles size={17} />
        </div>
        <div>
          <div className="ac-header-title">AI Patio Consultant</div>
          <div className="ac-header-subtitle">
            <span className="ac-online-dot" />
            Powered by Alumascape
          </div>
        </div>
      </div>

      <div className="ac-header-actions">
        <button
          type="button"
          className="ac-icon-btn"
          onClick={onNewConversation}
          aria-label="Start new conversation"
          title="New conversation"
        >
          <Plus size={16} />
        </button>
        <button
          type="button"
          className="ac-icon-btn"
          onClick={onClearChat}
          aria-label="Clear current chat"
          title="Clear chat"
        >
          <Trash2 size={15} />
        </button>
        <button
          type="button"
          className="ac-icon-btn"
          onClick={onClose}
          aria-label="Close chat"
          title="Close (Esc)"
        >
          <X size={17} />
        </button>
      </div>
    </div>
  );
}

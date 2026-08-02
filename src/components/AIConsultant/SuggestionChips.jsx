const SUGGESTIONS = [
  "Patio Cover Options",
  "Louvered vs Solid Roof",
  "Installation Process",
  "Areas Served",
  "Warranty",
  "Book Consultation",
];

const PROMPTS = {
  "Patio Cover Options":
    "What patio cover options do you offer?",
  "Louvered vs Solid Roof":
    "What's the difference between a louvered patio cover and a solid roof cover?",
  "Installation Process":
    "Can you walk me through your installation process?",
  "Areas Served":
    "What areas do you serve?",
  Warranty:
    "What warranty comes with an Alumascape patio cover?",
  "Book Consultation":
    "I'd like to book a free consultation — what's the next step?",
};

export default function SuggestionChips({ onSelect }) {
  return (
    <div className="ac-suggestions">
      {SUGGESTIONS.map((label) => (
        <button
          key={label}
          type="button"
          className="ac-chip"
          onClick={() => onSelect(PROMPTS[label] || label)}
        >
          {label}
        </button>
      ))}
    </div>
  );
}

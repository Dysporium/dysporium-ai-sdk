import {
  FileText,
  Code,
  Paintbrush,
  BookOpen,
  Sparkles,
  Brain,
  Lightbulb,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface Suggestion {
  label: string;
  icon: LucideIcon;
}

interface EmptyStateProps {
  onSuggestionClick: (suggestion: string) => void;
  suggestions?: Suggestion[];
}

const DEFAULT_SUGGESTIONS: Suggestion[] = [
  { label: "Summary", icon: FileText },
  { label: "Code", icon: Code },
  { label: "Design", icon: Paintbrush },
  { label: "Research", icon: BookOpen },
  { label: "Get Inspired", icon: Sparkles },
  { label: "Think Deeply", icon: Brain },
  { label: "Learn Gently", icon: Lightbulb },
];

export function EmptyState({
  onSuggestionClick,
  suggestions = DEFAULT_SUGGESTIONS,
}: EmptyStateProps) {
  const topRowSuggestions = suggestions.slice(0, 5);
  const bottomRowSuggestions = suggestions.slice(5);

  return (
    <div className="text-center w-full max-w-4xl px-4">
      <h2 className="text-2xl sm:text-3xl md:text-4xl mb-6 sm:mb-8 text-secondary">
        What are we cooking up today?
      </h2>
      <div className="flex flex-col gap-4 items-center w-full">
        {topRowSuggestions.length > 0 && (
          <div className="flex flex-wrap justify-center gap-3 w-full">
            {topRowSuggestions.map((suggestion, index) => {
              const Icon = suggestion.icon as React.ComponentType<{
                size?: number;
                className?: string;
              }>;
              return (
                <button
                  key={index}
                  className="flex items-center shadow-sm justify-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 border border-tertiary rounded-full text-sm hover:border-primary transition-all whitespace-nowrap"
                  onClick={() => onSuggestionClick(suggestion.label)}
                >
                  <Icon size={18} />
                  <span>{suggestion.label}</span>
                </button>
              );
            })}
          </div>
        )}

        {bottomRowSuggestions.length > 0 && (
          <div className="flex flex-wrap justify-center gap-3 w-full">
            {bottomRowSuggestions.map((suggestion, index) => {
              const Icon = suggestion.icon as React.ComponentType<{
                size?: number;
                className?: string;
              }>;
              return (
                <button
                  key={index}
                  className="flex items-center shadow-sm justify-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 border border-tertiary rounded-full text-sm hover:border-primary transition-all whitespace-nowrap"
                  onClick={() => onSuggestionClick(suggestion.label)}
                >
                  <Icon size={18} />
                  <span>{suggestion.label}</span>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

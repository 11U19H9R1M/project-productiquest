
import React, { useState } from 'react';
import { Search, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SmartSearchProps {
  className?: string;
  placeholder?: string;
  suggestions?: string[];
}

export const SmartSearch = ({ 
  className, 
  placeholder = "Search...",
  suggestions = [
    "How to enable idle detection?",
    "Setting up integrations",
    "Configure timers",
    "Export reports",
    "Team permissions"
  ]
}: SmartSearchProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [query, setQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [activeSuggestion, setActiveSuggestion] = useState(-1);

  const filteredSuggestions = query 
    ? suggestions.filter(s => s.toLowerCase().includes(query.toLowerCase()))
    : suggestions;

  const handleFocus = () => {
    setIsExpanded(true);
    if (query.length > 0) setShowSuggestions(true);
  };

  const handleBlur = () => {
    // Delayed to allow clicking on suggestions
    setTimeout(() => {
      setIsExpanded(false);
      setShowSuggestions(false);
    }, 200);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    setShowSuggestions(value.length > 0);
    setActiveSuggestion(-1);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      setActiveSuggestion(prev => 
        prev < filteredSuggestions.length - 1 ? prev + 1 : prev
      );
    } else if (e.key === "ArrowUp") {
      setActiveSuggestion(prev => prev > 0 ? prev - 1 : prev);
    } else if (e.key === "Enter" && activeSuggestion > -1) {
      setQuery(filteredSuggestions[activeSuggestion]);
      setShowSuggestions(false);
    } else if (e.key === "Escape") {
      setShowSuggestions(false);
    }
  };

  const clearSearch = () => {
    setQuery('');
    setShowSuggestions(false);
  };

  return (
    <div className={cn("relative", className)}>
      <div className={cn(
        "flex items-center h-10 border rounded-full bg-background transition-all duration-300",
        isExpanded ? "w-64 border-primary" : "w-40 border-border",
      )}>
        <Search className="h-4 w-4 text-muted-foreground ml-3" />
        <input
          type="text"
          className="flex-1 border-none bg-transparent px-3 py-2 text-sm outline-none placeholder:text-muted-foreground"
          placeholder={placeholder}
          onFocus={handleFocus}
          onBlur={handleBlur}
          value={query}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />
        {query && (
          <button 
            className="mr-2 h-5 w-5 rounded-full hover:bg-muted flex items-center justify-center"
            onClick={clearSearch}
          >
            <X className="h-3 w-3" />
          </button>
        )}
      </div>
      
      {showSuggestions && filteredSuggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-1 border rounded-md bg-popover shadow-md z-50 animate-fade-in">
          <ul className="py-1">
            {filteredSuggestions.map((suggestion, index) => (
              <li 
                key={index}
                className={cn(
                  "px-3 py-2 text-sm cursor-pointer hover:bg-muted",
                  index === activeSuggestion && "bg-primary/10 text-primary"
                )}
                onClick={() => {
                  setQuery(suggestion);
                  setShowSuggestions(false);
                }}
              >
                {suggestion}
              </li>
            ))}
          </ul>
          <div className="border-t px-3 py-2 text-xs text-muted-foreground flex items-center">
            <Search className="h-3 w-3 mr-1" /> 
            <span>AI-powered search</span>
          </div>
        </div>
      )}
    </div>
  );
};

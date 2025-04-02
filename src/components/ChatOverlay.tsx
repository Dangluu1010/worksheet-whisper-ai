
import React, { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { X, SendHorizontal, Mic } from "lucide-react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";

interface ChatOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  inputValue: string;
  onInputChange: (value: string) => void;
  onSubmit: () => void;
}

const ChatOverlay = ({ 
  isOpen, 
  onClose, 
  inputValue, 
  onInputChange, 
  onSubmit 
}: ChatOverlayProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputValue.trim()) {
      onSubmit();
    }
    if (e.key === "Escape") {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm" onClick={onClose}>
      <div 
        className="w-full max-w-2xl animate-in fade-in zoom-in-95 duration-200" 
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative rounded-xl bg-white p-4 shadow-lg">
          <Button
            type="button"
            size="icon"
            variant="ghost"
            className="absolute right-2 top-2"
            onClick={onClose}
          >
            <X className="h-5 w-5" />
            <span className="sr-only">Close</span>
          </Button>
          
          <div className="pt-2 pb-6">
            <h2 className="text-lg font-medium">What are you looking for?</h2>
            <p className="text-sm text-gray-500">Ask me about worksheets, activities, or learning materials...</p>
          </div>

          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <Input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => onInputChange(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="e.g., math worksheets for 3rd grade..."
                className="pr-12 py-6 text-base"
              />
              <Button
                type="button"
                size="icon"
                variant="ghost"
                className="absolute right-2 top-1/2 -translate-y-1/2 hover:bg-transparent"
              >
                <Mic className="h-5 w-5 text-gray-400" />
                <span className="sr-only">Voice input</span>
              </Button>
            </div>
            <Button
              type="button"
              size="icon"
              className="rounded-full bg-blue-600 hover:bg-blue-700 h-12 w-12"
              onClick={onSubmit}
              disabled={!inputValue.trim()}
            >
              <SendHorizontal className="h-5 w-5" />
              <span className="sr-only">Send</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatOverlay;

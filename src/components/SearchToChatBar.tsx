
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import { useNavigate } from "react-router-dom";
import ChatOverlay from "./ChatOverlay";

interface SearchToChatBarProps {
  className?: string;
}

const SearchToChatBar = ({ className }: SearchToChatBarProps) => {
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const isMobile = useIsMobile();
  const navigate = useNavigate();

  const openOverlay = () => {
    setIsOverlayOpen(true);
  };

  const closeOverlay = () => {
    setIsOverlayOpen(false);
    setInputValue("");
  };

  const handleInputChange = (value: string) => {
    setInputValue(value);
  };

  const handleSubmit = () => {
    if (inputValue.trim()) {
      navigate(`/chat?q=${encodeURIComponent(inputValue)}`);
      closeOverlay();
    }
  };

  return (
    <>
      <div 
        className={cn(
          "flex w-full max-w-2xl items-center gap-2 rounded-full border bg-white p-1 pl-4 shadow-sm", 
          className
        )}
      >
        <div className="flex-1">
          <button
            onClick={openOverlay}
            className="w-full text-left text-gray-500 focus:outline-none"
          >
            {isMobile ? "Ask about worksheets..." : "Ask me about worksheets, activities, or learning materials..."}
          </button>
        </div>
        <Button
          className="rounded-full bg-blue-600 hover:bg-blue-700"
          size="icon"
          onClick={openOverlay}
        >
          <MessageSquare className="h-5 w-5" />
          <span className="sr-only">Open chat</span>
        </Button>
      </div>

      <ChatOverlay 
        isOpen={isOverlayOpen} 
        onClose={closeOverlay}
        inputValue={inputValue}
        onInputChange={handleInputChange}
        onSubmit={handleSubmit}
      />
    </>
  );
};

export default SearchToChatBar;

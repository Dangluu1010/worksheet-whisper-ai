
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { MessageSquare, Search } from "lucide-react";
import ChatInterface from "./ChatInterface";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";

interface SearchToChatBarProps {
  className?: string;
}

const SearchToChatBar = ({ className }: SearchToChatBarProps) => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const isMobile = useIsMobile();

  const openChat = () => {
    setIsChatOpen(true);
  };

  const closeChat = () => {
    setIsChatOpen(false);
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
            onClick={openChat}
            className="w-full text-left text-gray-500 focus:outline-none"
          >
            {isMobile ? "Ask about worksheets..." : "Ask me about worksheets, activities, or learning materials..."}
          </button>
        </div>
        <Button
          className="rounded-full bg-blue-600 hover:bg-blue-700"
          size="icon"
          onClick={openChat}
        >
          <MessageSquare className="h-5 w-5" />
          <span className="sr-only">Open chat</span>
        </Button>
      </div>

      <ChatInterface isOpen={isChatOpen} onClose={closeChat} />
    </>
  );
};

export default SearchToChatBar;

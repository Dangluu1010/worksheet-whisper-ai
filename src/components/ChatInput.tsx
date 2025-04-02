
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { SendHorizontal, Mic } from "lucide-react";
import { cn } from "@/lib/utils";

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isLoading?: boolean;
  className?: string;
}

const ChatInput = ({ onSendMessage, isLoading = false, className }: ChatInputProps) => {
  const [message, setMessage] = useState("");

  const handleSendMessage = () => {
    if (message.trim()) {
      onSendMessage(message);
      setMessage("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className={cn("flex items-center gap-2 w-full", className)}>
      <div className="relative flex-1">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask about worksheets, activities, or learning materials..."
          className="w-full rounded-full border border-gray-300 py-3 px-4 pr-12 focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={isLoading}
        />
        <Button
          type="button"
          size="icon"
          variant="ghost"
          className="absolute right-2 top-1/2 -translate-y-1/2 hover:bg-transparent"
          onClick={() => {}}
          disabled={isLoading}
        >
          <Mic className="h-5 w-5 text-gray-400" />
        </Button>
      </div>
      <Button
        type="button"
        size="icon"
        className="rounded-full bg-blue-600 hover:bg-blue-700"
        onClick={handleSendMessage}
        disabled={isLoading || !message.trim()}
      >
        <SendHorizontal className="h-5 w-5" />
        <span className="sr-only">Send message</span>
      </Button>
    </div>
  );
};

export default ChatInput;

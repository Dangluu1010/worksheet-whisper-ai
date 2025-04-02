
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bot, User } from "lucide-react";
import { cn } from "@/lib/utils";

export type MessageType = "user" | "assistant";

export interface Message {
  id: string;
  content: string;
  type: MessageType;
  timestamp: Date;
}

interface ChatMessageProps {
  message: Message;
  className?: string;
}

const ChatMessage = ({ message, className }: ChatMessageProps) => {
  const isUser = message.type === "user";

  return (
    <div
      className={cn(
        "flex w-full items-start gap-3 p-4",
        isUser ? "bg-white" : "bg-gray-50",
        className
      )}
    >
      <Avatar className={isUser ? "bg-blue-500" : "bg-purple-500"}>
        {isUser ? (
          <User className="h-5 w-5 text-white" />
        ) : (
          <Bot className="h-5 w-5 text-white" />
        )}
        <AvatarFallback>{isUser ? "U" : "A"}</AvatarFallback>
      </Avatar>
      <div className="flex-1">
        <p className="text-sm font-medium text-gray-500">
          {isUser ? "You" : "Worksheet Assistant"}
        </p>
        <div className="mt-1 text-gray-900">{message.content}</div>
      </div>
    </div>
  );
};

export default ChatMessage;


import React, { useState, useEffect, useRef } from "react";
import ChatInput from "./ChatInput";
import ChatMessage, { Message, MessageType } from "./ChatMessage";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface ChatInterfaceProps {
  isOpen: boolean;
  onClose: () => void;
  className?: string;
}

const ChatInterface = ({ isOpen, onClose, className }: ChatInterfaceProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      content: "Hi there! I'm your Worksheet Assistant. How can I help you find the perfect worksheets for your teaching needs today?",
      type: "assistant",
      timestamp: new Date(),
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = async (content: string) => {
    if (!content.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      type: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    // Simulate AI response delay
    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: generateResponse(content),
        type: "assistant",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, assistantMessage]);
      setIsLoading(false);
    }, 1000);
  };

  // Simple mock response function
  const generateResponse = (query: string): string => {
    const responses = [
      "I found several worksheets that might help with that. Would you like to focus on a specific grade level?",
      "Great question! I have some excellent worksheet resources for that topic. Are you looking for printable or interactive materials?",
      "I can help you with that! Do you need these worksheets for homework or classroom activities?",
      "I've found some popular worksheets in that category. Would you prefer basic practice or more challenging exercises?",
      "There are several worksheet options available. Would you like me to recommend the most popular ones for that subject?",
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  };

  if (!isOpen) return null;

  return (
    <div className={cn("fixed inset-0 z-50 flex flex-col bg-white md:inset-auto md:right-4 md:top-24 md:h-[600px] md:w-[400px] md:rounded-lg md:border md:shadow-lg", className)}>
      <div className="flex items-center justify-between border-b p-4">
        <h2 className="text-lg font-semibold">Worksheet Assistant</h2>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-5 w-5" />
          <span className="sr-only">Close</span>
        </Button>
      </div>
      
      <div className="flex-1 overflow-y-auto p-0">
        {messages.map((message) => (
          <ChatMessage key={message.id} message={message} />
        ))}
        <div ref={messagesEndRef} />
      </div>
      
      <div className="border-t p-4">
        <ChatInput 
          onSendMessage={handleSendMessage} 
          isLoading={isLoading} 
        />
      </div>
    </div>
  );
};

export default ChatInterface;

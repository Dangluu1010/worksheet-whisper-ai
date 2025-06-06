
import React, { useState, useEffect, useRef } from "react";
import ChatInput from "./ChatInput";
import ChatMessage, { Message, MessageType } from "./ChatMessage";
import { Button } from "@/components/ui/button";
import { X, Clock, ArrowLeftCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface ChatInterfaceProps {
  isOpen: boolean;
  onClose: () => void;
  className?: string;
  initialQuery?: string;
  showHistory?: boolean;
}

const ChatInterface = ({ 
  isOpen, 
  onClose, 
  className,
  initialQuery = "",
  showHistory = false
}: ChatInterfaceProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      content: "Hi there! I'm your Worksheet Assistant. How can I help you find the perfect worksheets for your teaching needs today?",
      type: "assistant",
      timestamp: new Date(),
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [isHistoryVisible, setIsHistoryVisible] = useState(showHistory);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Sample history data
  const chatHistory = [
    { id: '1', title: 'Math Worksheets', preview: 'Fractions for 3rd grade', date: new Date(Date.now() - 1000 * 60 * 60) },
    { id: '2', title: 'Science Exercises', preview: 'Plant life cycle activities', date: new Date(Date.now() - 1000 * 60 * 60 * 3) },
    { id: '3', title: 'Reading Comprehension', preview: 'Stories for 2nd grade', date: new Date(Date.now() - 1000 * 60 * 60 * 24) },
  ];

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // If there's an initial query, send it as a message
    if (initialQuery) {
      handleSendMessage(initialQuery);
    }
  }, [initialQuery]);

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

  const toggleHistory = () => {
    setIsHistoryVisible(!isHistoryVisible);
  };

  const formatDate = (date: Date) => {
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit'
    });
  };

  if (!isOpen) return null;

  return (
    <div className={cn("fixed inset-0 z-50 flex flex-col bg-white md:inset-auto md:right-4 md:top-24 md:h-[600px] md:w-[400px] md:rounded-lg md:border md:shadow-lg", className)}>
      <div className="flex items-center justify-between border-b p-4">
        <h2 className="text-lg font-semibold">Worksheet Assistant</h2>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={toggleHistory}>
            <Clock className="h-5 w-5" />
            <span className="sr-only">History</span>
          </Button>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
            <span className="sr-only">Close</span>
          </Button>
        </div>
      </div>
      
      {isHistoryVisible ? (
        <div className="flex-1 overflow-y-auto p-4">
          <div className="mb-4 flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={toggleHistory} className="p-1">
              <ArrowLeftCircle className="h-5 w-5" />
            </Button>
            <h3 className="font-medium">Recent Conversations</h3>
          </div>
          <div className="space-y-3">
            {chatHistory.map((chat) => (
              <button
                key={chat.id}
                className="w-full text-left p-3 rounded-md border border-gray-200 hover:bg-gray-50 transition-colors"
                onClick={() => {
                  toggleHistory();
                  // In a real app, load the chat here
                }}
              >
                <div className="font-medium">{chat.title}</div>
                <div className="text-sm text-gray-500 truncate">{chat.preview}</div>
                <div className="text-xs text-gray-400 mt-1">{formatDate(chat.date)}</div>
              </button>
            ))}
          </div>
        </div>
      ) : (
        <>
          <div className="flex-1 overflow-y-auto p-0">
            {messages.map((message) => (
              <ChatMessage key={message.id} message={message} />
            ))}
            {isLoading && (
              <div className="flex w-full items-center gap-3 bg-gray-50 p-4">
                <div className="h-8 w-8 animate-pulse rounded-full bg-gray-200"></div>
                <div className="h-4 w-24 animate-pulse rounded bg-gray-200"></div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          
          <div className="border-t p-4">
            <ChatInput 
              onSendMessage={handleSendMessage} 
              isLoading={isLoading} 
            />
          </div>
        </>
      )}
    </div>
  );
};

export default ChatInterface;

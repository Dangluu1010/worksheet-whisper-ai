
import React, { useState, useEffect, useRef } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import ChatMessage, { Message } from "@/components/ChatMessage";
import ChatInput from "@/components/ChatInput";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const Chat = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const initialQuery = searchParams.get("q") || "";
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      content: "Hi there! I'm your Worksheet Assistant. How can I help you find the perfect worksheets for your teaching needs today?",
      type: "assistant",
      timestamp: new Date(),
    },
  ]);

  // Handle the initial query if present
  useEffect(() => {
    if (initialQuery) {
      const userMessage: Message = {
        id: Date.now().toString(),
        content: initialQuery,
        type: "user",
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, userMessage]);
      setIsLoading(true);
      
      // Simulate AI response delay
      setTimeout(() => {
        const assistantMessage: Message = {
          id: (Date.now() + 1).toString(),
          content: generateResponse(initialQuery),
          type: "assistant",
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, assistantMessage]);
        setIsLoading(false);
      }, 1000);
    }
  }, [initialQuery]);

  // Auto-scroll to bottom when messages change
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

  return (
    <div className="flex h-screen flex-col bg-gray-50">
      <header className="sticky top-0 z-10 flex items-center gap-4 border-b bg-white p-4 shadow-sm">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => navigate('/')}
          className="md:mr-2"
        >
          <ArrowLeft className="h-5 w-5" />
          <span className="sr-only">Back to home</span>
        </Button>
        <h1 className="text-lg font-semibold">Worksheet Assistant</h1>
      </header>
      
      <div className="flex-1 overflow-y-auto">
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
      
      <div className="border-t bg-white p-4">
        <ChatInput 
          onSendMessage={handleSendMessage} 
          isLoading={isLoading} 
          className="mx-auto max-w-4xl"
        />
      </div>
    </div>
  );
};

export default Chat;

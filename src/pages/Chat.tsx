import React, { useState, useEffect, useRef } from "react";
import { useSearchParams, useNavigate, useLocation } from "react-router-dom";
import ChatMessage, { Message } from "@/components/ChatMessage";
import ChatInput from "@/components/ChatInput";
import ChatSidebar, { ChatThread } from "@/components/ChatSidebar";
import { Button } from "@/components/ui/button";
import { ArrowLeft, MenuIcon, Clock } from "lucide-react";
import { 
  getChatThreads, 
  getChatMessages, 
  createNewThread,
  addMessageToThread 
} from "@/services/chatService";
import { useIsMobile } from "@/hooks/use-mobile";

const Chat = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();
  const initialQuery = searchParams.get("q") || "";
  const threadParam = searchParams.get("thread") || "";
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const isMobile = useIsMobile();
  
  // Chat state
  const [messages, setMessages] = useState<Message[]>([]);
  const [threads, setThreads] = useState<ChatThread[]>([]);
  const [activeThreadId, setActiveThreadId] = useState<string>("");
  const [showHistory, setShowHistory] = useState(false);

  // Initialize the chat threads and handle the initial query if present
  useEffect(() => {
    const allThreads = getChatThreads();
    setThreads(allThreads);
    
    if (threadParam) {
      // If a specific thread is requested, load that thread
      setActiveThreadId(threadParam);
      setMessages(getChatMessages(threadParam));
    } else if (initialQuery) {
      // If there's a query but no specific thread, create a new thread
      const newThreadId = createNewThread(initialQuery);
      setActiveThreadId(newThreadId);
      setMessages(getChatMessages(newThreadId));
    } else if (allThreads.length > 0) {
      // If no thread or query is specified but threads exist, load the most recent thread
      setActiveThreadId(allThreads[0].id);
      setMessages(getChatMessages(allThreads[0].id));
    } else {
      // If no threads exist, create a new empty thread
      const newThreadId = createNewThread();
      setActiveThreadId(newThreadId);
      setMessages(getChatMessages(newThreadId));
    }
  }, [initialQuery, threadParam]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = async (content: string) => {
    if (!content.trim() || !activeThreadId) return;

    // Add user message
    addMessageToThread(activeThreadId, content, "user");
    setMessages(getChatMessages(activeThreadId));
    setIsLoading(true);

    // Simulate AI response delay
    setTimeout(() => {
      const assistantResponse = generateResponse(content);
      addMessageToThread(activeThreadId, assistantResponse, "assistant");
      setMessages(getChatMessages(activeThreadId));
      setThreads(getChatThreads());
      setIsLoading(false);
    }, 1000);
  };

  const handleThreadSelect = (threadId: string) => {
    setActiveThreadId(threadId);
    setMessages(getChatMessages(threadId));
    if (isMobile) {
      setShowSidebar(false);
    }
  };

  const handleNewChat = () => {
    const newThreadId = createNewThread();
    setActiveThreadId(newThreadId);
    setMessages(getChatMessages(newThreadId));
    
    if (isMobile) {
      setShowSidebar(false);
    }
    
    // Clear any query params
    if (location.search) {
      navigate('/chat');
    }
  };

  const toggleHistory = () => {
    setShowHistory(!showHistory);
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
        {isMobile && (
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setShowSidebar(!showSidebar)}
            className="md:hidden"
          >
            <MenuIcon className="h-5 w-5" />
            <span className="sr-only">Toggle sidebar</span>
          </Button>
        )}
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
        
        {isMobile && (
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleHistory}
            className="ml-auto"
          >
            <Clock className="h-5 w-5" />
            <span className="sr-only">Chat History</span>
          </Button>
        )}
      </header>
      
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar - always visible on desktop, conditionally visible on mobile */}
        <div 
          className={`${
            isMobile 
              ? `fixed inset-y-0 left-0 z-20 transform transition-transform duration-300 ease-in-out ${
                  showSidebar ? 'translate-x-0' : '-translate-x-full'
                }`
              : 'relative'
          }`}
        >
          <ChatSidebar 
            threads={threads}
            activeThreadId={activeThreadId}
            onThreadSelect={handleThreadSelect}
            onNewChat={handleNewChat}
            className={isMobile ? 'h-screen' : 'h-[calc(100vh-4rem)]'}
          />
        </div>
        
        {/* Mobile backdrop */}
        {isMobile && showSidebar && (
          <div 
            className="fixed inset-0 z-10 bg-black/50"
            onClick={() => setShowSidebar(false)}
          />
        )}
        
        {/* Mobile History Overlay */}
        {isMobile && showHistory && (
          <div className="fixed inset-0 z-30 bg-white">
            <div className="p-4 border-b">
              <div className="flex items-center gap-3">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={toggleHistory}
                >
                  <ArrowLeft className="h-5 w-5" />
                </Button>
                <h2 className="text-lg font-semibold">Chat History</h2>
              </div>
            </div>
            
            <div className="p-4">
              {threads.map((thread) => (
                <button
                  key={thread.id}
                  className="w-full text-left p-3 mb-3 rounded-md border border-gray-200 hover:bg-gray-50"
                  onClick={() => {
                    handleThreadSelect(thread.id);
                    setShowHistory(false);
                  }}
                >
                  <p className="font-medium">{thread.title}</p>
                  <p className="text-sm text-gray-500 truncate">{thread.preview}</p>
                  <p className="text-xs text-gray-400 mt-1">
                    {thread.timestamp.toLocaleString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      hour: 'numeric',
                      minute: '2-digit'
                    })}
                  </p>
                </button>
              ))}
            </div>
          </div>
        )}
        
        {/* Main chat area */}
        <div className="flex-1 flex flex-col overflow-hidden">
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
      </div>
    </div>
  );
};

export default Chat;

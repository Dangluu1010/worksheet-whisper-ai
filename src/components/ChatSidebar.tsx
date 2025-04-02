
import React from "react";
import { PlusCircle, Book, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";

export interface ChatThread {
  id: string;
  title: string;
  preview: string;
  timestamp: Date;
  isActive?: boolean;
}

interface ChatSidebarProps {
  threads: ChatThread[];
  activeThreadId?: string;
  onThreadSelect: (threadId: string) => void;
  onNewChat: () => void;
  className?: string;
}

const ChatSidebar = ({
  threads,
  activeThreadId,
  onThreadSelect,
  onNewChat,
  className,
}: ChatSidebarProps) => {
  const navigate = useNavigate();
  
  return (
    <div className={cn("flex h-full w-64 flex-col bg-gray-50 border-r", className)}>
      <div className="flex flex-col gap-2 p-3">
        <Button 
          onClick={onNewChat}
          className="w-full justify-start gap-2 bg-blue-600 hover:bg-blue-700"
        >
          <PlusCircle className="h-4 w-4" />
          <span>New Chat</span>
        </Button>
        
        <Button
          variant="outline"
          className="w-full justify-start gap-2 text-gray-700"
          onClick={() => navigate("/")}
        >
          <Book className="h-4 w-4" />
          <span>Worksheet Hub</span>
        </Button>
      </div>
      
      <div className="px-3 py-2">
        <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wide">Recent Conversations</h3>
      </div>
      
      <ScrollArea className="flex-1 px-3">
        <div className="space-y-1">
          {threads.map((thread) => (
            <button
              key={thread.id}
              onClick={() => onThreadSelect(thread.id)}
              className={cn(
                "w-full text-left p-2 rounded-md flex flex-col gap-0.5 transition-colors text-sm",
                thread.id === activeThreadId
                  ? "bg-blue-100 text-blue-900"
                  : "hover:bg-gray-100 text-gray-700"
              )}
            >
              <span className="font-medium truncate">{thread.title}</span>
              <span className="text-xs text-gray-500 truncate">{thread.preview}</span>
            </button>
          ))}
        </div>
      </ScrollArea>
      
      <div className="border-t p-3">
        <Button variant="ghost" size="sm" className="w-full justify-start gap-2 text-gray-700">
          <Settings className="h-4 w-4" />
          <span>Settings</span>
        </Button>
      </div>
    </div>
  );
};

export default ChatSidebar;

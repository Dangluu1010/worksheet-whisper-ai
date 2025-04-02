
import React from "react";
import { PlusCircle, Book, Settings, MessageCircle, Clock } from "lucide-react";
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
  
  // Format the date to a readable format
  const formatDate = (date: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) {
      return "Today";
    } else if (diffDays === 1) {
      return "Yesterday";
    } else if (diffDays < 7) {
      return `${diffDays} days ago`;
    } else {
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric'
      });
    }
  };
  
  // Group chats by date
  const groupChatsByDate = (chats: ChatThread[]) => {
    const grouped: Record<string, ChatThread[]> = {};
    
    chats.forEach(chat => {
      const dateGroup = formatDate(chat.timestamp);
      if (!grouped[dateGroup]) {
        grouped[dateGroup] = [];
      }
      grouped[dateGroup].push(chat);
    });
    
    return grouped;
  };
  
  const groupedThreads = groupChatsByDate(threads);
  
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
      
      <ScrollArea className="flex-1 px-3">
        <div className="space-y-4">
          {Object.entries(groupedThreads).map(([dateGroup, chats]) => (
            <div key={dateGroup} className="space-y-1">
              <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">{dateGroup}</h3>
              
              {chats.map((thread) => (
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
                  <div className="flex items-center gap-2">
                    <MessageCircle className="h-3.5 w-3.5 shrink-0 opacity-70" />
                    <span className="font-medium truncate">{thread.title}</span>
                  </div>
                  <span className="text-xs text-gray-500 truncate pl-5">{thread.preview}</span>
                </button>
              ))}
            </div>
          ))}
        </div>
      </ScrollArea>
      
      <div className="border-t p-3">
        <Button 
          variant="ghost" 
          size="sm" 
          className="w-full justify-start gap-2 text-gray-700"
          onClick={() => navigate("/")}
        >
          <Clock className="h-4 w-4" />
          <span>Chat History</span>
        </Button>
        <Button variant="ghost" size="sm" className="w-full justify-start gap-2 text-gray-700 mt-1">
          <Settings className="h-4 w-4" />
          <span>Settings</span>
        </Button>
      </div>
    </div>
  );
};

export default ChatSidebar;


import { Message } from "@/components/ChatMessage";
import { ChatThread } from "@/components/ChatSidebar";

// Mock data for chat threads
const mockThreads: ChatThread[] = [
  {
    id: "thread-1",
    title: "Math Worksheets Grade 3",
    preview: "Can you recommend worksheets for multiplication?",
    timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
  },
  {
    id: "thread-2",
    title: "Science Activities",
    preview: "Looking for plant life cycle activities",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
  },
  {
    id: "thread-3",
    title: "Reading Comprehension",
    preview: "Need worksheets for 2nd grade students",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
  },
];

// Mock chat history for each thread
const mockChatHistory: Record<string, Message[]> = {
  "thread-1": [
    {
      id: "welcome-1",
      content: "Hi there! I'm your Worksheet Assistant. How can I help you today?",
      type: "assistant",
      timestamp: new Date(Date.now() - 1000 * 60 * 35),
    },
    {
      id: "user-1",
      content: "I need math worksheets for grade 3",
      type: "user",
      timestamp: new Date(Date.now() - 1000 * 60 * 33),
    },
    {
      id: "assistant-1",
      content: "I found several worksheets that might help with that. Would you like to focus on a specific topic like addition, subtraction, multiplication, or division?",
      type: "assistant",
      timestamp: new Date(Date.now() - 1000 * 60 * 32),
    },
    {
      id: "user-2",
      content: "Can you recommend worksheets for multiplication?",
      type: "user",
      timestamp: new Date(Date.now() - 1000 * 60 * 30),
    },
  ],
  "thread-2": [
    {
      id: "welcome-2",
      content: "Hi there! I'm your Worksheet Assistant. How can I help you today?",
      type: "assistant",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3),
    },
    {
      id: "user-1-thread-2",
      content: "I'm looking for science activities for elementary students",
      type: "user",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2.5),
    },
    {
      id: "assistant-1-thread-2",
      content: "Great! I can help with science activities. What specific topic or grade level are you interested in?",
      type: "assistant",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2.4),
    },
    {
      id: "user-2-thread-2",
      content: "Looking for plant life cycle activities",
      type: "user",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
    },
  ],
  "thread-3": [
    {
      id: "welcome-3",
      content: "Hi there! I'm your Worksheet Assistant. How can I help you today?",
      type: "assistant",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 25),
    },
    {
      id: "user-1-thread-3",
      content: "I need reading worksheets",
      type: "user",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24.5),
    },
    {
      id: "assistant-1-thread-3",
      content: "I'd be happy to help with reading worksheets. What grade level are you teaching?",
      type: "assistant",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24.4),
    },
    {
      id: "user-2-thread-3",
      content: "Need worksheets for 2nd grade students",
      type: "user",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24),
    },
  ],
};

// In a real app, this would interact with an API or local storage
export const getChatThreads = (): ChatThread[] => {
  return [...mockThreads].sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
};

export const getChatMessages = (threadId: string): Message[] => {
  return mockChatHistory[threadId] || [];
};

export const createNewThread = (initialMessage?: string): string => {
  const newThreadId = `thread-${Date.now()}`;
  const newThread: ChatThread = {
    id: newThreadId,
    title: initialMessage?.slice(0, 30) || "New Conversation",
    preview: initialMessage || "Start a new conversation",
    timestamp: new Date(),
  };
  
  mockThreads.push(newThread);
  
  mockChatHistory[newThreadId] = [
    {
      id: `welcome-${newThreadId}`,
      content: "Hi there! I'm your Worksheet Assistant. How can I help you find the perfect worksheets for your teaching needs today?",
      type: "assistant",
      timestamp: new Date(),
    },
  ];
  
  if (initialMessage) {
    mockChatHistory[newThreadId].push({
      id: `user-${newThreadId}-1`,
      content: initialMessage,
      type: "user",
      timestamp: new Date(),
    });
    
    // Simulate AI response
    const assistantResponse = "I'd be happy to help you find the right worksheets. Could you tell me more about what grade level and subject you're looking for?";
    mockChatHistory[newThreadId].push({
      id: `assistant-${newThreadId}-1`,
      content: assistantResponse,
      type: "assistant",
      timestamp: new Date(),
    });
  }
  
  return newThreadId;
};

export const addMessageToThread = (threadId: string, content: string, type: "user" | "assistant"): void => {
  if (!mockChatHistory[threadId]) {
    mockChatHistory[threadId] = [];
  }
  
  const newMessage: Message = {
    id: `${type}-${Date.now()}`,
    content,
    type,
    timestamp: new Date(),
  };
  
  mockChatHistory[threadId].push(newMessage);
  
  // Update thread preview and timestamp
  const thread = mockThreads.find(t => t.id === threadId);
  if (thread) {
    thread.preview = content.slice(0, 50) + (content.length > 50 ? "..." : "");
    thread.timestamp = new Date();
    
    // If it's the first user message, update the title
    if (type === "user" && mockChatHistory[threadId].filter(m => m.type === "user").length === 1) {
      thread.title = content.slice(0, 30) + (content.length > 30 ? "..." : "");
    }
  }
};

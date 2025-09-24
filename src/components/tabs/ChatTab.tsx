import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, Bot, User, Zap } from "lucide-react";

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'assistant';
  timestamp: Date;
  fileContext?: string;
}

const quickActions = [
  "Which trains are ready for service?",
  "Any safety alerts today?",
  "Show maintenance schedule",
  "Latest inspection reports",
];

export function ChatTab() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hello! I\'m your Metro Rail Assistant. I can help you search through documents, check fleet status, and answer technical questions. How can I assist you today?',
      sender: 'assistant',
      timestamp: new Date(),
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async (message?: string) => {
    const messageText = message || inputValue.trim();
    if (!messageText) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: messageText,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    try {
      // Mock API call to FastAPI /chat endpoint
      // const response = await fetch('/chat', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ message: messageText }),
      // });
      // const data = await response.json();

      // Simulate assistant response
      setTimeout(() => {
        const assistantMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: generateMockResponse(messageText),
          sender: 'assistant',
          timestamp: new Date(),
        };
        
        setMessages(prev => [...prev, assistantMessage]);
        setIsLoading(false);
      }, 1500);

    } catch (error) {
      setIsLoading(false);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: 'Sorry, I encountered an error. Please try again.',
        sender: 'assistant',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
    }
  };

  const generateMockResponse = (query: string): string => {
    if (query.toLowerCase().includes('ready')) {
      return 'Based on the latest fleet status, 18 out of 24 trains are currently ready for service. Trains MR-101 through MR-118 are operational and cleared for passenger service.';
    }
    if (query.toLowerCase().includes('safety')) {
      return 'Current safety alerts: 2 trains (MR-123, MR-124) have minor safety notifications for brake system checks. All other systems are operating normally.';
    }
    if (query.toLowerCase().includes('maintenance')) {
      return 'Maintenance schedule: 4 trains are currently under scheduled maintenance. Expected completion: MR-119 (tomorrow), MR-120 (2 days), MR-121 & MR-122 (this week).';
    }
    return 'I understand your query. Let me search through the documents and provide you with the most relevant information. This is a mock response - in production, this would connect to your FastAPI backend for real document analysis.';
  };

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col">
      {/* Chat Header with Quick Actions */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-foreground mb-4">💬 Chat Assistant</h2>
        
        {/* Quick Actions */}
        <div className="flex flex-wrap gap-2 mb-4">
          {quickActions.map((action, index) => (
            <Button
              key={index}
              variant="outline"
              size="sm"
              onClick={() => handleSendMessage(action)}
              className="text-xs"
            >
              <Zap className="h-3 w-3 mr-1" />
              {action}
            </Button>
          ))}
        </div>
      </div>

      {/* CHATBOT INTEGRATION AREA */}
      <Card className="flex-1 flex flex-col metro-card">
        <CardContent className="flex-1 flex flex-col p-6">
          {/* 
            🎯 INTEGRATION POINT FOR YOUR REACT CHATBOT
            Replace the ScrollArea below with your chatbot component:
            
            <YourChatbotComponent 
              messages={messages}
              onSendMessage={handleSendMessage}
              isLoading={isLoading}
            />
          */}
          
          <ScrollArea className="flex-1 pr-4">
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-3 ${
                    message.sender === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  {message.sender === 'assistant' && (
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                      <Bot className="h-4 w-4 text-primary-foreground" />
                    </div>
                  )}
                  
                  <div
                    className={`max-w-[70%] p-3 rounded-lg ${
                      message.sender === 'user'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-muted-foreground'
                    }`}
                  >
                    <p className="text-sm">{message.text}</p>
                    <p className="text-xs opacity-70 mt-1">
                      {message.timestamp.toLocaleTimeString()}
                    </p>
                  </div>
                  
                  {message.sender === 'user' && (
                    <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center">
                      <User className="h-4 w-4 text-secondary-foreground" />
                    </div>
                  )}
                </div>
              ))}
              
              {isLoading && (
                <div className="flex gap-3 justify-start">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                    <Bot className="h-4 w-4 text-primary-foreground" />
                  </div>
                  <div className="bg-muted p-3 rounded-lg">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>

          {/* Chat Input */}
          <div className="flex gap-2 pt-4 border-t border-border">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask about documents, fleet status, maintenance..."
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              disabled={isLoading}
              className="flex-1"
            />
            <Button 
              onClick={() => handleSendMessage()} 
              disabled={isLoading || !inputValue.trim()}
              variant="metro"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
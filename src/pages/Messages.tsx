import { useState } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Send, Paperclip } from "lucide-react";
import { mockConversations } from "@/data/mockMessages";

export default function Messages() {
  const [selectedConv, setSelectedConv] = useState(mockConversations[0]);
  const [message, setMessage] = useState("");

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex overflow-hidden">
        {/* Conversations List */}
        <div className="w-80 border-r border-white/10 flex flex-col">
          <div className="p-4 border-b border-white/10">
            <h2 className="text-xl font-bold mb-4">Messages</h2>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input placeholder="Search conversations..." className="pl-10" />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto">
            {mockConversations.map((conv) => (
              <div
                key={conv.id}
                onClick={() => setSelectedConv(conv)}
                className={`p-4 border-b border-white/5 cursor-pointer hover:bg-white/5 ${
                  selectedConv.id === conv.id ? 'bg-white/10' : ''
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="relative">
                    <img src={conv.user.avatar} alt={conv.user.name} className="w-12 h-12 rounded-full" />
                    {conv.user.online && (
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-background" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-semibold truncate">{conv.user.name}</h3>
                      <span className="text-xs text-muted-foreground">{conv.timestamp}</span>
                    </div>
                    <p className="text-sm text-muted-foreground truncate">{conv.lastMessage}</p>
                  </div>
                  {conv.unread > 0 && (
                    <div className="w-5 h-5 bg-primary rounded-full flex items-center justify-center text-xs">
                      {conv.unread}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chat Window */}
        <div className="flex-1 flex flex-col">
          <div className="p-4 border-b border-white/10">
            <div className="flex items-center gap-3">
              <img src={selectedConv.user.avatar} alt={selectedConv.user.name} className="w-10 h-10 rounded-full" />
              <div>
                <h3 className="font-semibold">{selectedConv.user.name}</h3>
                <p className="text-sm text-muted-foreground">{selectedConv.user.lastSeen}</p>
              </div>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {selectedConv.messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <Card className={`max-w-md p-3 ${
                  msg.sender === 'user' 
                    ? 'bg-gradient-primary text-white' 
                    : 'glass border-white/10'
                }`}>
                  {msg.type === 'image' && msg.mediaUrl && (
                    <img src={msg.mediaUrl} alt="" className="rounded-lg mb-2 max-w-xs" />
                  )}
                  {msg.text && <p className="text-sm">{msg.text}</p>}
                  <p className={`text-xs mt-1 ${msg.sender === 'user' ? 'text-white/70' : 'text-muted-foreground'}`}>
                    {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </Card>
              </div>
            ))}
          </div>

          <div className="p-4 border-t border-white/10">
            <div className="flex gap-2">
              <Button variant="ghost" size="icon">
                <Paperclip className="w-5 h-5" />
              </Button>
              <Input
                placeholder="Type a message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && setMessage('')}
              />
              <Button onClick={() => setMessage('')}>
                <Send className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

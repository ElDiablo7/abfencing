"use client";

import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, User, Bot, Loader2, Volume2, VolumeX } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type Message = {
  role: "user" | "assistant";
  content: string;
};

const INITIAL_GREETING = "Hello! I'm Sarah, the virtual assistant for AB Fencing. I can help you arrange a free quote, answer questions about our services, or put you directly in touch with Scott. How can I assist you today?";

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: INITIAL_GREETING }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isVoiceEnabled, setIsVoiceEnabled] = useState(true);
  const [hasSpokenGreeting, setHasSpokenGreeting] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Auto-open chat after 2 seconds on initial load
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(true);
      setHasSpokenGreeting(prev => {
        if (!prev) {
          // Attempt to speak (may be blocked by browser if no user interaction yet)
          setTimeout(() => speak(INITIAL_GREETING), 300);
          return true;
        }
        return prev;
      });
    }, 2000);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Ensure voices are loaded (some browsers load them asynchronously)
  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.getVoices();
    }
  }, []);

  const speak = (text: string) => {
    if (!isVoiceEnabled || typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    
    window.speechSynthesis.cancel(); // Stop current speaking
    
    const utterance = new SpeechSynthesisUtterance(text);
    const voices = window.speechSynthesis.getVoices();
    
    // 1. Absolute top priority: Google UK English Female (Chrome's natural cloud voice)
    let selectedVoice = voices.find(v => v.name === 'Google UK English Female');
    
    // 2. Second priority: Edge's highly realistic Azure Neural voices
    if (!selectedVoice) {
      selectedVoice = voices.find(v => v.lang === 'en-GB' && v.name.includes('Natural') && v.name.includes('Female'));
    }
    
    // 3. Third priority: Apple's Premium/Enhanced female voices
    if (!selectedVoice) {
      selectedVoice = voices.find(v => v.lang === 'en-GB' && (v.name.includes('Premium') || v.name.includes('Enhanced')) && v.name.includes('Female'));
    }
    
    // 4. Fallbacks (avoiding Hazel if possible)
    if (!selectedVoice) {
      selectedVoice = voices.find(v => v.lang === 'en-GB' && v.name.includes('Female') && !v.name.includes('Hazel'));
    }
    if (!selectedVoice) {
      selectedVoice = voices.find(v => v.lang === 'en-GB' || v.lang === 'en_GB');
    }
    
    if (selectedVoice) {
      utterance.voice = selectedVoice;
    }
    
    utterance.rate = 1.11;
    utterance.pitch = 1.19;
    
    window.speechSynthesis.speak(utterance);
  };

  const handleOpen = () => {
    setIsOpen(true);
    // Speak the greeting if we haven't yet, and if the user interacts (browsers require interaction first)
    if (!hasSpokenGreeting) {
      setHasSpokenGreeting(true);
      speak(INITIAL_GREETING);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput("");
    
    const newMessages: Message[] = [...messages, { role: "user", content: userMessage }];
    setMessages(newMessages);
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: newMessages.map(m => ({ role: m.role, content: m.content }))
        }),
      });

      const data = await response.json();
      
      if (data.success) {
        setMessages([...newMessages, { role: "assistant", content: data.response }]);
        speak(data.response);
      } else {
        const errorMsg = "Sorry, I'm having trouble connecting right now.";
        setMessages([...newMessages, { role: "assistant", content: errorMsg }]);
        speak(errorMsg);
      }
    } catch {
      const errorMsg = "An error occurred while sending your message.";
      setMessages([...newMessages, { role: "assistant", content: errorMsg }]);
      speak(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={handleOpen}
        className={`fixed bottom-6 right-6 z-40 p-4 bg-primary text-white rounded-full shadow-xl hover:scale-110 hover:shadow-2xl transition-all duration-300 ${isOpen ? 'hidden' : 'block'}`}
        aria-label="Open chat"
      >
        <MessageCircle className="w-7 h-7" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-6 right-6 z-50 w-[350px] max-h-[600px] h-[80vh] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-gray-200"
          >
            {/* Header */}
            <div className="bg-primary text-white p-4 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                  <Bot className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-heading font-semibold text-sm">Sarah - AB Fencing</h3>
                  <p className="text-xs text-white/70">Virtual Assistant</p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button 
                  onClick={() => setIsVoiceEnabled(!isVoiceEnabled)}
                  className="p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-full transition-colors"
                  aria-label={isVoiceEnabled ? "Disable voice" : "Enable voice"}
                  title={isVoiceEnabled ? "Disable voice" : "Enable voice"}
                >
                  {isVoiceEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
                </button>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-full transition-colors"
                  aria-label="Close chat"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${msg.role === 'user' ? 'bg-primary-light text-white' : 'bg-white text-primary border border-gray-200 shadow-sm'}`}>
                    {msg.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                  </div>
                  <div className={`max-w-[75%] p-3 rounded-2xl text-sm shadow-sm ${msg.role === 'user' ? 'bg-primary text-white rounded-tr-none' : 'bg-white text-gray-800 rounded-tl-none border border-gray-100'}`}>
                    {msg.content}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-white text-primary border border-gray-200 shadow-sm flex items-center justify-center shrink-0">
                    <Bot className="w-4 h-4" />
                  </div>
                  <div className="bg-white text-gray-500 p-3 rounded-2xl rounded-tl-none border border-gray-100 shadow-sm flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span className="text-xs">Sarah is typing...</span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 bg-white border-t border-gray-100">
              <form onSubmit={handleSubmit} className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Reply to Sarah..."
                  className="flex-1 px-4 py-2 bg-gray-100 border-transparent rounded-full focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white transition-all text-sm"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary-dark transition-colors"
                  aria-label="Send message"
                >
                  <Send className="w-4 h-4 ml-0.5" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

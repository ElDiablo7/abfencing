"use client";

import { useState, useRef, useEffect } from "react";
import { X, Send, User, Bot, Loader2, Volume2, VolumeX } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type Message = {
  role: "user" | "assistant";
  content: string;
};

const INITIAL_GREETING = "Hello! I'm Sarah, the virtual assistant for AB Fencing Ltd. I can help you arrange a free quote, answer questions about our services, or put you directly in touch with Scott. How can I assist you today?";

const PRESET_PROMPTS = [
  "I need a price quote",
  "What areas do you cover?",
  "Do you do fence repairs?",
  "How quickly can you start?",
  "Can you install custom gates?",
  "Do you remove the old fence?"
];

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

  const unlockAudio = () => {
    // Safari requires speech to be triggered synchronously within a user event (click/touch).
    // This empty utterance unlocks the audio engine for subsequent async calls.
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      const unlock = new SpeechSynthesisUtterance('');
      unlock.volume = 0;
      window.speechSynthesis.speak(unlock);
    }
  };

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
    
    // 3. Third priority: Apple's Premium/Enhanced female voices (Great for Safari)
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
    unlockAudio();
    setIsOpen(true);
    // Speak the greeting if we haven't yet
    if (!hasSpokenGreeting) {
      setHasSpokenGreeting(true);
      speak(INITIAL_GREETING);
    }
  };

  const sendChatMessage = async (text: string) => {
    if (!text.trim() || isLoading) return;
    
    unlockAudio();

    const userMessage = text.trim();
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendChatMessage(input);
  };

  return (
    <>
      {/* 3D Animated Floating Button */}
      <div className={`fixed bottom-6 right-6 z-40 ${isOpen ? 'hidden' : 'block'}`}>
        {/* Pulsing attention beacon */}
        <div className="absolute inset-0 bg-primary/60 rounded-full animate-ping" style={{ animationDuration: '2s' }}></div>
        
        <motion.button
          onClick={handleOpen}
          animate={{ y: [0, -12, 0] }}
          transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
          whileHover={{ scale: 1.1, rotate: [0, -10, 10, -10, 0] }}
          className="relative flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-[#6B9FE8] via-primary to-[#0D1E41] text-white border border-white/30 shadow-[0_12px_25px_rgba(30,58,123,0.6),_inset_0_-5px_12px_rgba(0,0,0,0.5),_inset_0_5px_12px_rgba(255,255,255,0.6)] cursor-pointer overflow-hidden"
          aria-label="Open chat"
        >
          {/* 3D Glass Shine Effect */}
          <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/40 to-transparent rounded-t-full pointer-events-none"></div>
          
          <Bot className="w-8 h-8 relative z-10 drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)]" />
          
          {/* Notification Dot */}
          <div className="absolute top-3 right-3 w-3.5 h-3.5 bg-red-500 rounded-full border-2 border-primary-dark shadow-sm"></div>
        </motion.button>
      </div>

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
                  <h3 className="font-heading font-semibold text-sm">Sarah - AB Fencing Ltd</h3>
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

            {/* Quick Prompts Area */}
            {messages.length === 1 && (
              <div className="px-4 py-3 bg-white border-t border-gray-100">
                <p className="text-xs text-gray-500 mb-2 font-medium">Frequently asked:</p>
                <div className="flex flex-wrap gap-2">
                  {PRESET_PROMPTS.map((prompt, i) => (
                    <button
                      key={i}
                      onClick={() => sendChatMessage(prompt)}
                      className="text-left px-3 py-1.5 bg-gray-50 hover:bg-primary-light hover:text-white text-gray-700 text-xs rounded-full transition-colors border border-gray-200"
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              </div>
            )}

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

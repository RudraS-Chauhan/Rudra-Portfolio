import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Bot, User, Sparkles, Loader2 } from 'lucide-react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface AiChatModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AiChatModal: React.FC<AiChatModalProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content:
        "Hi! I'm Rudra's AI Assistant. Ask me anything about EventFit AI, the AtlasCV private beta platform, ECHO-GATE Robotics, or Rudra's technical stack and education!",
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');

    const newMessages: Message[] = [...messages, { role: 'user', content: userMessage }];
    setMessages(newMessages);
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userMessage,
          history: newMessages.slice(1, -1),
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch response');
      }

      const data = await response.json();
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: data.reply || "I'm sorry, I couldn't process that right now." },
      ]);
    } catch (error) {
      console.error('Chat error:', error);
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content:
            "I'm currently unable to connect to the server. Feel free to reach out directly to Rudra via email at rudra@echogate.ai!",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/85 backdrop-blur-md cursor-pointer"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-2xl bg-[#111111] border-2 border-[#D7E2EA]/20 rounded-[32px] overflow-hidden text-[#D7E2EA] z-10 shadow-[0_30px_80px_rgba(0,0,0,0.95)] flex flex-col h-[600px] max-h-[85vh]"
        >
          {/* Header */}
          <div className="p-5 border-b border-white/10 flex items-center justify-between bg-[#161616]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full flex items-center justify-center bg-gradient-to-tr from-[#B600A8] to-[#7621B0] text-white">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-lg text-white uppercase tracking-wider">Rudra AI Assistant</h3>
                  <span className="flex items-center gap-1 text-[10px] uppercase tracking-widest text-[#B600A8] bg-[#B600A8]/10 border border-[#B600A8]/30 px-2 py-0.5 rounded-full font-semibold">
                    <Sparkles className="w-3 h-3" /> Gemini 2.5
                  </span>
                </div>
                <p className="text-xs text-[#D7E2EA]/60">Ask about AtlasCV, ECHO-GATE, & Bionic Hardware</p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-full bg-white/5 hover:bg-white/15 text-[#D7E2EA] transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 p-5 overflow-y-auto flex flex-col gap-4 bg-[#0E0E0E]">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex gap-3 max-w-[85%] ${
                  msg.role === 'user' ? 'ml-auto flex-row-reverse' : 'mr-auto'
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                    msg.role === 'user'
                      ? 'bg-[#D7E2EA]/20 text-[#D7E2EA]'
                      : 'bg-gradient-to-tr from-[#B600A8] to-[#7621B0] text-white'
                  }`}
                >
                  {msg.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                </div>
                <div
                  className={`p-4 rounded-2xl text-sm leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-[#B600A8] text-white rounded-tr-none'
                      : 'bg-[#181818] border border-white/10 text-[#D7E2EA] rounded-tl-none'
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex items-center gap-3 mr-auto max-w-[85%]">
                <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 bg-gradient-to-tr from-[#B600A8] to-[#7621B0] text-white">
                  <Bot className="w-4 h-4" />
                </div>
                <div className="p-4 rounded-2xl bg-[#181818] border border-white/10 text-[#D7E2EA] rounded-tl-none flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin text-[#B600A8]" />
                  <span className="text-xs text-[#D7E2EA]/70">Thinking...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompts */}
          <div className="px-5 py-2.5 bg-[#121212] border-t border-white/5 flex gap-2 overflow-x-auto no-scrollbar text-xs">
            <button
              onClick={() => setInput("Tell me about EventFit AI live project.")}
              className="px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 whitespace-nowrap text-[#D7E2EA]/80 cursor-pointer"
            >
              👗 EventFit AI Project
            </button>
            <button
              onClick={() => setInput("Tell me about AtlasCV private beta.")}
              className="px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 whitespace-nowrap text-[#D7E2EA]/80 cursor-pointer"
            >
              🚀 Tell me about AtlasCV
            </button>
            <button
              onClick={() => setInput("What was Rudra's role at ECHO-GATE Robotics?")}
              className="px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 whitespace-nowrap text-[#D7E2EA]/80 cursor-pointer"
            >
              🤖 ECHO-GATE Robotics
            </button>
          </div>

          {/* Input Box */}
          <div className="p-4 border-t border-white/10 bg-[#161616] flex items-center gap-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask a question about Rudra's engineering..."
              className="flex-1 bg-[#0A0A0A] border border-white/15 rounded-full px-5 py-3 text-sm text-[#D7E2EA] placeholder-[#D7E2EA]/40 focus:outline-none focus:border-[#B600A8] transition-colors"
            />
            <button
              onClick={handleSend}
              disabled={!input.trim() || isLoading}
              className="w-11 h-11 rounded-full bg-gradient-to-tr from-[#B600A8] to-[#7621B0] text-white flex items-center justify-center hover:opacity-90 disabled:opacity-40 transition-opacity cursor-pointer shrink-0"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

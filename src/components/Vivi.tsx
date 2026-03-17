import { motion, AnimatePresence } from 'motion/react';
import { useState, useRef, useEffect } from 'react';
import { Send, X, Loader2 } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

export default function Vivi({ className = "" }: { className?: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'model'; text: string }[]>([
    { role: 'model', text: 'Salut ! Je suis Vivi. Comment puis-je t\'aider avec ton meal-prep aujourd\'hui ?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setInput('');
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: [
          {
            role: "user",
            parts: [{ text: `Tu es Vivi, la mascotte de l'application uni-vert. uni-vert est une application de meal-prep pour les étudiants à Nantes. Elle propose des recettes, des échanges de repas, des ateliers cuisine et la gestion de stock. Réponds de manière amicale, courte et encourageante en français. L'utilisateur dit : ${userMessage}` }]
          }
        ],
        config: {
          systemInstruction: "Tu es Vivi, une petite mascotte radis/carotte mignonne et serviable. Tu aides les étudiants à manger sainement et à petit prix."
        }
      });

      const modelResponse = response.text || "Désolé, je n'ai pas compris. Peux-tu reformuler ?";
      setMessages(prev => [...prev, { role: 'model', text: modelResponse }]);
    } catch (error) {
      console.error("Gemini Error:", error);
      setMessages(prev => [...prev, { role: 'model', text: "Oups, j'ai un petit souci technique. Réessaie plus tard !" }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`relative flex flex-col items-center ${className}`}>
      {/* Chat Bubble */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20, x: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20, x: 20 }}
            className="absolute bottom-full right-0 mb-4 w-72 bg-white rounded-[32px] shadow-2xl border border-emerald-100 overflow-hidden z-50 flex flex-col"
            style={{ maxHeight: '400px' }}
          >
            {/* Chat Header */}
            <div className="bg-emerald-600 p-4 text-white flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                  <span className="text-xs font-bold">V</span>
                </div>
                <span className="font-bold">Chat avec Vivi</span>
              </div>
              <button onClick={() => setIsOpen(false)} className="p-1 hover:bg-white/20 rounded-lg transition-colors">
                <X size={18} />
              </button>
            </div>

            {/* Messages Area */}
            <div 
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50/50"
              style={{ minHeight: '200px' }}
            >
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] p-3 rounded-2xl text-sm ${
                    msg.role === 'user' 
                      ? 'bg-emerald-600 text-white rounded-tr-none' 
                      : 'bg-white text-gray-800 border border-gray-100 rounded-tl-none shadow-sm'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white border border-gray-100 p-3 rounded-2xl rounded-tl-none shadow-sm">
                    <Loader2 size={16} className="animate-spin text-emerald-600" />
                  </div>
                </div>
              )}
            </div>

            {/* Input Area */}
            <div className="p-3 bg-white border-t border-gray-100 flex gap-2">
              <input 
                type="text" 
                placeholder="Pose-moi une question..."
                className="flex-1 bg-gray-50 border-none rounded-xl px-4 py-2 text-sm focus:ring-2 focus:ring-emerald-500"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              />
              <button 
                onClick={handleSendMessage}
                disabled={isLoading || !input.trim()}
                className="p-2 bg-emerald-600 text-white rounded-xl disabled:opacity-50 transition-opacity"
              >
                <Send size={18} />
              </button>
            </div>

            {/* Speech Bubble Tail */}
            <div className="absolute -bottom-2 right-8 w-4 h-4 bg-white border-r border-b border-emerald-100 rotate-45"></div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Vivi Mascot */}
      <motion.div 
        onClick={() => setIsOpen(!isOpen)}
        whileTap={{ scale: 0.9 }}
        className="cursor-pointer group"
        animate={{ 
          y: [0, -8, 0],
          rotate: [0, 2, -2, 0]
        }}
        transition={{ 
          duration: 4, 
          repeat: Infinity,
          ease: "easeInOut" 
        }}
      >
        <svg width="80" height="100" viewBox="0 0 80 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-sm group-hover:drop-shadow-md transition-all">
          {/* Leafy Top */}
          <path d="M40 45C40 45 25 40 20 25C15 10 30 5 35 15C35 15 38 5 45 5C52 5 55 15 55 15C60 5 75 10 70 25C65 40 50 45 50 45" fill="#00D100" />
          <path d="M40 45C40 45 35 35 40 25C45 15 55 20 50 30C45 40 40 45 40 45Z" fill="#00A300" opacity="0.2" />
          
          {/* Heart Body */}
          <path d="M40 95C25 85 10 70 10 55C10 45 20 35 30 35C35 35 38 38 40 40C42 38 45 35 50 35C60 35 70 45 70 55C70 70 55 85 40 95Z" fill="#CCFF99" />
          
          {/* Highlights */}
          <ellipse cx="25" cy="50" rx="5" ry="8" fill="white" fillOpacity="0.3" transform="rotate(-15 25 50)" />
          <ellipse cx="60" cy="55" rx="3" ry="5" fill="white" fillOpacity="0.2" />
          
          {/* Whiskers/Lines */}
          <path d="M12 65C15 68 20 70 25 70" stroke="#00FF00" strokeWidth="2" strokeLinecap="round" />
          <path d="M15 75C18 78 23 80 28 80" stroke="#00FF00" strokeWidth="2" strokeLinecap="round" />
          
          <path d="M68 65C65 68 60 70 55 70" stroke="#00FF00" strokeWidth="2" strokeLinecap="round" />
          <path d="M65 75C62 78 57 80 52 80" stroke="#00FF00" strokeWidth="2" strokeLinecap="round" />
          
          {/* Eyes */}
          <rect x="33" y="58" width="3" height="6" rx="1.5" fill="#1A3300" />
          <rect x="44" y="58" width="3" height="6" rx="1.5" fill="#1A3300" />
          
          {/* Smile */}
          <path d="M36 72C38 74 42 74 44 72" stroke="#1A3300" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
        <span className="mt-1 text-[10px] font-black text-emerald-800 uppercase tracking-tighter bg-white/90 px-2 py-0.5 rounded-full shadow-sm border border-emerald-100 block text-center">Vivi</span>
      </motion.div>
    </div>
  );
}

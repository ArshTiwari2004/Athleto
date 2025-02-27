// components/Chatbot.tsx
import { useState, useEffect, useRef, KeyboardEvent } from "react";
import { X, Send, Maximize, Minimize, Bot } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Define message types for type safety
type Sender = "user" | "assistant";

interface Message {
  text: string;
  sender: Sender;
  timestamp: Date;
}

// Props to allow customization
interface ChatbotProps {
  title?: string;
  subtitle?: string;
  welcomeMessage?: string;
  primaryColor?: string;
  position?: "bottom-right" | "bottom-left";
  initialMessage?: string;
  initialMessageDuration?: number; // Duration in milliseconds
}

const Chatbot = ({
  title = "GoalBot",
  subtitle = "Your Football Companion",
  welcomeMessage = "Hello! I'm your AI assistant. How can I help you today?",
  primaryColor = "bg-blue-600",
  position = "bottom-right",
  initialMessage = "Hey there! Have any questions?\nWe're here to help!",
  initialMessageDuration = 6000, // 6 seconds by default
}: ChatbotProps) => {
  // State management
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasWelcomed, setHasWelcomed] = useState(false);
  const [showFloatingMessage, setShowFloatingMessage] = useState(false);
  
  // Reference for auto-scrolling
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Show initial floating message after component mounts
  useEffect(() => {
    // Show floating message after a short delay
    const showTimer = setTimeout(() => {
      setShowFloatingMessage(true);
    }, 1000);

    // Hide floating message after specified duration
    const hideTimer = setTimeout(() => {
      setShowFloatingMessage(false);
    }, initialMessageDuration + 1000);

    // Cleanup timers
    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
    };
  }, [initialMessageDuration]);

  // Display welcome message when chat opens
  useEffect(() => {
    if (isOpen && !hasWelcomed) {
      setChatHistory([{ 
        text: welcomeMessage, 
        sender: "assistant",
        timestamp: new Date()
      }]);
      setHasWelcomed(true);
    }
    
    // Focus input when chat opens
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen, hasWelcomed, welcomeMessage]);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatHistory]);

  // Position class based on prop
  const positionClass = position === "bottom-right" ? "right-7" : "left-7";

  /**
   * Fetches a response from the Cohere API via our Next.js API route
   */
  const fetchCohereResponse = async (userInput: string): Promise<string> => {
    try {
      // Format history for context (last 10 messages)
      const contextHistory = chatHistory
        .slice(-10)
        .map(({ text, sender }) => ({ text, sender }));
      
      // Call our API route
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          message: userInput,
          history: contextHistory
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to fetch response');
      }

      const data = await response.json();
      return data.text;
    } catch (error) {
      console.error("Error fetching Cohere response:", error);
      return "I'm having trouble connecting right now. Please try again later.";
    }
  };

  /**
   * Handles sending a message and getting a response
   */
  const handleSend = async () => {
    if (message.trim() === "") return;

    // Add user message to chat
    const userMessage: Message = { 
      text: message, 
      sender: "user",
      timestamp: new Date()
    };
    setChatHistory((prev) => [...prev, userMessage]);
    setMessage("");
    setLoading(true);

    // Get AI response
    const assistantResponseText = await fetchCohereResponse(userMessage.text);
    const assistantMessage: Message = { 
      text: assistantResponseText, 
      sender: "assistant",
      timestamp: new Date()
    };

    // Add AI response to chat
    setChatHistory((prev) => [...prev, assistantMessage]);
    setLoading(false);
  };

  /**
   * Handle Enter key to send message
   */
  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  /**
   * Format timestamp for display
   */
  const formatTime = (date: Date): string => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className={`fixed bottom-7 ${positionClass} flex flex-col items-end z-50`}>
      {/* Floating Message */}
      <AnimatePresence>
        {showFloatingMessage && !isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            transition={{ duration: 0.3 }}
            className="mb-3 p-4 bg-white rounded-xl shadow-lg max-w-xs cursor-pointer"
            onClick={() => setIsOpen(true)}
          >
            <div className="flex items-start gap-3">
              <div className="flex-1 text-center">
                <p className="text-gray-700 whitespace-pre-line">{initialMessage}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.2 }}
            className={`bg-white shadow-xl rounded-2xl p-4 flex flex-col border transition-all ease-in-out duration-300 ${
              isExpanded 
                ? "w-[85vw] h-[85vh] md:w-[70vw] md:h-[80vh]" 
                : "w-80 h-96 md:w-96 md:h-[500px]"
            }`}
          >
            {/* Header */}
            <div className="flex justify-between items-center border-b pb-3">
              <div>
                <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
                <p className="text-sm text-gray-500">{subtitle}</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="p-2 rounded-full hover:bg-gray-200 transition"
                  aria-label={isExpanded ? "Minimize chat" : "Maximize chat"}
                >
                  {isExpanded ? <Minimize size={20} /> : <Maximize size={20} />}
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-full hover:bg-gray-200 transition"
                  aria-label="Close chat"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Chat Body */}
            <motion.div
              className="flex-1 flex flex-col gap-3 overflow-y-auto py-4 px-2 my-3 border rounded-xl bg-gray-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              {chatHistory.map((msg, index) => (
                <div key={index} className="flex flex-col">
                  <motion.div
                    initial={{ opacity: 0, x: msg.sender === "user" ? 20 : -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                    className={`p-3 rounded-lg shadow-sm max-w-[80%] ${
                      msg.sender === "user" 
                        ? `${primaryColor} text-white self-end` 
                        : "bg-white border text-gray-800 self-start"
                    }`}
                  >
                    {msg.text}
                    <div 
                      className={`text-xs mt-1 ${
                        msg.sender === "user" ? "text-blue-200" : "text-gray-400"
                      }`}
                    >
                      {formatTime(msg.timestamp)}
                    </div>
                  </motion.div>
                </div>
              ))}

              {/* Loading Indicator */}
              {loading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="self-start p-2 bg-white border rounded-lg text-sm text-gray-500 flex items-center gap-2 shadow-sm"
                >
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: "0ms" }} />
                    <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: "150ms" }} />
                    <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                  <span>Thinking</span>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </motion.div>

            {/* Chat Input */}
            <div className="flex items-center gap-3 mt-1 border rounded-lg p-2 bg-white shadow-sm">
              <input
                ref={inputRef}
                type="text"
                placeholder="Type a message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                className="w-full p-2 focus:outline-none focus:ring-2 focus:ring-blue-300 bg-gray-50 rounded-lg text-gray-700"
                disabled={loading}
              />
              <motion.button
                onClick={handleSend}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`p-2 ${primaryColor} text-white rounded-lg shadow-sm hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed`}
                disabled={loading || message.trim() === ""}
                aria-label="Send message"
              >
                <Send size={18} />
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Chat Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{ duration: 0.3 }}
        className={`w-14 h-14 flex items-center justify-center ${primaryColor} text-white rounded-full shadow-lg hover:bg-blue-700 transition font-bold`}
        aria-label={isOpen ? "Close chat" : "Open chat"}
      >
        {isOpen ? <X size={24} /> : <Bot size={24} />}
      </motion.button>
    </div>
  );
};

export default Chatbot;
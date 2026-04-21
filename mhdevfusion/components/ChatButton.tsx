"use client";

import { useState } from "react";
import { MessageCircle, X, Bot, Send, Zap } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ChatMessage {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

export default function ChatButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [showOptions, setShowOptions] = useState(true);
  const [showChatBot, setShowChatBot] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  
  const whatsappNumber = "+923288482486";
  const whatsappMessage = encodeURIComponent("Hello! I'm interested in your services.");

  const handleWhatsAppClick = () => {
    window.open(`https://wa.me/${whatsappNumber.replace(/[^\d]/g, '')}?text=${whatsappMessage}`, "_blank");
    setIsOpen(false);
  };

  const handleChatBotClick = () => {
    setShowOptions(false);
    setShowChatBot(true);
    // Start with empty messages to show suggested questions
    setMessages([]);
  };

  const handleSuggestedClick = async (suggestion: string) => {
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      text: suggestion,
      sender: "user",
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMessage]);
    setInputMessage("");
    setIsTyping(true);

    try {
      const botResponseText = await getBotResponse(suggestion);
      const botResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        text: botResponseText,
        sender: "bot",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
    } catch (error) {
      console.error('Bot response error:', error);
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        text: "Sorry, I'm having trouble connecting right now. Please try again.",
        sender: "bot",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      text: inputMessage,
      sender: "user",
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage("");
    setIsTyping(true);

    try {
      const botResponseText = await getBotResponse(inputMessage);
      const botResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        text: botResponseText,
        sender: "bot",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
    } catch (error) {
      console.error('Bot response error:', error);
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        text: "Sorry, I'm having trouble connecting right now. Please try again.",
        sender: "bot",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const getBotResponse = async (userInput: string): Promise<string> => {
    try {
      const response = await fetch('https://mhdevfusion.com/chatboot/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest'
        },
        body: JSON.stringify({
          message: userInput,
          history: []
        })
      });

      if (!response.ok) {
        throw new Error('API request failed');
      }

      const data = await response.json();
      return data.answer || "I'm here to help! Feel free to ask about our services, pricing, or AI solutions.";
    } catch (error) {
      console.error('Chat API Error:', error);
      return Promise.resolve("I'm having trouble connecting right now. Please try again or contact us directly via WhatsApp.");
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    setShowOptions(true);
    setShowChatBot(false);
    setMessages([]);
  };

  const suggestedPrompts = [
    "What services do you offer?",
    "What's the pricing?",
    "Can you add AI to my website?",
    "How do I get started?",
    "Tell me about AI Voice Bot",
    "What's included in Growth plan?"
  ];

  return (
    <>
      {/* Chat Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white rounded-full p-4 shadow-lg transition-all duration-300 group"
        aria-label="Chat with us"
      >
        <MessageCircle size={24} className="group-hover:scale-110 transition-transform" />
        
        {/* Pulse Animation */}
        <span className="absolute inset-0 rounded-full bg-green-400 animate-ping opacity-75"></span>
      </motion.button>

      {/* Chat Popup */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed bottom-24 right-6 z-50 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700"
            style={{ width: showChatBot ? "380px" : "320px", height: showChatBot ? "500px" : "auto" }}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                  {showChatBot ? <Bot size={20} className="text-white" /> : <MessageCircle size={20} className="text-white" />}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    {showChatBot ? "MHDEVFUSION AI Assistant" : "Connect With Our Team"}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {showChatBot ? "Instant AI Support Available" : "Choose your preferred communication channel"}
                  </p>
                </div>
              </div>
              <button
                onClick={handleClose}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Options View */}
            {showOptions && (
              <div className="p-6">
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mb-4">
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    Welcome to MHDEVFUSION! Select your preferred way to connect with our expert team for immediate assistance.
                  </p>
                </div>

                <div className="space-y-3">
                  <button
                    onClick={handleWhatsAppClick}
                    className="w-full bg-green-500 hover:bg-green-600 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-5 h-5"
                    >
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.149-.67.149-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.221-.325.657-.657.967-.487.311-.865.222-.966.149-.101-.074-.446-.226-.966-.497-.521-.271-1.097-.595-1.718-.595-.62 0-1.097.398-1.48.788-.382.39-1.48 1.48-1.48 3.606 0 2.126 1.48 4.183 1.682 4.473.202.29 2.903 4.447 7.034 6.233 2.903 1.262 4.045 1.362 4.903 1.362.858 0 2.653-.621 3.408-1.237.657-.521 1.097-1.237 1.237-1.682.149-.446.074-.834-.05-1.031-.124-.197-.421-.322-.718-.471z"/>
                      <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 22C6.486 22 2 17.514 2 12S6.486 2 12 2s10 4.486 10 10-4.486 10-10 10z"/>
                    </svg>
                    Connect via WhatsApp
                  </button>

                  <button
                    onClick={handleChatBotClick}
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
                  >
                    <Bot size={20} />
                    Chat with AI Assistant
                  </button>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-600">
                  <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
                    Prefer email?{" "}
                    <a 
                      href="mailto:mhdevfusion@gmail.com" 
                      className="text-green-500 hover:text-green-600 font-medium"
                    >
                      Contact our team
                    </a>
                  </p>
                </div>
              </div>
            )}

            {/* Chat Bot View */}
            {showChatBot && (
              <div className="flex flex-col h-full bg-gray-900 text-white">
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-gray-700">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                      <Zap size={16} className="text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white text-sm">MHDEVFUSION Assistant</h3>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-xs text-green-500">Online</span>
                  </div>
                  <button
                    onClick={handleClose}
                    className="text-gray-400 hover:text-gray-300 transition-colors"
                  >
                    <X size={18} />
                  </button>
                </div>

                {/* Messages Area */}
                <div className="flex-1 overflow-y-auto p-6">
                  {messages.length === 0 && (
                    <div className="text-center py-8">
                      <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Zap size={32} className="text-white" />
                      </div>
                      <h4 className="text-xl font-semibold text-white mb-2">How can I help you today?</h4>
                      
                      {/* Suggested Questions */}
                      <div className="grid grid-cols-1 gap-2 max-w-md mx-auto mt-6">
                        {suggestedPrompts.map((prompt, index) => (
                          <button
                            key={index}
                            onClick={() => handleSuggestedClick(prompt)}
                            className="text-left p-3 bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-lg transition-colors text-sm text-gray-300 hover:text-white"
                          >
                            {prompt}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"} mb-4`}
                    >
                      <div className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                        message.sender === "user"
                          ? "bg-blue-600 text-white"
                          : "bg-gray-800 text-white border border-gray-700"
                      }`}
                      >
                        <p className="text-sm leading-relaxed break-words">{message.text}</p>
                        <p className="text-[10px] mt-2 opacity-60 text-right">
                          {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                        </p>
                      </div>
                    </div>
                  ))}
                  
                  {isTyping && (
                    <div className="flex justify-start mb-4">
                      <div className="bg-gray-800 rounded-2xl px-4 py-3 border border-gray-700">
                        <div className="flex items-center space-x-2">
                          <span className="text-xs text-gray-400">AI is typing</span>
                          <div className="flex space-x-1">
                            <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce"></div>
                            <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
                            <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Input Area */}
                <div className="p-4 border-t border-gray-700">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                      placeholder="Ask about services, pricing, AI solutions..."
                      className="flex-1 px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                    <button
                      onClick={handleSendMessage}
                      className="bg-green-500 hover:bg-green-600 text-white p-3 rounded-lg transition-colors"
                    >
                      <Send size={18} />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

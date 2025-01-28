import React, { useRef, useEffect } from 'react';
import { MessageCircle, User } from 'lucide-react';
import './ConversationContainer.css'

const Loader = () => (
  <div className="flex justify-start mb-4">
    <div className="flex flex-row max-w-[80%] gap-3">
      <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center">
        <MessageCircle className="w-5 h-5 text-white" />
      </div>
      <div className="p-4 rounded-2xl bg-gray-100">
        <div className="flex space-x-2">
          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
        </div>
      </div>
    </div>
  </div>
);

const ChatMessage = ({ message, isBot }) => (
  <div className={`flex ${isBot ? 'justify-start' : 'justify-end'} mb-4`}>
    <div className={`flex ${isBot ? 'flex-row' : 'flex-row-reverse'} max-w-[80%] gap-3`}>
      <div className={`w-8 h-8 rounded-full ${isBot ? 'bg-white-500' : 'bg-gray-600'} flex items-center justify-center`}>
        {isBot ? 
          <MessageCircle className="w-5 h-5 text-white" /> : 
          <User className="w-5 h-5 text-black" />
        }
      </div>
      <div 
        className={`p-4 rounded-2xl ${
          isBot ? 'bg-gray-100 text-gray-800' : 'bg-blue-500 text-white'
        }`}
      >
        <p dangerouslySetInnerHTML={{__html: message}}></p>
      </div>
    </div>
  </div>
);

const ConversationContainer = ({ messages = [], isLoading = false }) => {
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  return (
    <div className="w-full h-[37.5rem] overflow-y-auto px-4 no-scrollbar">
      <div className="flex flex-col">
        {messages.map((msg, index) => (
          <ChatMessage 
            key={index} 
            message={msg.content} 
            isBot={msg.isBot} 
          />
        ))}
        {isLoading && <Loader />}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
};

export default ConversationContainer;
/**
 * SID - AI DATA SECURITY ASSISTANT (Chatbot Component)
 * 
 * Sid is our friendly AI assistant that helps users with questions about
 * data security, pricing, compliance, and our services.
 * 
 * KEY FEATURES:
 * - Floating chat button (always visible in bottom-right corner)
 * - Persistent conversation history during session
 * - Context-aware responses based on keywords
 * - Personalized greetings for logged-in users
 * - Auto-scrolls to latest message
 * - Works for both logged-in and guest users
 * 
 * SMART RESPONSES:
 * Sid detects keywords in user messages and provides relevant answers:
 * - "price", "cost", "pricing" → Explains subscription plans
 * - "compliance", "gdpr", "hipaa" → Details certifications
 * - "mobile", "phone", "device" → Mobile device wiping info
 * - "cloud", "server", "database" → Enterprise solutions
 * - "emergency", "urgent", "breach" → Emergency response
 * - "certificate", "proof" → Documentation info
 * 
 * FUTURE ENHANCEMENT:
 * Currently uses keyword matching + random responses.
 * Can be upgraded to GPT-4 or Claude for smarter conversations.
 * 
 * UI DESIGN:
 * - Blue gradient header with Bot icon
 * - User messages: Blue bubbles on right
 * - Sid messages: Gray bubbles on left
 * - Typing indicator with animated dots
 * - Timestamp on each message
 */

import { useState, useRef, useEffect } from 'react';
import { MessageCircle, Send, X, Bot, User } from 'lucide-react';
import { useAuth } from '@getmocha/users-service/react';

// TypeScript interface for chat messages
interface Message {
  id: string;               // Unique identifier
  text: string;             // Message content
  sender: 'user' | 'sid';   // Who sent it
  timestamp: Date;          // When it was sent
}

export default function Sid() {
  const [isOpen, setIsOpen] = useState(false);  // Chat window open/closed
  
  // Pre-loaded conversation to show users how Sid works
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hello! I'm Sid, your AI data security assistant. I'm here to help you with any questions about our secure data erasure services. How can I assist you today?",
      sender: 'sid',
      timestamp: new Date(Date.now() - 5 * 60 * 1000)  // 5 minutes ago
    },
    {
      id: '2',
      text: "What's the difference between data wiping and data destruction?",
      sender: 'user',
      timestamp: new Date(Date.now() - 4 * 60 * 1000)
    },
    {
      id: '3',
      text: "Great question! Data wiping uses software to overwrite data multiple times making it unrecoverable, while physical destruction literally destroys the storage device. For compliance like GDPR or HIPAA, we often recommend a combination - software wiping followed by physical destruction for maximum security. Which approach interests you most?",
      sender: 'sid',
      timestamp: new Date(Date.now() - 3 * 60 * 1000)
    },
    {
      id: '4',
      text: "How quickly can you process an emergency data erasure request?",
      sender: 'user',
      timestamp: new Date(Date.now() - 2 * 60 * 1000)
    },
    {
      id: '5',
      text: "We offer 24/7 emergency response! For critical situations like security breaches or legal holds, our rapid response team can be onsite within 2-4 hours in major metro areas. Remote wiping for mobile devices and cloud data can begin immediately. Would you like me to connect you with our emergency response coordinator?",
      sender: 'sid',
      timestamp: new Date(Date.now() - 1 * 60 * 1000)
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { user } = useAuth();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      // Enhanced demo responses based on user input
      const lowerMessage = inputMessage.toLowerCase();
      let response = "";
      
      if (lowerMessage.includes('price') || lowerMessage.includes('cost') || lowerMessage.includes('pricing')) {
        response = "We offer three subscription plans: Starter (₹0 - perfect for individuals), Pro (₹299/month - great for businesses), and Advanced (₹699/month - enterprise solution). Each plan includes different device limits and features. Would you like me to explain the differences between these plans?";
      } else if (lowerMessage.includes('compliance') || lowerMessage.includes('gdpr') || lowerMessage.includes('hipaa')) {
        response = "We're certified for all major compliance standards including GDPR, HIPAA, SOX, and PCI-DSS. Our processes meet NIST 800-88 guidelines and we provide detailed audit trails and certificates of destruction. Which specific compliance requirements do you need to meet?";
      } else if (lowerMessage.includes('mobile') || lowerMessage.includes('phone') || lowerMessage.includes('device')) {
        response = "Our mobile device management includes secure wiping of iOS, Android, and Windows devices. We support both corporate-owned and BYOD scenarios with remote wipe capabilities. We can also handle legacy devices and provide pickup services. How many devices are we talking about?";
      } else if (lowerMessage.includes('cloud') || lowerMessage.includes('server') || lowerMessage.includes('database')) {
        response = "For cloud and server environments, we provide both logical deletion and cryptographic erasure. Our team works with AWS, Azure, Google Cloud, and on-premise infrastructure. We can also handle database sanitization while maintaining operational continuity. What type of environment are you working with?";
      } else if (lowerMessage.includes('emergency') || lowerMessage.includes('urgent') || lowerMessage.includes('breach')) {
        response = "I understand this is urgent. Our emergency response team is available 24/7 and can be mobilized immediately. For data breach scenarios, we can coordinate with your incident response team and legal counsel. Should I escalate this to our emergency coordinator right away?";
      } else if (lowerMessage.includes('certificate') || lowerMessage.includes('proof') || lowerMessage.includes('documentation')) {
        response = "We provide comprehensive documentation including certificates of destruction, detailed audit logs, chain of custody reports, and compliance attestations. All documentation is digitally signed and legally admissible. Would you like to see a sample certificate?";
      } else {
        // Default responses for general queries
        const responses = [
          "I'd be happy to help! Could you tell me more about your specific data security needs? Are you looking at hard drive destruction, mobile device wiping, or enterprise server decommissioning?",
          "Our data erasure services cover everything from individual devices to enterprise-wide infrastructure. What type of data or devices do you need securely erased?",
          "Security is our top priority. All our processes are NIST 800-88 compliant with multiple verification steps. What compliance standards do you need to meet?",
          "We serve Fortune 500 companies, healthcare systems, and government agencies. Our team can handle projects of any scale. What's the scope of your data security project?",
          "I can connect you with one of our data security specialists for a detailed consultation. What's the best way to reach you, and what's your timeline?",
        ];
        response = responses[Math.floor(Math.random() * responses.length)];
      }

      if (user) {
        // If user is authenticated, also make API call for personalized responses
        try {
          const apiResponse = await fetch('/api/chat', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message: inputMessage }),
          });

          if (apiResponse.ok) {
            const data = await apiResponse.json();
            response = data.response;
          }
        } catch (apiError) {
          // Fallback to demo response if API fails
          console.log('API call failed, using demo response');
        }
      }

      const sidMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: response,
        sender: 'sid',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, sidMessage]);
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "I'm sorry, I'm having trouble responding right now. Please try again in a moment.",
        sender: 'sid',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  // Show Sid for all visitors, with enhanced features for authenticated users

  return (
    <>
      {/* Chat Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-2xl transition-all transform hover:scale-110 z-50"
        >
          <MessageCircle className="w-6 h-6" />
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-96 h-[32rem] bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col z-50">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-4 rounded-t-2xl flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-white/20 p-2 rounded-full">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-semibold">Sid</h3>
                <p className="text-xs text-blue-100">AI Data Security Assistant</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="hover:bg-white/20 p-1 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`flex items-start space-x-2 max-w-[80%] ${message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                  <div className={`p-2 rounded-full ${message.sender === 'user' ? 'bg-blue-100' : 'bg-gray-100'}`}>
                    {message.sender === 'user' ? (
                      <User className="w-4 h-4 text-blue-600" />
                    ) : (
                      <Bot className="w-4 h-4 text-gray-600" />
                    )}
                  </div>
                  <div
                    className={`p-3 rounded-2xl ${
                      message.sender === 'user'
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-900'
                    }`}
                  >
                    <p className="text-sm leading-relaxed">{message.text}</p>
                    <p className={`text-xs mt-1 ${message.sender === 'user' ? 'text-blue-100' : 'text-gray-500'}`}>
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="flex justify-start">
                <div className="flex items-start space-x-2 max-w-[80%]">
                  <div className="p-2 rounded-full bg-gray-100">
                    <Bot className="w-4 h-4 text-gray-600" />
                  </div>
                  <div className="bg-gray-100 p-3 rounded-2xl">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex space-x-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask Sid about data security..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                disabled={isLoading}
              />
              <button
                onClick={sendMessage}
                disabled={!inputMessage.trim() || isLoading}
                className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white p-2 rounded-full transition-colors"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

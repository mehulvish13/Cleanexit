/**
 * SID - ENHANCED AI DATA SECURITY ASSISTANT
 * 
 * Advanced AI chatbot with comprehensive wipe standards knowledge,
 * step-by-step guidance, and compliance expertise.
 * 
 * FEATURES:
 * ✅ Wipe Standards Encyclopedia (NIST, DoD, GDPR, HIPAA, PCI-DSS, SOX)
 * ✅ Step-by-Step Wiping Guides (Hard Drives, Mobile, Servers)
 * ✅ Compliance Q&A (HIPAA, GDPR, SOX, PCI-DSS)
 * ✅ Quick Actions Menu (4 common queries)
 * ✅ Smart Keyword Detection & Context-Aware Responses
 * ✅ Emergency Procedures & Best Practices
 */

import { useState, useRef, useEffect } from 'react';
import { MessageCircle, Send, X, Bot, User, Shield, BookOpen, FileCheck, Zap } from 'lucide-react';

// TypeScript interface for chat messages
interface Message {
  id: string;
  text: string;
  sender: 'user' | 'sid';
  timestamp: Date;
}

// Knowledge Base: Wipe Standards
const wipeStandards = {
  'nist': {
    name: 'NIST 800-88',
    description: 'National Institute of Standards and Technology guideline for media sanitization',
    methods: ['Clear', 'Purge', 'Destroy'],
    details: 'NIST 800-88 defines three levels: Clear (logical techniques), Purge (physical/logical techniques), and Destroy (physical destruction). Required for federal agencies and recommended for sensitive data.'
  },
  'dod': {
    name: 'DoD 5220.22-M',
    description: 'Department of Defense standard for data sanitization',
    methods: ['3-pass overwrite', '7-pass overwrite'],
    details: 'DoD 5220.22-M specifies overwriting data with patterns multiple times. The 3-pass method writes: 1) Zero, 2) One, 3) Random character. The 7-pass adds additional verification.'
  },
  'gdpr': {
    name: 'GDPR Article 17',
    description: 'EU General Data Protection Regulation - Right to Erasure',
    methods: ['Irreversible erasure', 'Deletion with verification'],
    details: 'GDPR requires data to be permanently deleted when requested. Must ensure data cannot be recovered by any means. Requires documented proof of deletion.'
  },
  'hipaa': {
    name: 'HIPAA Security Rule',
    description: 'Health Insurance Portability and Accountability Act requirements',
    methods: ['Media disposal standards', 'Final rule §164.310(d)(2)(i)'],
    details: 'HIPAA requires electronic PHI to be securely erased with documented procedures. Must implement policies for final disposition of ePHI and hardware containing ePHI.'
  }
};

// Knowledge Base: Step-by-Step Guides
const stepGuides = {
  'hard_drive': {
    title: 'Hard Drive Wiping Guide',
    steps: [
      '1. Backup all important data before proceeding',
      '2. Disconnect drive from network and power down',
      '3. Boot from external USB with wiping software',
      '4. Select NIST 800-88 or DoD 5220.22-M method',
      '5. Verify drive serial number before starting',
      '6. Run 3-pass minimum (or 7-pass for DoD)',
      '7. Verify completion with scan tool',
      '8. Generate and save certificate of destruction'
    ],
    duration: '2-8 hours depending on size and method'
  },
  'mobile': {
    title: 'Mobile Device Wiping Guide',
    steps: [
      '1. Backup contacts, photos, and important data',
      '2. Sign out of all accounts (iCloud, Google, etc.)',
      '3. Remove SIM card and SD card',
      '4. Go to Settings → Reset → Factory Reset',
      '5. Enable encryption before reset (if not already)',
      '6. Perform factory reset with data encryption',
      '7. Verify device shows setup wizard after reset',
      '8. Document IMEI and serial number for records'
    ],
    duration: '30-60 minutes'
  },
  'server': {
    title: 'Server Decommissioning Guide',
    steps: [
      '1. Document all data locations and backups',
      '2. Notify stakeholders of decommissioning schedule',
      '3. Migrate critical data to new infrastructure',
      '4. Remove from network and disable network access',
      '5. Wipe all storage arrays with DoD 7-pass method',
      '6. Clear BIOS/UEFI settings and passwords',
      '7. Remove and physically destroy SSDs if required',
      '8. Generate audit trail and certificate'
    ],
    duration: '1-3 days depending on complexity'
  }
};

// Knowledge Base: Compliance Q&A
const complianceQA = {
  'gdpr': [
    {
      q: 'What does GDPR require for data deletion?',
      a: 'GDPR Article 17 (Right to Erasure) requires permanent, irreversible deletion of personal data upon request. You must be able to prove data cannot be recovered by any technical means.'
    },
    {
      q: 'How long do I have to respond to GDPR erasure requests?',
      a: 'You must comply with erasure requests within one month, extendable by two months if complex. You must inform the data subject of any extension within one month.'
    }
  ],
  'hipaa': [
    {
      q: 'What are HIPAA requirements for disposing of electronic PHI?',
      a: 'HIPAA Security Rule §164.310(d)(2)(i) requires implementing policies for final disposition of ePHI and hardware containing ePHI. Must render data unrecoverable using methods like degaussing or secure wiping.'
    },
    {
      q: 'Do I need documentation for HIPAA-compliant data destruction?',
      a: 'Yes, HIPAA requires documented procedures and records of all data destruction activities. This includes certificates of destruction, audit logs, and chain of custody records.'
    }
  ],
  'sox': [
    {
      q: 'How does SOX affect data retention and destruction?',
      a: 'Sarbanes-Oxley requires retaining financial records for 7 years. After retention period, data must be securely destroyed with documented proof to prevent unauthorized recovery.'
    }
  ],
  'pci': [
    {
      q: 'What are PCI-DSS requirements for cardholder data destruction?',
      a: 'PCI-DSS 3.1 requires rendering cardholder data unrecoverable when no longer needed. Must use cross-cut shredding, incineration, or secure wiping with DoD 5220.22-M standard or equivalent.'
    }
  ]
};

export default function Sid() {
  const [isOpen, setIsOpen] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: `👋 Hi! I'm Sid, your AI Data Security Assistant.\n\nI can help with:\n🛡️ **Wipe Standards** (NIST 800-88, DoD 5220.22-M, GDPR, HIPAA)\n📋 **Step Guides** (Hard drives, mobile devices, servers)\n✅ **Compliance** (GDPR, HIPAA, SOX, PCI-DSS Q&A)\n⚡ **Emergency** (24/7 rapid response procedures)\n📄 **Certificates** (Documentation & audit trails)\n\nWhat can I help you with today?`,
      sender: 'sid',
      timestamp: new Date()
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [showQuickActions, setShowQuickActions] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Smart response generator with knowledge base
  const generateResponse = (userInput: string): string => {
    const lower = userInput.toLowerCase();
    
    // Wipe Standards Queries
    if (lower.includes('nist') || lower.includes('800-88')) {
      return `📘 **NIST 800-88 Standard**\n\n${wipeStandards.nist.description}\n\n**Methods:**\n${wipeStandards.nist.methods.join(', ')}\n\n**Details:** ${wipeStandards.nist.details}\n\nNeed help implementing NIST 800-88? Just ask!`;
    }
    
    if (lower.includes('dod') || lower.includes('5220')) {
      return `📘 **DoD 5220.22-M Standard**\n\n${wipeStandards.dod.description}\n\n**Methods:**\n${wipeStandards.dod.methods.join(', ')}\n\n**Details:** ${wipeStandards.dod.details}\n\nWant to see a step-by-step guide for DoD wiping?`;
    }
    
    if (lower.includes('gdpr') && !lower.includes('compliance question')) {
      return `📘 **GDPR Article 17 - Right to Erasure**\n\n${wipeStandards.gdpr.description}\n\n**Methods:**\n${wipeStandards.gdpr.methods.join(', ')}\n\n**Details:** ${wipeStandards.gdpr.details}\n\nHave questions about GDPR compliance? I can answer those too!`;
    }
    
    if (lower.includes('hipaa') && !lower.includes('compliance question')) {
      return `📘 **HIPAA Security Rule**\n\n${wipeStandards.hipaa.description}\n\n**Methods:**\n${wipeStandards.hipaa.methods.join(', ')}\n\n**Details:** ${wipeStandards.hipaa.details}\n\nNeed HIPAA compliance Q&A? Just ask!`;
    }
    
    // Step-by-Step Guides
    if (lower.includes('hard drive') || lower.includes('hdd') || lower.includes('ssd')) {
      const guide = stepGuides.hard_drive;
      return `📋 **${guide.title}**\n\n${guide.steps.join('\n')}\n\n⏱️ **Duration:** ${guide.duration}\n\nNeed more details on any step?`;
    }
    
    if (lower.includes('mobile') || lower.includes('phone') || lower.includes('smartphone') || lower.includes('tablet')) {
      const guide = stepGuides.mobile;
      return `📋 **${guide.title}**\n\n${guide.steps.join('\n')}\n\n⏱️ **Duration:** ${guide.duration}\n\nQuestions about mobile device wiping?`;
    }
    
    if (lower.includes('server') || lower.includes('decommission')) {
      const guide = stepGuides.server;
      return `📋 **${guide.title}**\n\n${guide.steps.join('\n')}\n\n⏱️ **Duration:** ${guide.duration}\n\nNeed help with server decommissioning?`;
    }
    
    if (lower.includes('step') || lower.includes('guide') || lower.includes('how to')) {
      return `📋 **Available Step-by-Step Guides:**\n\n1️⃣ Hard Drive Wiping (HDDs & SSDs)\n2️⃣ Mobile Device Wiping (iOS & Android)\n3️⃣ Server Decommissioning\n\nWhich guide would you like to see?`;
    }
    
    // Compliance Q&A
    if (lower.includes('compliance') && lower.includes('gdpr')) {
      const qa = complianceQA.gdpr;
      return `✅ **GDPR Compliance Q&A**\n\n**Q:** ${qa[0].q}\n**A:** ${qa[0].a}\n\n**Q:** ${qa[1].q}\n**A:** ${qa[1].a}\n\nMore GDPR questions? Ask away!`;
    }
    
    if (lower.includes('compliance') && lower.includes('hipaa')) {
      const qa = complianceQA.hipaa;
      return `✅ **HIPAA Compliance Q&A**\n\n**Q:** ${qa[0].q}\n**A:** ${qa[0].a}\n\n**Q:** ${qa[1].q}\n**A:** ${qa[1].a}\n\nNeed more HIPAA guidance?`;
    }
    
    if (lower.includes('sox') || lower.includes('sarbanes')) {
      const qa = complianceQA.sox;
      return `✅ **SOX Compliance Q&A**\n\n**Q:** ${qa[0].q}\n**A:** ${qa[0].a}\n\nQuestions about SOX data retention?`;
    }
    
    if (lower.includes('pci') || lower.includes('cardholder')) {
      const qa = complianceQA.pci;
      return `✅ **PCI-DSS Compliance Q&A**\n\n**Q:** ${qa[0].q}\n**A:** ${qa[0].a}\n\nNeed more PCI-DSS information?`;
    }
    
    // Emergency Procedures
    if (lower.includes('emergency') || lower.includes('urgent') || lower.includes('breach') || lower.includes('immediate')) {
      return `🚨 **EMERGENCY DATA WIPE PROCEDURE**\n\n**Immediate Actions:**\n1. Disconnect device from all networks NOW\n2. Power off if breach is active\n3. Contact our 24/7 emergency team: +91-XXXX-XXXX\n4. Document the incident (time, scope, affected systems)\n5. Preserve evidence if legal investigation likely\n\n**Rapid Response:**\n- On-site team dispatch: 2-4 hours\n- Remote wipe support: Immediate\n- Incident coordinator available 24/7\n\n⚠️ **Do NOT attempt DIY wiping in breach scenarios - contact us first!**\n\nShould I escalate this to our emergency coordinator?`;
    }
    
    // Certificate/Documentation
    if (lower.includes('certificate') || lower.includes('proof') || lower.includes('documentation') || lower.includes('audit')) {
      return `📄 **Certificates & Documentation**\n\nWe provide:\n\n✅ **Certificate of Destruction** - Legal proof of data erasure\n✅ **Audit Logs** - Detailed process records with timestamps\n✅ **Chain of Custody** - Complete device tracking\n✅ **Compliance Attestations** - NIST/DoD/GDPR/HIPAA verification\n✅ **Before/After Reports** - Verification scan results\n\nAll documents are:\n- Digitally signed & tamper-proof\n- Legally admissible in court\n- Retained for 7+ years\n- Available in PDF/XML formats\n\nWant to see a sample certificate?`;
    }
    
    // Pricing
    if (lower.includes('price') || lower.includes('cost') || lower.includes('pricing') || lower.includes('how much')) {
      return `💰 **Pricing Plans**\n\n**Starter (₹0/forever)**\n- 5 devices/month\n- Basic compliance\n- Email support\n\n**Pro (₹299/month)**\n- 50 devices/month\n- All compliance standards\n- Priority support\n- Military-grade methods\n\n**Advanced (₹699/month)**\n- Unlimited devices\n- On-site services\n- Dedicated manager\n- Custom integration\n\nWant to know which plan fits your needs?`;
    }
    
    // Best Practices
    if (lower.includes('best practice') || lower.includes('recommend')) {
      return `⭐ **Data Wiping Best Practices**\n\n1. **Always backup first** - Verify backups before wiping\n2. **Use certified tools** - NIST/DoD approved software\n3. **Multiple passes** - Minimum 3-pass overwrite\n4. **Verify results** - Always run verification scan\n5. **Document everything** - Maintain audit trail\n6. **Physical security** - Secure devices during process\n7. **Network isolation** - Disconnect during wiping\n8. **Certificate storage** - Keep for 7+ years\n\nFollowing a specific compliance standard? Let me tailor these to your needs!`;
    }
    
    // Default helpful response
    return `I'd be happy to help! I specialize in:\n\n🛡️ **Wipe Standards** - NIST, DoD, GDPR, HIPAA\n📋 **Step Guides** - Hard drives, mobile, servers\n✅ **Compliance** - Q&A for all major standards\n⚡ **Emergency** - 24/7 rapid response\n📄 **Documentation** - Certificates & audit trails\n\nWhat specific question can I answer for you?`;
  };

  const sendMessage = async (messageText?: string) => {
    const textToSend = messageText || inputMessage;
    if (!textToSend.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: textToSend,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);
    setShowQuickActions(false);

    // Simulate thinking delay for better UX
    await new Promise(resolve => setTimeout(resolve, 500));

    const response = generateResponse(textToSend);

    const sidMessage: Message = {
      id: (Date.now() + 1).toString(),
      text: response,
      sender: 'sid',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, sidMessage]);
    setIsLoading(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  // Quick action buttons for common queries
  const quickActions = [
    { icon: Shield, label: 'Wipe Standards', query: 'Tell me about wipe standards' },
    { icon: BookOpen, label: 'Step Guide', query: 'Show me step-by-step guide' },
    { icon: FileCheck, label: 'Compliance', query: 'GDPR and HIPAA compliance' },
    { icon: Zap, label: 'Emergency', query: 'Emergency wipe procedure' }
  ];

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
                    <p className="text-sm leading-relaxed whitespace-pre-line">{message.text}</p>
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

          {/* Quick Actions (shown on first interaction) */}
          {showQuickActions && messages.length <= 1 && (
            <div className="px-4 pb-2 border-t border-gray-100">
              <p className="text-xs text-gray-600 mb-2 font-medium pt-2">Quick Help:</p>
              <div className="grid grid-cols-2 gap-2">
                {quickActions.map((action, index) => (
                  <button
                    key={index}
                    onClick={() => sendMessage(action.query)}
                    className="flex items-center gap-2 px-3 py-2 bg-blue-50 hover:bg-blue-100 rounded-lg text-left transition-colors"
                  >
                    <action.icon className="w-4 h-4 text-blue-600 flex-shrink-0" />
                    <span className="text-xs text-gray-700 font-medium">{action.label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

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
                onClick={() => sendMessage()}
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

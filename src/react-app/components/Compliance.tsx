import { Shield, FileCheck, Globe2, Lock } from 'lucide-react';

export default function Compliance() {
  const standards = [
    {
      name: "NIST 800-88",
      description: "National Institute of Standards and Technology guidelines for media sanitization",
      icon: Shield
    },
    {
      name: "GDPR",
      description: "General Data Protection Regulation compliance for EU data subjects",
      icon: Globe2
    },
    {
      name: "HIPAA",
      description: "Health Insurance Portability and Accountability Act requirements",
      icon: Lock
    },
    {
      name: "SOX",
      description: "Sarbanes-Oxley Act compliance for financial data protection",
      icon: FileCheck
    },
    {
      name: "DoD 5220.22-M",
      description: "Department of Defense standard for clearing and sanitizing storage devices",
      icon: Shield
    },
    {
      name: "ISO 27001",
      description: "International standard for information security management systems",
      icon: Globe2
    }
  ];

  return (
    <section id="compliance" className="py-20 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            Compliance & Certifications
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Meet regulatory requirements and industry standards with our certified 
            data erasure processes. Complete documentation and audit trails included.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {standards.map((standard, index) => (
            <div key={index} className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 hover:border-blue-500 transition-all group">
              <div className="flex items-center mb-4">
                <div className="bg-blue-600 p-3 rounded-lg group-hover:bg-blue-500 transition-colors">
                  <standard.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold ml-4">{standard.name}</h3>
              </div>
              <p className="text-gray-300 leading-relaxed">{standard.description}</p>
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-r from-blue-600/20 to-blue-700/20 rounded-xl p-8 lg:p-12 border border-blue-500/30 backdrop-blur-sm">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-3xl font-bold mb-4">Comprehensive Documentation</h3>
              <p className="text-xl text-gray-300 mb-6 leading-relaxed">
                Every data erasure process includes detailed certificates of destruction, 
                audit trails, and compliance reports to satisfy regulatory requirements.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center text-gray-300">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mr-3"></div>
                  Digital certificates with cryptographic signatures
                </li>
                <li className="flex items-center text-gray-300">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mr-3"></div>
                  Chain of custody documentation
                </li>
                <li className="flex items-center text-gray-300">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mr-3"></div>
                  Audit-ready compliance reports
                </li>
                <li className="flex items-center text-gray-300">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mr-3"></div>
                  Forensic verification results
                </li>
              </ul>
            </div>
            
            <div className="text-center">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8">
                <FileCheck className="w-20 h-20 text-blue-400 mx-auto mb-4" />
                <h4 className="text-2xl font-bold mb-2">99.9% Audit Success</h4>
                <p className="text-gray-300">
                  Our documentation has a proven track record in regulatory audits and compliance reviews.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

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
    <section id="compliance" className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-slate-900 to-slate-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4">
            Compliance & Certifications
          </h2>
          <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto px-4">
            Meet regulatory requirements and industry standards with our certified 
            data erasure processes. Complete documentation and audit trails included.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-12 sm:mb-16">
          {standards.map((standard, index) => (
            <div key={index} className="bg-white/5 backdrop-blur-sm rounded-xl p-5 sm:p-6 border border-white/10 hover:border-brand-400/40 transition-all group shadow-soft hover:shadow-card">
              <div className="flex items-center mb-3 sm:mb-4">
                <div className="bg-brand-600 p-2.5 sm:p-3 rounded-lg group-hover:bg-brand-500 transition-colors shadow-md">
                  <standard.icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold ml-3 sm:ml-4">{standard.name}</h3>
              </div>
              <p className="text-sm sm:text-base text-gray-300 leading-relaxed">{standard.description}</p>
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-r from-brand-600/20 to-brand-700/20 rounded-xl p-6 sm:p-8 lg:p-12 border border-brand-400/30 backdrop-blur-sm shadow-card">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 items-center">
            <div>
              <h3 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">Comprehensive Documentation</h3>
              <p className="text-lg sm:text-xl text-gray-200 mb-4 sm:mb-6 leading-relaxed">
                Every data erasure process includes detailed certificates of destruction, 
                audit trails, and compliance reports to satisfy regulatory requirements.
              </p>
              <ul className="space-y-2.5 sm:space-y-3">
                <li className="flex items-center text-sm sm:text-base text-gray-200">
                  <div className="w-2 h-2 bg-brand-300 rounded-full mr-3 flex-shrink-0"></div>
                  Digital certificates with cryptographic signatures
                </li>
                <li className="flex items-center text-sm sm:text-base text-gray-200">
                  <div className="w-2 h-2 bg-brand-300 rounded-full mr-3 flex-shrink-0"></div>
                  Chain of custody documentation
                </li>
                <li className="flex items-center text-sm sm:text-base text-gray-200">
                  <div className="w-2 h-2 bg-brand-300 rounded-full mr-3 flex-shrink-0"></div>
                  Audit-ready compliance reports
                </li>
                <li className="flex items-center text-sm sm:text-base text-gray-200">
                  <div className="w-2 h-2 bg-brand-300 rounded-full mr-3 flex-shrink-0"></div>
                  Forensic verification results
                </li>
              </ul>
            </div>
            
            <div className="text-center mt-6 lg:mt-0">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 sm:p-8 shadow-soft">
                <FileCheck className="w-16 h-16 sm:w-20 sm:h-20 text-brand-300 mx-auto mb-3 sm:mb-4" />
                <h4 className="text-xl sm:text-2xl font-bold mb-2">99.9% Audit Success</h4>
                <p className="text-sm sm:text-base text-gray-200">
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

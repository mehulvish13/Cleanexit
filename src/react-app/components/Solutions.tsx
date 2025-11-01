import { Building2, Globe, Zap, Users } from 'lucide-react';

export default function Solutions() {
  const solutions = [
    {
      icon: Building2,
      title: "Enterprise Solutions",
      description: "Scalable data erasure solutions for large organizations with complex IT infrastructures.",
      features: [
        "Custom deployment options",
        "Integration with existing systems",
        "Dedicated account management",
        "Volume pricing available"
      ],
      cta: "Learn More"
    },
    {
      icon: Globe,
      title: "Cloud Data Erasure",
      description: "Secure deletion of data stored in cloud environments across multiple platforms.",
      features: [
        "AWS, Azure, GCP support",
        "Multi-region capabilities",
        "API-driven automation",
        "Real-time monitoring"
      ],
      cta: "Explore Cloud"
    },
    {
      icon: Zap,
      title: "Rapid Response",
      description: "Emergency data destruction services for time-critical security incidents.",
      features: [
        "24/7 emergency response",
        "On-site team deployment",
        "Incident documentation",
        "Forensic-ready reports"
      ],
      cta: "Emergency Contact"
    }
  ];

  return (
    <section id="solutions" className="py-16 sm:py-20 bg-white dark:bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Tailored Solutions for Every Need
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Whether you're a small business or a global enterprise, we have the right 
            data security solution to protect your organization and ensure compliance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {solutions.map((solution, index) => (
            <div key={index} className="bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-900 rounded-lg p-6 border border-gray-200 dark:border-gray-800 hover:shadow-lg transition-all group">
              <div className="bg-brand-600 p-3 rounded-lg w-fit mb-4 group-hover:bg-brand-700 transition-colors">
                <solution.icon className="w-6 h-6 text-white" />
              </div>
              
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{solution.title}</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed text-sm">{solution.description}</p>
              
              <ul className="space-y-2 mb-6">
                {solution.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center text-gray-700 dark:text-gray-300 text-sm">
                    <div className="w-1.5 h-1.5 bg-brand-600 rounded-full mr-2"></div>
                    {feature}
                  </li>
                ))}
              </ul>
              
              <button className="text-brand-600 font-semibold hover:text-brand-700 transition-colors text-sm">
                {solution.cta} →
              </button>
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-r from-brand-600 to-brand-700 rounded-lg p-6 sm:p-8 text-white text-center">
          <div className="max-w-3xl mx-auto">
            <Users className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-4 text-blue-200" />
            <h3 className="text-xl sm:text-2xl font-bold mb-3">Need a Custom Solution?</h3>
            <p className="text-base sm:text-lg text-blue-100 mb-6 leading-relaxed">
              Our team of data security experts can design a tailored solution 
              that meets your specific requirements and compliance needs.
            </p>
            <button className="bg-white text-brand-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
              Schedule Consultation
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

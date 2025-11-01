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
    <section id="solutions" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Tailored Solutions for Every Need
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Whether you're a small business or a global enterprise, we have the right 
            data security solution to protect your organization and ensure compliance.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
          {solutions.map((solution, index) => (
            <div key={index} className="bg-gradient-to-br from-gray-50 to-white rounded-lg p-6 border border-gray-200 hover:shadow-lg transition-all group">
              <div className="bg-blue-600 p-3 rounded-lg w-fit mb-4 group-hover:bg-blue-700 transition-colors">
                <solution.icon className="w-6 h-6 text-white" />
              </div>
              
              <h3 className="text-xl font-bold text-gray-900 mb-3">{solution.title}</h3>
              <p className="text-gray-600 mb-4 leading-relaxed text-sm">{solution.description}</p>
              
              <ul className="space-y-2 mb-6">
                {solution.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center text-gray-700 text-sm">
                    <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mr-2"></div>
                    {feature}
                  </li>
                ))}
              </ul>
              
              <button className="text-blue-600 font-semibold hover:text-blue-700 transition-colors text-sm">
                {solution.cta} →
              </button>
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg p-8 text-white text-center">
          <div className="max-w-3xl mx-auto">
            <Users className="w-12 h-12 mx-auto mb-4 text-blue-200" />
            <h3 className="text-2xl font-bold mb-3">Need a Custom Solution?</h3>
            <p className="text-lg text-blue-100 mb-6 leading-relaxed">
              Our team of data security experts can design a tailored solution 
              that meets your specific requirements and compliance needs.
            </p>
            <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
              Schedule Consultation
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

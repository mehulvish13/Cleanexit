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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {solutions.map((solution, index) => (
            <div key={index} className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-8 border border-gray-200 hover:shadow-xl transition-all group">
              <div className="bg-blue-600 p-4 rounded-lg w-fit mb-6 group-hover:bg-blue-700 transition-colors">
                <solution.icon className="w-8 h-8 text-white" />
              </div>
              
              <h3 className="text-2xl font-bold text-gray-900 mb-4">{solution.title}</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">{solution.description}</p>
              
              <ul className="space-y-3 mb-8">
                {solution.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center text-gray-700">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                    {feature}
                  </li>
                ))}
              </ul>
              
              <button className="text-blue-600 font-semibold hover:text-blue-700 transition-colors">
                {solution.cta} →
              </button>
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-8 lg:p-12 text-white text-center">
          <div className="max-w-3xl mx-auto">
            <Users className="w-16 h-16 mx-auto mb-6 text-blue-200" />
            <h3 className="text-3xl font-bold mb-4">Need a Custom Solution?</h3>
            <p className="text-xl text-blue-100 mb-8 leading-relaxed">
              Our team of data security experts can design a tailored solution 
              that meets your specific requirements and compliance needs.
            </p>
            <button className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
              Schedule Consultation
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

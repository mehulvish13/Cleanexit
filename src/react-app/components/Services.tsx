import { HardDrive, Server, Smartphone, Database, Award, Clock } from 'lucide-react';

export default function Services() {
  const services = [
    {
      icon: HardDrive,
      title: "Hard Drive Erasure",
      description: "Secure deletion of data from HDDs and SSDs using military-grade algorithms",
      features: ["DoD 5220.22-M Standard", "Multiple Pass Overwriting", "Verification Reports"]
    },
    {
      icon: Server,
      title: "Server Decommissioning",
      description: "Complete data center hardware sanitization and destruction services",
      features: ["On-site Services", "Chain of Custody", "Compliance Certificates"]
    },
    {
      icon: Smartphone,
      title: "Mobile Device Wiping",
      description: "Comprehensive mobile device data erasure for iOS and Android platforms",
      features: ["Remote Wiping", "BYOD Support", "Factory Reset Plus"]
    },
    {
      icon: Database,
      title: "Database Sanitization",
      description: "Secure removal of sensitive data from database systems and backups",
      features: ["SQL Injection Safe", "Backup Verification", "Live System Support"]
    }
  ];

  const stats = [
    { icon: Award, value: "99.9%", label: "Success Rate" },
    { icon: Clock, value: "< 24h", label: "Response Time" },
    { icon: HardDrive, value: "10M+", label: "Devices Processed" },
  ];

  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Comprehensive Data Erasure Services
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            From individual devices to enterprise data centers, we provide certified 
            data destruction services that meet the highest security standards.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {services.map((service, index) => (
            <div key={index} className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow border border-gray-200">
              <div className="flex items-center mb-6">
                <div className="bg-blue-100 p-3 rounded-lg">
                  <service.icon className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 ml-4">{service.title}</h3>
              </div>
              
              <p className="text-gray-600 mb-6 leading-relaxed">{service.description}</p>
              
              <ul className="space-y-3">
                {service.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center text-gray-700">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {stats.map((stat, index) => (
              <div key={index} className="flex flex-col items-center">
                <div className="bg-blue-100 p-4 rounded-full mb-4">
                  <stat.icon className="w-8 h-8 text-blue-600" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

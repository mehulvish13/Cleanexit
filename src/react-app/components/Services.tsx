import { HardDrive, Server, Smartphone, Database, Award, Clock, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router';
import Button from './ui/Button';

export default function Services() {
  const navigate = useNavigate();
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
    <section id="services" className="py-20 bg-gray-50 dark:bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Comprehensive Data Erasure Services
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            From individual devices to enterprise data centers, we provide certified 
            data destruction services that meet the highest security standards.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {services.map((service, index) => (
            <div key={index} className="bg-white dark:bg-gray-900 rounded-lg p-6 shadow-soft hover:shadow-card transition-shadow border border-gray-200 dark:border-gray-800">
              <div className="flex items-center mb-4">
                <div className="bg-brand-50 dark:bg-gray-800 p-2 rounded-lg">
                  <service.icon className="w-6 h-6 text-brand-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white ml-3">{service.title}</h3>
              </div>
              
              <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed text-sm">{service.description}</p>
              
              <ul className="space-y-2 mb-4">
                {service.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center text-gray-700 dark:text-gray-300 text-sm">
                    <div className="w-1.5 h-1.5 bg-brand-600 rounded-full mr-2"></div>
                    {feature}
                  </li>
                ))}
              </ul>
              
              <Button onClick={() => navigate('/wipe')} variant="primary" size="md" block>
                <span className="mr-2">Try Now</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          ))}
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-lg p-6 shadow-soft border border-gray-200 dark:border-gray-800">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            {stats.map((stat, index) => (
              <div key={index} className="flex flex-col items-center">
                <div className="bg-brand-50 dark:bg-gray-800 p-3 rounded-full mb-3">
                  <stat.icon className="w-6 h-6 text-brand-600" />
                </div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">{stat.value}</div>
                <div className="text-gray-600 dark:text-gray-300 font-medium text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

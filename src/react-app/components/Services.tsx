import { HardDrive, Server, Smartphone, Database, Award, Clock, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router';
import Button from './ui/Button';

export default function Services() {
  const navigate = useNavigate();
  const services = [
    {
      icon: HardDrive,
      title: "Hard drive & SSD erasure",
      description: "Permanently wipe HDDs and SSDs with proven, audit-ready methods.",
      features: ["DoD 5220.22-M standard", "Multi-pass overwrite", "Verification reports"]
    },
    {
      icon: Server,
      title: "Server decommissioning",
      description: "End-to-end data center sanitization with full chain-of-custody.",
      features: ["On‑site teams", "Chain of custody", "Compliance certificates"]
    },
    {
      icon: Smartphone,
      title: "Mobile device wiping",
      description: "Erase iOS and Android devices at scale — remote or on‑site.",
      features: ["Remote wipe", "BYOD support", "Factory reset plus"]
    },
    {
      icon: Database,
      title: "Database sanitization",
      description: "Remove sensitive data from databases and backups without downtime.",
      features: ["Backup verification", "Migration safe", "Live system support"]
    }
  ];

  const stats = [
    { icon: Award, value: "99.9%", label: "Success Rate" },
    { icon: Clock, value: "< 24h", label: "Response Time" },
    { icon: HardDrive, value: "10M+", label: "Devices Processed" },
  ];

  return (
    <section id="services" className="bg-canvas-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="mb-4 text-4xl font-heading font-semibold text-slate-900">
            Everything you need to wipe, securely
          </h2>
          <p className="mx-auto max-w-3xl text-xl text-slate-600">
            From old laptops to cloud servers — we wipe everything, securely.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {services.map((service, index) => (
            <div key={index} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-soft transition-shadow hover:shadow-card">
              <div className="flex items-center mb-4">
                <div className="rounded-lg bg-brand-50 p-2">
                  <service.icon className="h-6 w-6 text-brand-600" />
                </div>
                <h3 className="ml-3 text-xl font-semibold text-slate-900">{service.title}</h3>
              </div>
              
              <p className="mb-4 text-sm leading-relaxed text-slate-600">{service.description}</p>
              
              <ul className="space-y-2 mb-4">
                {service.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center text-sm text-slate-700">
                    <div className="mr-2 h-1.5 w-1.5 rounded-full bg-brand-600"></div>
                    {feature}
                  </li>
                ))}
              </ul>
              
              <Button onClick={() => navigate('/login?returnTo=%2Fcertificate')} variant="primary" size="md" block>
                <span className="mr-2">Try it free</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          ))}
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-soft">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            {stats.map((stat, index) => (
              <div key={index} className="flex flex-col items-center">
                <div className="mb-3 rounded-full bg-brand-50 p-3">
                  <stat.icon className="h-6 w-6 text-brand-600" />
                </div>
                <div className="mb-1 text-2xl font-semibold text-slate-900">{stat.value}</div>
                <div className="text-sm font-medium text-slate-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

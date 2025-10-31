import { Check, Star, Shield, Zap } from 'lucide-react';
import { useAuth } from '@getmocha/users-service/react';
import { useNavigate } from 'react-router';

export default function Pricing() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const plans = [
    {
      name: "Starter",
      price: "0",
      period: "forever",
      description: "Perfect for individuals and small teams getting started with data security",
      icon: Shield,
      features: [
        "Up to 5 device erasures per month",
        "Basic compliance reporting",
        "Email support",
        "Standard erasure methods",
        "Mobile device support",
        "Basic audit trail"
      ],
      buttonText: "Get Started Free",
      popular: false,
      gradient: "from-gray-600 to-gray-700"
    },
    {
      name: "Pro",
      price: "299",
      period: "per month",
      description: "Advanced features for growing businesses with higher security needs",
      icon: Star,
      features: [
        "Up to 50 device erasures per month",
        "Advanced compliance reporting",
        "Priority email & phone support",
        "Military-grade erasure algorithms",
        "Server decommissioning support",
        "Detailed forensic verification",
        "GDPR & HIPAA compliance",
        "Custom certificates",
        "24/7 emergency response"
      ],
      buttonText: "Start Pro Trial",
      popular: true,
      gradient: "from-blue-600 to-blue-700"
    },
    {
      name: "Advanced",
      price: "699", 
      period: "per month",
      description: "Enterprise-grade solution for large organizations with complex requirements",
      icon: Zap,
      features: [
        "Unlimited device erasures",
        "Enterprise compliance suite",
        "Dedicated account manager",
        "On-site erasure services",
        "Custom integration support",
        "Real-time monitoring dashboard",
        "All compliance standards",
        "White-label certificates",
        "SLA guarantee (99.9% uptime)",
        "API access",
        "Bulk processing capabilities",
        "Chain of custody documentation"
      ],
      buttonText: "Contact Sales",
      popular: false,
      gradient: "from-purple-600 to-purple-700"
    }
  ];

  const handlePlanSelection = (planName: string) => {
    if (!user) {
      navigate('/login');
      return;
    }
    
    if (planName === 'Advanced') {
      // For enterprise plan, redirect to contact
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // For other plans, go to dashboard
      navigate('/dashboard');
    }
  };

  return (
    <section id="pricing" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Choose the perfect plan for your data security needs. All plans include 
            our industry-leading erasure technology and compliance documentation.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {plans.map((plan, index) => (
            <div 
              key={index} 
              className={`relative bg-white rounded-2xl shadow-xl border-2 transition-all transform hover:scale-105 ${
                plan.popular ? 'border-blue-500 shadow-blue-200' : 'border-gray-200'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg">
                    Most Popular
                  </span>
                </div>
              )}
              
              <div className="p-8">
                <div className={`bg-gradient-to-r ${plan.gradient} p-4 rounded-xl w-fit mb-6`}>
                  <plan.icon className="w-8 h-8 text-white" />
                </div>
                
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">{plan.description}</p>
                
                <div className="mb-8">
                  <div className="flex items-baseline">
                    <span className="text-sm font-medium text-gray-500">₹</span>
                    <span className="text-5xl font-bold text-gray-900">{plan.price}</span>
                    <span className="text-gray-500 ml-2">/{plan.period}</span>
                  </div>
                </div>
                
                <button 
                  onClick={() => handlePlanSelection(plan.name)}
                  className={`w-full py-4 px-6 rounded-xl font-semibold transition-all mb-8 ${
                    plan.popular 
                      ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 shadow-lg hover:shadow-xl' 
                      : 'bg-gray-900 text-white hover:bg-gray-800'
                  }`}
                >
                  {plan.buttonText}
                </button>
                
                <ul className="space-y-4">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start">
                      <Check className="w-5 h-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                      <span className="text-gray-700 leading-relaxed">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="bg-white rounded-2xl p-8 lg:p-12 shadow-lg border border-gray-200">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">Frequently Asked Questions</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-3">What payment methods do you accept?</h4>
              <p className="text-gray-600 leading-relaxed">
                We accept all major credit cards, UPI payments, net banking, and can arrange invoicing for enterprise customers.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-3">Can I upgrade or downgrade my plan?</h4>
              <p className="text-gray-600 leading-relaxed">
                Yes, you can change your plan at any time. Changes take effect immediately and we'll prorate any billing differences.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-3">Is there a setup fee?</h4>
              <p className="text-gray-600 leading-relaxed">
                No setup fees for Starter and Pro plans. Advanced plan includes complimentary setup and onboarding support.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-3">What if I exceed my monthly limit?</h4>
              <p className="text-gray-600 leading-relaxed">
                We'll contact you before you reach your limit. Additional erasures are charged at ₹50 per device for Pro plan users.
              </p>
            </div>
          </div>
        </div>

        {/* Trust Badge */}
        <div className="text-center mt-12">
          <p className="text-gray-500 mb-4">Trusted by over 500+ businesses worldwide</p>
          <div className="flex justify-center items-center space-x-8 opacity-60">
            <div className="text-2xl font-bold text-gray-400">NIST</div>
            <div className="text-2xl font-bold text-gray-400">ISO 27001</div>
            <div className="text-2xl font-bold text-gray-400">GDPR</div>
            <div className="text-2xl font-bold text-gray-400">HIPAA</div>
          </div>
        </div>
      </div>
    </section>
  );
}

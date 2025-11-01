/**
 * PRICING SECTION CONTENT
 * 
 * Customize the pricing plans here
 */

export const pricingContent = {
  header: {
    title: 'Simple, Transparent Pricing',
    description: 'Choose the perfect plan for your data security needs. All plans include our industry-leading erasure technology and compliance documentation.'
  },
  plans: [
    {
      id: 'starter',
      name: 'Starter',
      price: '0',
      period: 'forever',
      description: 'Perfect for individuals and small teams getting started with data security',
      icon: 'Shield',
      gradient: 'from-gray-600 to-gray-700',
      popular: false,
      buttonText: 'Get Started Free',
      features: [
        'Up to 5 device erasures per month',
        'Basic compliance reporting',
        'Email support',
        'Standard erasure methods',
        'Mobile device support',
        'Basic audit trail'
      ]
    },
    {
      id: 'pro',
      name: 'Pro',
      price: '299',
      period: 'per month',
      description: 'Advanced features for growing businesses with higher security needs',
      icon: 'Star',
      gradient: 'from-blue-600 to-blue-700',
      popular: true,
      buttonText: 'Start Pro Trial',
      features: [
        'Up to 50 device erasures per month',
        'Advanced compliance reporting',
        'Priority email & phone support',
        'Military-grade erasure algorithms',
        'Server decommissioning support',
        'Detailed forensic verification',
        'GDPR & HIPAA compliance',
        'Custom certificates',
        '24/7 emergency response'
      ]
    },
    {
      id: 'advanced',
      name: 'Advanced',
      price: '699',
      period: 'per month',
      description: 'Enterprise-grade solution for large organizations with complex requirements',
      icon: 'Zap',
      gradient: 'from-purple-600 to-purple-700',
      popular: false,
      buttonText: 'Contact Sales',
      features: [
        'Unlimited device erasures',
        'Enterprise compliance suite',
        'Dedicated account manager',
        'On-site erasure services',
        'Custom integration support',
        'Real-time monitoring dashboard',
        'All compliance standards',
        'White-label certificates',
        'SLA guarantee (99.9% uptime)',
        'API access',
        'Bulk processing capabilities',
        'Chain of custody documentation'
      ]
    }
  ],
  faq: [
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit cards, UPI payments, net banking, and can arrange invoicing for enterprise customers.'
    },
    {
      question: 'Can I upgrade or downgrade my plan?',
      answer: "Yes, you can change your plan at any time. Changes take effect immediately and we'll prorate any billing differences."
    },
    {
      question: 'Is there a setup fee?',
      answer: 'No setup fees for Starter and Pro plans. Advanced plan includes complimentary setup and onboarding support.'
    },
    {
      question: 'What if I exceed my monthly limit?',
      answer: "We'll contact you before you reach your limit. Additional erasures are charged at ₹50 per device for Pro plan users."
    }
  ],
  trustBadges: ['NIST', 'ISO 27001', 'GDPR', 'HIPAA']
};

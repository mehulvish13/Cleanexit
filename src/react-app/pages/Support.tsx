import { useState } from 'react';
import Header from '@/react-app/components/Header';
import Footer from '@/react-app/components/Footer';

interface TicketForm {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const faqs = [
  {
    q: 'How do I generate a certificate of destruction?',
    a: 'After a wipe completes, navigate to Dashboard → Quick Actions and use the Certificate option. You can download a signed PDF and keep it for audits.'
  },
  {
    q: 'Which wipe standards do you support?',
    a: 'We support NIST 800-88 and DoD 5220.22-M methods, among others. Sera can guide you to the right choice based on your needs.'
  },
  {
    q: 'Do I need to sign in before wiping?',
    a: 'Yes. For auditability and proof, we require users to sign in before starting a wipe. You will be redirected back to the requested action after sign-in.'
  },
  {
    q: 'Can I integrate Cleanexit with my MDM/ITSM tools?',
    a: 'Yes, our Advanced plan offers integrations. Contact us with your stack and we’ll share supported connectors and APIs.'
  }
];

export default function SupportPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [form, setForm] = useState<TicketForm>({ name: '', email: '', subject: '', message: '' });
  const [submitting, setSubmitting] = useState(false);
  const [ticketId, setTicketId] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.subject || !form.message) return;
    setSubmitting(true);

    const id = `TCK-${Date.now().toString(36).toUpperCase()}`;
    const ticket = { id, ...form, createdAt: new Date().toISOString(), status: 'open' };

    try {
      const existing = JSON.parse(localStorage.getItem('supportTickets') || '[]');
      localStorage.setItem('supportTickets', JSON.stringify([ticket, ...existing]));
      await new Promise(r => setTimeout(r, 600));
      setTicketId(id);
      setForm({ name: '', email: '', subject: '', message: '' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <section className="mb-10 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-3">Support</h1>
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-3xl">
            Get help with Cleanexit. Browse FAQs, reach our team, or open a support ticket. We’re here to help.
          </p>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          {/* FAQs */}
          <section className="lg:col-span-2 bg-gray-50 dark:bg-gray-900/50 rounded-2xl p-6 sm:p-8 border border-gray-200 dark:border-gray-800">
            <h2 className="text-xl sm:text-2xl font-bold mb-4">FAQs</h2>
            <div className="divide-y divide-gray-200 dark:divide-gray-800">
              {faqs.map((f, i) => (
                <div key={i} className="py-4">
                  <button
                    className="w-full text-left flex items-center justify-between"
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  >
                    <span className="font-medium">{f.q}</span>
                    <span className="text-brand-600">{openFaq === i ? '−' : '+'}</span>
                  </button>
                  {openFaq === i && (
                    <p className="mt-2 text-gray-600 dark:text-gray-300">{f.a}</p>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Ticket form */}
          <section className="bg-white dark:bg-gray-900 rounded-2xl p-6 sm:p-8 border border-gray-200 dark:border-gray-800">
            <h2 className="text-xl sm:text-2xl font-bold mb-4">Open a Ticket</h2>

            {ticketId && (
              <div className="mb-4 rounded-lg border border-green-300/50 bg-green-50 text-green-800 dark:bg-green-900/30 dark:text-green-200 p-3 text-sm">
                Thanks! Your ticket <span className="font-semibold">{ticketId}</span> has been created. We’ll reply at the email you provided.
              </div>
            )}

            <form onSubmit={onSubmit} className="space-y-4">
              <div>
                <label className="block text-sm mb-1">Name</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-950"
                  required
                />
              </div>
              <div>
                <label className="block text-sm mb-1">Email</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-950"
                  required
                />
              </div>
              <div>
                <label className="block text-sm mb-1">Subject</label>
                <input
                  type="text"
                  value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-950"
                  required
                />
              </div>
              <div>
                <label className="block text-sm mb-1">Message</label>
                <textarea
                  rows={4}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-950"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-brand-600 hover:bg-brand-700 text-white font-medium px-4 py-2 rounded-lg transition"
              >
                {submitting ? 'Submitting…' : 'Submit Ticket'}
              </button>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                We’ll store your ticket locally in this demo environment. For production, connect a helpdesk tool or API.
              </p>
            </form>
          </section>
        </div>

        {/* Contact strip */}
        <section className="mt-10 sm:mt-12 bg-gradient-to-br from-brand-600 to-brand-700 text-white rounded-2xl p-6 sm:p-8">
          <h3 className="text-lg sm:text-xl font-semibold mb-2">Need urgent help?</h3>
          <p className="text-white/90">24/7 emergency response: +91-XXXX-XXXX • support@cleanexit.com</p>
        </section>
      </main>

      <Footer />
    </div>
  );
}

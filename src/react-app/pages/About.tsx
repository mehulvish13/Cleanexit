import Header from '@/react-app/components/Header';
import Footer from '@/react-app/components/Footer';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <section className="mb-12 sm:mb-16">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">About Cleanexit</h1>
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-3xl">
            Cleanexit exists to make data disposal safe, simple, and compliant for everyone. From
            startups to global enterprises, we help teams retire devices and systems with confidence,
            backed by recognized security standards and clear documentation.
          </p>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-12 sm:mb-16">
          <div className="bg-gray-50 dark:bg-gray-900/50 rounded-2xl p-6 sm:p-8 border border-gray-200 dark:border-gray-800">
            <h2 className="text-xl sm:text-2xl font-bold mb-3">Our Brand Story</h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              We started Cleanexit after witnessing how difficult secure data disposal can be—
              disconnected tools, confusing standards, and risky manual processes. We built a platform
              that guides you end‑to‑end with practical workflows, built‑in compliance, and clear audit trails.
            </p>
          </div>
          <div className="bg-gray-50 dark:bg-gray-900/50 rounded-2xl p-6 sm:p-8 border border-gray-200 dark:border-gray-800">
            <h2 className="text-xl sm:text-2xl font-bold mb-3">Mission & Values</h2>
            <ul className="space-y-3 text-gray-600 dark:text-gray-300">
              <li>• Make secure erasure accessible and trustworthy</li>
              <li>• Build with empathy for IT teams and auditors</li>
              <li>• Default to transparency and verification</li>
              <li>• Design for real‑world constraints and scale</li>
            </ul>
          </div>
        </section>

        <section className="mb-12 sm:mb-16">
          <h2 className="text-xl sm:text-2xl font-bold mb-6">The Team</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { name: 'Alex Sharma', role: 'Founder & CEO' },
              { name: 'Priya Nair', role: 'Head of Security' },
              { name: 'Rahul Verma', role: 'Lead Engineer' },
              { name: 'Ananya Gupta', role: 'Product Designer' },
              { name: 'Vikram Rao', role: 'Customer Success' },
              { name: 'You?', role: 'We’re hiring soon' },
            ].map((m, i) => (
              <div key={i} className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-5">
                <div className="h-16 w-16 rounded-full bg-gradient-to-br from-brand-500 to-brand-700 mb-4" />
                <h3 className="font-semibold text-lg">{m.name}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{m.role}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-gradient-to-br from-brand-600 to-brand-700 text-white rounded-2xl p-6 sm:p-8">
          <h2 className="text-xl sm:text-2xl font-bold mb-2">Our Promise</h2>
          <p className="text-white/90 max-w-3xl">
            We meet you where you are—bring your devices, workflows, and compliance needs. Cleanexit
            blends expert guidance with automation so you can focus on your business, not on worry.
          </p>
        </section>
      </main>

      <Footer />
    </div>
  );
}

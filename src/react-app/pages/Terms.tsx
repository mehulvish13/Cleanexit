import Header from '@/react-app/components/Header';
import Footer from '@/react-app/components/Footer';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100">
      <Header />

      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-2">Terms of Service</h1>
        <p className="text-gray-600 dark:text-gray-300 mb-8">Last updated: Nov 1, 2025</p>

        <section className="prose prose-gray dark:prose-invert max-w-none">
          <h2>1. Acceptance of Terms</h2>
          <p>
            By accessing or using Cleanexit, you agree to these Terms. If you do not agree, do not use the service.
          </p>

          <h2>2. Services</h2>
          <p>
            Cleanexit provides tools to guide secure data erasure workflows. Certain features may be offered
            as part of paid plans and may require an active subscription.
          </p>

          <h2>3. Accounts</h2>
          <p>
            You are responsible for maintaining the confidentiality of your account and for all activities
            that occur under your account.
          </p>

          <h2>4. Acceptable Use</h2>
          <p>
            Do not misuse the service or attempt to access it using a method other than the interface provided.
            Do not violate applicable laws or third‑party rights while using the service.
          </p>

          <h2>5. Disclaimers</h2>
          <p>
            The service is provided "as is" without warranties of any kind. We do not guarantee that the
            service will be uninterrupted or error‑free.
          </p>

          <h2>6. Limitation of Liability</h2>
          <p>
            To the maximum extent permitted by law, Cleanexit shall not be liable for any indirect, incidental,
            special, consequential or punitive damages.
          </p>

          <h2>7. Termination</h2>
          <p>
            We may suspend or terminate your access if you violate these Terms.
          </p>

          <h2>8. Governing Law</h2>
          <p>
            These Terms are governed by applicable laws of your jurisdiction unless otherwise required.
          </p>

          <h2>9. Contact</h2>
          <p>
            Questions about these Terms? Contact legal@cleanexit.com.
          </p>
        </section>
      </main>

      <Footer />
    </div>
  );
}

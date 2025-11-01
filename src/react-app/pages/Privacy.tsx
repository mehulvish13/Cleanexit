import Header from '@/react-app/components/Header';
import Footer from '@/react-app/components/Footer';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100">
      <Header />

      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-2">Privacy Policy</h1>
        <p className="text-gray-600 dark:text-gray-300 mb-8">Last updated: Nov 1, 2025</p>

        <section className="prose prose-gray dark:prose-invert max-w-none">
          <p>
            Your privacy matters. This policy explains what information Cleanexit collects, how we use it,
            and the choices you have. This demo does not send data to a backend unless explicitly noted.
          </p>

          <h2>Information We Collect</h2>
          <ul>
            <li>Account information you provide (e.g., username)</li>
            <li>Usage data to improve the product (aggregated/anonymized)</li>
            <li>Support ticket details (if you submit via the Support page)</li>
          </ul>

          <h2>How We Use Information</h2>
          <ul>
            <li>To provide and maintain the service</li>
            <li>To communicate with you and provide support</li>
            <li>To comply with legal obligations where applicable</li>
          </ul>

          <h2>Data Retention</h2>
          <p>
            We retain information only as long as necessary for the purposes described. You can request deletion
            of local demo data by clearing your browser storage.
          </p>

          <h2>Your Rights</h2>
          <p>
            Depending on your region, you may have rights to access, correct, or delete your personal data.
            Contact us to make a request.
          </p>

          <h2>Contact</h2>
          <p>
            For privacy questions, email privacy@cleanexit.com.
          </p>
        </section>
      </main>

      <Footer />
    </div>
  );
}

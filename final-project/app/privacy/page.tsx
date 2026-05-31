import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy - DevQuery Forum',
  description: 'Our privacy policy explains how we collect, use, and protect your data.',
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-4xl font-bold mb-8 text-slate-900">Privacy Policy</h1>
        
        <div className="text-sm text-slate-500 mb-6">
          <p>Last updated: May 31, 2026</p>
        </div>

        <div className="space-y-6 text-slate-700 leading-relaxed">
          <section>
            <h2 className="text-2xl font-semibold mb-3 text-slate-800">1. Introduction</h2>
            <p>
              Welcome to DevQuery Forum (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;). We are committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3 text-slate-800">2. Information We Collect</h2>
            <div className="space-y-3">
              <div>
                <h3 className="text-lg font-semibold text-slate-700 mb-2">Personal Information</h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Email address</li>
                  <li>Name</li>
                  <li>Password (encrypted)</li>
                  <li>Profile information</li>
                  <li>Avatar/profile picture</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-700 mb-2">Automatically Collected Information</h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Browser type and version</li>
                  <li>IP address</li>
                  <li>Pages visited</li>
                  <li>Time and date of visit</li>
                  <li>Session duration</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-700 mb-2">Content You Create</h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Questions posted</li>
                  <li>Answers provided</li>
                  <li>Comments</li>
                  <li>Images uploaded</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3 text-slate-800">3. How We Use Your Information</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>To create and maintain your account</li>
              <li>To provide our services</li>
              <li>To process transactions</li>
              <li>To send transactional emails</li>
              <li>To improve our website and services</li>
              <li>To comply with legal obligations</li>
              <li>To respond to your inquiries</li>
              <li>To personalize your experience</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3 text-slate-800">4. Data Security</h2>
            <p>
              We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet is 100% secure.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3 text-slate-800">5. Third-Party Services</h2>
            <p>
              We may use third-party services including:
            </p>
            <ul className="list-disc pl-5 space-y-2 mt-2">
              <li>OpenAI for AI answer generation</li>
              <li>Resend for email services</li>
              <li>AWS S3 for file storage</li>
              <li>GitHub for authentication</li>
            </ul>
            <p className="mt-3">
              These third parties have their own privacy policies governing the use of your information.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3 text-slate-800">6. Your Rights</h2>
            <p>You have the right to:</p>
            <ul className="list-disc pl-5 space-y-2 mt-2">
              <li>Access your personal data</li>
              <li>Request correction of inaccurate data</li>
              <li>Request deletion of your data</li>
              <li>Opt out of communications</li>
              <li>Export your data</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3 text-slate-800">7. Cookies</h2>
            <p>
              We use cookies and similar tracking technologies to enhance your experience. You can control cookie settings through your browser preferences.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3 text-slate-800">8. GDPR & CCPA Compliance</h2>
            <p>
              If you are a resident of the EU, California, or other jurisdictions with data protection laws, you have additional rights. Contact us to exercise these rights.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3 text-slate-800">9. Contact Us</h2>
            <p>
              If you have questions about this Privacy Policy, please contact us at:{' '}
              <a href="mailto:privacy@devquery.forum" className="text-blue-600 hover:underline">
                privacy@devquery.forum
              </a>
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3 text-slate-800">10. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. We will notify you of any changes by updating the &quot;Last updated&quot; date above.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}


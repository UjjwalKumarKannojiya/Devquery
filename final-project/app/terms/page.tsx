import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms & Conditions - DevQuery Forum',
  description: 'Read our Terms & Conditions governing your use of DevQuery Forum.',
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-4xl font-bold mb-8 text-slate-900">Terms & Conditions</h1>
        
        <div className="text-sm text-slate-500 mb-6">
          <p>Last updated: May 31, 2026</p>
        </div>

        <div className="space-y-6 text-slate-700 leading-relaxed">
          <section>
            <h2 className="text-2xl font-semibold mb-3 text-slate-800">1. Agreement to Terms</h2>
            <p>
              By accessing and using DevQuery Forum (&quot;the Service&quot;), you accept and agree to be bound by and comply with these Terms and Conditions (&quot;Terms&quot;). If you do not agree to abide by the above, please do not use this service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3 text-slate-800">2. Use License</h2>
            <p>
              Permission is granted to temporarily download one copy of the materials (information or software) on DevQuery Forum for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
            </p>
            <ul className="list-disc pl-5 space-y-2 mt-2">
              <li>Modifying or copying the materials</li>
              <li>Using the materials for any commercial purpose or for any public display</li>
              <li>Attempting to decompile or reverse engineer any software contained on the Service</li>
              <li>Removing any copyright or other proprietary notations from the materials</li>
              <li>Transferring the materials to another person or &quot;mirroring&quot; the materials on any other server</li>
              <li>Violating any applicable laws or regulations</li>
              <li>Harassing or causing distress or inconvenience to any person</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3 text-slate-800">3. Disclaimer of Warranties</h2>
            <p>
              The materials on DevQuery Forum are provided on an &apos;as is&apos; basis. DevQuery Forum makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3 text-slate-800">4. Limitations of Liability</h2>
            <p>
              In no event shall DevQuery Forum or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on the Service, even if DevQuery Forum or a representative has been notified orally or in writing of the possibility of such damage.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3 text-slate-800">5. Accuracy of Materials</h2>
            <p>
              The materials appearing on DevQuery Forum could include technical, typographical, or photographic errors. DevQuery Forum does not warrant that any of the materials on the Service are accurate, complete, or current. DevQuery Forum may make changes to the materials contained on the Service at any time without notice.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3 text-slate-800">6. Materials and Content</h2>
            <p>
              Unless otherwise stated, DevQuery Forum and/or its licensors own the intellectual property rights to all material on the Service. All these intellectual property rights are reserved. You may view and print pages from the Service for personal, non-commercial use, subject to restrictions set in these Terms and Conditions.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3 text-slate-800">7. User-Generated Content</h2>
            <p>
              By posting content on DevQuery Forum, you grant us a worldwide, non-exclusive, royalty-free license to use, reproduce, modify, and distribute your content. You represent that you have the right to grant this license and that your content does not violate any third-party rights.
            </p>
            <p className="mt-3">
              You are prohibited from posting content that:
            </p>
            <ul className="list-disc pl-5 space-y-2 mt-2">
              <li>Is illegal or promotes illegal activity</li>
              <li>Contains hate speech or discriminatory language</li>
              <li>Violates intellectual property rights</li>
              <li>Is abusive, threatening, or harassing</li>
              <li>Contains spam or advertising</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3 text-slate-800">8. Modifications</h2>
            <p>
              DevQuery Forum may revise these Terms and Conditions for the Service at any time without notice. By using the Service, you are agreeing to be bound by the then current version of these Terms and Conditions.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3 text-slate-800">9. Governing Law</h2>
            <p>
              These Terms and Conditions and any separate agreements we provide will be governed by and construed in accordance with the laws of the jurisdiction in which DevQuery Forum is located.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3 text-slate-800">10. Account Suspension</h2>
            <p>
              We reserve the right to suspend or terminate your account if you violate these Terms or our community guidelines. Violations include but are not limited to spam, harassment, or posting inappropriate content.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3 text-slate-800">11. Contact for Terms Issues</h2>
            <p>
              If you have any questions about these Terms and Conditions, please contact us at:{' '}
              <a href="mailto:legal@devquery.forum" className="text-blue-600 hover:underline">
                legal@devquery.forum
              </a>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}


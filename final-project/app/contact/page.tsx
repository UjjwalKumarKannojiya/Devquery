import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us - DevQuery Forum',
  description: 'Get in touch with the DevQuery Forum team for support and inquiries.',
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-4xl font-bold mb-2 text-slate-900">Contact Us</h1>
          <p className="text-slate-600 mb-8">We&apos;d love to hear from you. Send us a message and we&apos;ll respond as soon as possible.</p>

          <div className="grid md:grid-cols-2 gap-8">
            {}
            <div>
              <form className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    placeholder="Your name"
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    placeholder="your@email.com"
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-slate-700 mb-2">
                    Subject
                  </label>
                  <select
                    id="subject"
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  >
                    <option value="">Select a subject</option>
                    <option value="support">Support</option>
                    <option value="bug">Bug Report</option>
                    <option value="feature">Feature Request</option>
                    <option value="feedback">Feedback</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    placeholder="Your message here..."
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    required
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
                >
                  Send Message
                </button>
              </form>
            </div>

            {}
            <div className="space-y-8">
              <div>
                <h3 className="text-lg font-semibold text-slate-800 mb-2">Email</h3>
                <a
                  href="mailto:support@devquery.forum"
                  className="text-blue-600 hover:underline"
                >
                  support@devquery.forum
                </a>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-slate-800 mb-2">Support Hours</h3>
                <p className="text-slate-600">
                  Monday - Friday: 9:00 AM - 5:00 PM EST<br />
                  Weekend: Email only
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-slate-800 mb-2">Response Time</h3>
                <p className="text-slate-600">
                  We typically respond to inquiries within 24 business hours.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-slate-800 mb-2">Quick Links</h3>
                <ul className="space-y-2 text-slate-600">
                  <li>
                    <a href="/privacy" className="text-blue-600 hover:underline">
                      Privacy Policy
                    </a>
                  </li>
                  <li>
                    <a href="/terms" className="text-blue-600 hover:underline">
                      Terms & Conditions
                    </a>
                  </li>
                  <li>
                    <a href="/feedback" className="text-blue-600 hover:underline">
                      Report a Bug
                    </a>
                  </li>
                </ul>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="text-sm font-semibold text-blue-900 mb-2">Need immediate help?</h3>
                <p className="text-sm text-blue-800">
                  Check out our FAQ or search the questions on DevQuery to find answers to common issues.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


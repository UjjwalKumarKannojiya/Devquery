import { Metadata } from 'next';
import GlassCard from "@/components/ui/GlassCard";

export const metadata: Metadata = {
  title: 'Contact Us - DevQuery Forum',
  description: 'Get in touch with the DevQuery Forum team for support and inquiries.',
};

export default function ContactPage() {
  return (
    <section className="relative min-h-screen glass flex flex-col justify-center py-12 px-4">
      <div className="absolute inset-0 -z-10">
        <div className="w-96 h-96 bg-blue-500 rounded-full opacity-20 animate-blob animation-delay-2000"></div>
        <div className="w-96 h-96 bg-purple-500 rounded-full opacity-20 animate-blob animation-delay-4000"></div>
      </div>
      <div className="max-w-2xl w-full mx-auto">
        <GlassCard className="p-8">
          <h1 className="text-4xl font-heading font-bold mb-2 text-foreground">Contact Us</h1>
          <p className="text-muted-foreground mb-8">We&apos;d love to hear from you. Send us a message and we&apos;ll respond as soon as possible.</p>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Contact Form */}
            <div>
              <form className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    placeholder="Your name"
                    className="w-full px-4 py-2 bg-background border border-border text-foreground rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    placeholder="your@email.com"
                    className="w-full px-4 py-2 bg-background border border-border text-foreground rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-foreground mb-2">
                    Subject
                  </label>
                  <select
                    id="subject"
                    className="w-full px-4 py-2 bg-background border border-border text-foreground rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
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
                  <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    placeholder="Your message here..."
                    className="w-full px-4 py-2 bg-background border border-border text-foreground rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                    required
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full liquid-glass text-white font-semibold py-2.5 px-4"
                >
                  Send Message
                </button>
              </form>
            </div>

            {/* Contact Info */}
            <div className="space-y-8">
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Email</h3>
                <a
                  href="mailto:support@devquery.forum"
                  className="text-primary hover:underline"
                >
                  support@devquery.forum
                </a>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Support Hours</h3>
                <p className="text-muted-foreground">
                  Monday - Friday: 9:00 AM - 5:00 PM EST<br />
                  Weekend: Email only
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Response Time</h3>
                <p className="text-muted-foreground">
                  We typically respond to inquiries within 24 business hours.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Quick Links</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>
                    <a href="/privacy" className="text-primary hover:underline">
                      Privacy Policy
                    </a>
                  </li>
                  <li>
                    <a href="/terms" className="text-primary hover:underline">
                      Terms & Conditions
                    </a>
                  </li>
                  <li>
                    <a href="/feedback" className="text-primary hover:underline">
                      Report a Bug
                    </a>
                  </li>
                </ul>
              </div>

              <div className="bg-primary/10 border border-primary/20 p-4 rounded-lg">
                <h3 className="text-sm font-semibold text-foreground mb-2">Need immediate help?</h3>
                <p className="text-sm text-muted-foreground">
                  Check out our FAQ or search the questions on DevQuery to find answers to common issues.
                </p>
              </div>
            </div>
          </div>
        </GlassCard>
      </div>
    </section>
  );
}

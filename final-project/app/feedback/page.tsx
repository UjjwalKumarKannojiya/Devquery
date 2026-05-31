import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Feedback & Bug Reports - DevQuery Forum',
  description: 'Help us improve! Share your feedback or report bugs you encountered.',
};

export default function FeedbackPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-4xl font-bold mb-2 text-slate-900">Share Your Feedback</h1>
          <p className="text-slate-600 mb-8">
            We&apos;re always looking to improve! Share your feedback, feature requests, or report bugs to help us make DevQuery Forum better.
          </p>

          <div className="space-y-8">
            {}
            <div className="border-b pb-8">
              <h2 className="text-2xl font-semibold text-slate-800 mb-4">🐛 Report a Bug</h2>
              <form className="space-y-4">
                <div>
                  <label htmlFor="bug-title" className="block text-sm font-medium text-slate-700 mb-1">
                    Bug Title *
                  </label>
                  <input
                    type="text"
                    id="bug-title"
                    placeholder="Brief description of the bug"
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="bug-description" className="block text-sm font-medium text-slate-700 mb-1">
                    Description *
                  </label>
                  <textarea
                    id="bug-description"
                    rows={4}
                    placeholder="What happened? What did you expect to happen?"
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none"
                    required
                  ></textarea>
                </div>

                <div>
                  <label htmlFor="bug-steps" className="block text-sm font-medium text-slate-700 mb-1">
                    Steps to Reproduce
                  </label>
                  <textarea
                    id="bug-steps"
                    rows={3}
                    placeholder="1. First step...&#10;2. Second step...&#10;3. Bug occurs..."
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none"
                  ></textarea>
                </div>

                <div>
                  <label htmlFor="bug-severity" className="block text-sm font-medium text-slate-700 mb-1">
                    Severity
                  </label>
                  <select
                    id="bug-severity"
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  >
                    <option value="low">Low - Minor issue, workaround available</option>
                    <option value="medium">Medium - Feature not working correctly</option>
                    <option value="high">High - Major functionality broken</option>
                    <option value="critical">Critical - Application unusable</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
                >
                  Report Bug
                </button>
              </form>
            </div>

            {}
            <div className="border-b pb-8">
              <h2 className="text-2xl font-semibold text-slate-800 mb-4">✨ Feature Request</h2>
              <form className="space-y-4">
                <div>
                  <label htmlFor="feature-title" className="block text-sm font-medium text-slate-700 mb-1">
                    Feature Title *
                  </label>
                  <input
                    type="text"
                    id="feature-title"
                    placeholder="Brief description of the feature"
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="feature-description" className="block text-sm font-medium text-slate-700 mb-1">
                    Description *
                  </label>
                  <textarea
                    id="feature-description"
                    rows={4}
                    placeholder="Describe the feature and how it would be useful..."
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
                    required
                  ></textarea>
                </div>

                <div>
                  <label htmlFor="feature-usecase" className="block text-sm font-medium text-slate-700 mb-1">
                    Use Case
                  </label>
                  <textarea
                    id="feature-usecase"
                    rows={3}
                    placeholder="How would you use this feature? What problem does it solve?"
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
                >
                  Request Feature
                </button>
              </form>
            </div>

            {}
            <div>
              <h2 className="text-2xl font-semibold text-slate-800 mb-4">💬 General Feedback</h2>
              <form className="space-y-4">
                <div>
                  <label htmlFor="feedback-type" className="block text-sm font-medium text-slate-700 mb-1">
                    Feedback Type *
                  </label>
                  <select
                    id="feedback-type"
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  >
                    <option value="">Select type...</option>
                    <option value="suggestion">Suggestion</option>
                    <option value="experience">User Experience</option>
                    <option value="performance">Performance</option>
                    <option value="design">Design</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="feedback-message" className="block text-sm font-medium text-slate-700 mb-1">
                    Your Feedback *
                  </label>
                  <textarea
                    id="feedback-message"
                    rows={5}
                    placeholder="Tell us what&apos;s on your mind..."
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    required
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
                >
                  Send Feedback
                </button>
              </form>
            </div>

            {}
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-semibold text-blue-900 mb-2">📋 Feedback Guidelines</h3>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Be specific and descriptive</li>
                <li>• Include screenshots or error messages when possible</li>
                <li>• Check if someone else already reported the issue</li>
                <li>• Be respectful and constructive</li>
                <li>• One topic per feedback submission</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


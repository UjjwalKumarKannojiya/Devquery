'use client';

import { useEffect, useState } from 'react';

export function CookieConsent() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Check if user has already accepted cookies
    const hasConsent = localStorage.getItem('cookie-consent');
    if (!hasConsent) {
      const timer = setTimeout(() => setShow(true), 0);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookie-consent', 'accepted');
    localStorage.setItem('cookie-consent-date', new Date().toISOString());
    setShow(false);
  };

  const handleDecline = () => {
    localStorage.setItem('cookie-consent', 'declined');
    setShow(false);
  };

  if (!show) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-slate-900 text-white p-4 z-50 shadow-2xl">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex-1">
          <p className="text-sm">
            We use cookies to enhance your experience, analyze site traffic, and serve targeted ads. By continuing to use this site, you agree to our use of cookies.{' '}
            <a href="/privacy" className="underline hover:text-blue-300">
              Learn more
            </a>
          </p>
        </div>
        <div className="flex gap-3 whitespace-nowrap">
          <button
            onClick={handleDecline}
            className="px-4 py-2 text-sm font-medium border border-slate-400 rounded hover:bg-slate-800"
          >
            Decline
          </button>
          <button
            onClick={handleAccept}
            className="px-4 py-2 text-sm font-medium bg-blue-600 rounded hover:bg-blue-700"
          >
            Accept Cookies
          </button>
        </div>
      </div>
    </div>
  );
}

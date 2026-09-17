import { useState } from 'react';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * WaitlistForm
 * ---------------------------------------------------------------------------
 * Email capture wired to our own backend (server/index.js), which validates
 * the email and writes it to a Supabase table. In dev, Vite proxies
 * `/api/*` to the Express server (see vite.config.js) so no CORS setup is
 * needed locally. In production, deploy the backend separately and set
 * VITE_API_URL to its public URL.
 *
 * Bot protection: a hidden honeypot field (_gotcha). The backend silently
 * discards any submission where that field is filled — genuine users never
 * see or touch it.
 *
 * @param {string} ctaLabel       - Button label text
 * @param {string} successHeading - Heading shown on success
 * @param {string} successBody    - Body shown on success
 */
export default function WaitlistForm({
  ctaLabel = 'Notify me',
  successHeading = "You're on the list.",
  successBody = "We'll email you the moment we launch.",
}) {
  const [email, setEmail] = useState('');
  const [honeypot, setHoneypot] = useState('');
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [error, setError] = useState('');
  const [alreadyExists, setAlreadyExists] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Client-side honeypot check (belt-and-suspenders; the backend also checks)
    if (honeypot) return;

    if (!EMAIL_RE.test(email)) {
      setError('Enter a valid email address.');
      setStatus('error');
      return;
    }

    setStatus('loading');
    setError('');

    try {
      // In dev this is proxied to the Express server by vite.config.js.
      // In prod, set VITE_API_URL to your deployed backend's base URL.
      const apiBase = import.meta.env.VITE_API_URL || '';

      const res = await fetch(`${apiBase}/api/waitlist`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, _gotcha: honeypot }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(data?.error || 'Submission failed. Try again.');
      }

      setAlreadyExists(Boolean(data?.alreadyExists));
      setStatus('success');
    } catch (err) {
      setError(err?.message || 'Something went wrong. Try again.');
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div role="status" className="text-center flex flex-col items-center gap-2">
        <p className="font-display italic text-champagne-bright text-lg">
          {alreadyExists ? "You're already on the list." : successHeading}
        </p>
        <p className="text-sm text-ash">{successBody}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="w-full max-w-md">
      {/* Honeypot — hidden from real users, catches naive bots */}
      <input
        type="text"
        name="_gotcha"
        value={honeypot}
        onChange={(e) => setHoneypot(e.target.value)}
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        style={{ display: 'none' }}
      />

      <div className="flex flex-col sm:flex-row gap-3">
        <label htmlFor="waitlist-email" className="sr-only">
          Email address
        </label>
        <input
          id="waitlist-email"
          type="email"
          inputMode="email"
          autoComplete="email"
          placeholder="you@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          aria-invalid={status === 'error'}
          aria-describedby={status === 'error' ? 'waitlist-error' : undefined}
          className="flex-1 bg-transparent border border-white/15 focus:border-champagne px-4 py-3
                     text-sm text-bone placeholder:text-ash outline-none transition-colors"
        />
        <button
          type="submit"
          disabled={status === 'loading'}
          className="whitespace-nowrap bg-champagne text-ink text-xs tracking-widest2 uppercase
                     font-medium px-6 py-3 hover:bg-champagne-bright transition-colors
                     disabled:opacity-60 disabled:cursor-wait"
        >
          {status === 'loading' ? 'Joining…' : ctaLabel}
        </button>
      </div>

      {status === 'error' && (
        <p id="waitlist-error" role="alert" className="mt-2 text-xs text-red-300/80">
          {error}
        </p>
      )}
    </form>
  );
}

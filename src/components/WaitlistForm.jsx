import { useState } from 'react';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * WaitlistForm
 * ---------------------------------------------------------------------------
 * Email capture wired to Formspree (https://formspree.io).
 * Setup: sign up at formspree.io → create a form → copy the 8-char form ID
 * → add VITE_FORMSPREE_ID=xxxxxxxx to your .env.local file.
 *
 * When the backend ships, replace this with a POST to your own /api/waitlist
 * endpoint — nothing else in this component changes.
 *
 * Bot protection: a hidden honeypot field (_gotcha). Formspree silently
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
  successBody = "We'll email you the moment the Geschichte line is live.",
}) {
  const [email, setEmail] = useState('');
  const [honeypot, setHoneypot] = useState('');
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Client-side honeypot check (belt-and-suspenders; Formspree also checks)
    if (honeypot) return;

    if (!EMAIL_RE.test(email)) {
      setError('Enter a valid email address.');
      setStatus('error');
      return;
    }

    setStatus('loading');
    setError('');

    try {
      const formId = import.meta.env.VITE_FORMSPREE_ID;
      if (!formId) {
        // Graceful dev-mode fallback when env var is missing
        throw new Error('Waitlist form not configured. Add VITE_FORMSPREE_ID to .env.local');
      }

      const res = await fetch(`https://formspree.io/f/${formId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.errors?.[0]?.message || 'Submission failed. Try again.');
      }

      setStatus('success');
    } catch (err) {
      setError(err?.message || 'Something went wrong. Try again.');
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div role="status" className="text-center flex flex-col items-center gap-2">
        <p className="font-display italic text-champagne-bright text-lg">{successHeading}</p>
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

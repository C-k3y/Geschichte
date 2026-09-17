import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import { supabase } from './supabaseClient.js';

const app = express();
const PORT = process.env.PORT || 3001;

// Comma-separated list in .env, e.g. "http://localhost:5173,https://geschichte.co"
const allowedOrigins = (process.env.ALLOWED_ORIGINS || 'http://localhost:5173').split(',');

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow no-origin requests (curl, server-to-server health checks)
      if (!origin || allowedOrigins.includes(origin)) return callback(null, true);
      return callback(new Error('Not allowed by CORS'));
    },
  })
);
app.use(express.json());

// Basic abuse protection: 5 submissions per IP per 10 minutes.
const waitlistLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many attempts. Try again in a few minutes.' },
});

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

app.post('/api/waitlist', waitlistLimiter, async (req, res) => {
  const { email, _gotcha } = req.body ?? {};

  // Honeypot: bots fill every field including hidden ones. Pretend success
  // so we don't tip them off that they were caught.
  if (_gotcha) {
    return res.status(200).json({ success: true });
  }

  if (typeof email !== 'string' || !EMAIL_RE.test(email.trim())) {
    return res.status(400).json({ error: 'Enter a valid email address.' });
  }

  const normalizedEmail = email.trim().toLowerCase();

  const { error } = await supabase.from('waitlist').insert({ email: normalizedEmail });

  if (error) {
    // Postgres unique_violation — this email is already on the list.
    // Treat it as a success from the user's point of view.
    if (error.code === '23505') {
      return res.status(200).json({ success: true, alreadyExists: true });
    }
    console.error('Supabase insert error:', error);
    return res.status(500).json({ error: 'Something went wrong. Try again.' });
  }

  return res.status(200).json({ success: true });
});

// Handy for a live "X people on the list" counter on the site later.
app.get('/api/waitlist/count', async (_req, res) => {
  const { count, error } = await supabase
    .from('waitlist')
    .select('*', { count: 'exact', head: true });

  if (error) {
    console.error('Supabase count error:', error);
    return res.status(500).json({ error: 'Could not fetch count.' });
  }

  return res.status(200).json({ count });
});

app.get('/api/health', (_req, res) => res.status(200).json({ ok: true }));

app.listen(PORT, () => {
  console.log(`Geschichte waitlist API listening on http://localhost:${PORT}`);
});

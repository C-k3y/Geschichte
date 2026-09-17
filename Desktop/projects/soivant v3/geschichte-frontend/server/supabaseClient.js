import { createClient } from '@supabase/supabase-js';

const { SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY } = process.env;

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  throw new Error(
    'Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY. Copy server/.env.example to server/.env and fill both in.'
  );
}

/**
 * IMPORTANT: this uses the service_role key, which has full read/write
 * access and bypasses Row Level Security. It must NEVER be sent to the
 * browser or committed to git — it only ever lives in this backend process,
 * loaded from an environment variable.
 */
export const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
  auth: { persistSession: false },
});

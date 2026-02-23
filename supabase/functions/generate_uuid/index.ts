import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

export async function handler() {
  const uuid = crypto.randomUUID();
  return {
    status: 200,
    body: JSON.stringify({ uuid })
  };
}
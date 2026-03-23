import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

/** False when env is missing (e.g. Vercel preview before env is set); forms should guard before calling. */
export const isSupabaseConfigured = Boolean(
  supabaseUrl && supabaseAnonKey && String(supabaseUrl).startsWith('http')
)

export const supabase = isSupabaseConfigured ? createClient(supabaseUrl, supabaseAnonKey) : null
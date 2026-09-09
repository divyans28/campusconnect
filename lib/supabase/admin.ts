import { createClient } from '@supabase/supabase-js'

// Admin client with service role key - ONLY use on server side for admin operations
// Never expose this to the browser
export function createAdminClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )
}

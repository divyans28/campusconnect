import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import type { Profile } from '@/lib/types'

export async function signUp(email: string, password: string, name: string) {
  const supabase = await createClient()

  // Create user in Supabase Auth with auto-confirm
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/app`,
      data: {
        email_confirm: true, // Auto-confirm email for development
      },
    },
  })

  if (authError) {
    return { error: authError.message }
  }

  if (!authData.user) {
    return { error: 'Failed to create user' }
  }

  // Create profile using admin client (bypasses RLS for initial creation)
  const adminSupabase = createAdminClient()

  // Generate a simple USN for now (user can update later)
  const usn = `TEMP${Date.now().toString().slice(-6)}`

  const { error: profileError } = await adminSupabase
    .from('profiles')
    .insert({
      user_id: authData.user.id,
      name,
      usn,
      branch: 'CSE', // Default
      section: 'A', // Default
      academic_year: 1, // Default
      semester: 1, // Default
      skills: [],
      interests: [],
      role: 'student',
    })

  if (profileError) {
    // If profile creation fails, we should delete the auth user
    await adminSupabase.auth.admin.deleteUser(authData.user.id)
    return { error: 'Failed to create profile' }
  }

  return { success: true, user: authData.user }
}

export async function signInServer(email: string, password: string) {
  const supabase = await createClient()

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    return { error: error.message }
  }

  return { success: true, user: data.user }
}

export async function getCurrentUserServer() {
  const supabase = await createClient()

  const { data: { user }, error } = await supabase.auth.getUser()

  if (error || !user) {
    return null
  }

  return user
}


import { createClient } from '@/lib/supabase/client'
import { createAdminClient } from '@/lib/supabase/admin'
import type { Profile } from '@/lib/types'

export async function signUp(email: string, password: string, name: string) {
  const adminSupabase = createAdminClient()

  // Create user in Supabase Auth using admin client (bypasses email confirmation)
  const { data: authData, error: authError } = await adminSupabase.auth.admin.createUser({
    email,
    password,
    emailConfirm: true, // Auto-confirm email for development
  })

  if (authError) {
    return { error: authError.message }
  }

  if (!authData.user) {
    return { error: 'Failed to create user' }
  }

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

export async function signIn(email: string, password: string) {
  const supabase = createClient()

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    return { error: error.message }
  }

  return { success: true, user: data.user }
}

export async function signOut() {
  const supabase = createClient()

  const { error } = await supabase.auth.signOut()

  if (error) {
    return { error: error.message }
  }

  return { success: true }
}

export async function getCurrentUser() {
  const supabase = createClient()

  const { data: { user }, error } = await supabase.auth.getUser()

  if (error || !user) {
    return null
  }

  return user
}

export async function getProfile(userId: string): Promise<Profile | null> {
  const supabase = createClient()

  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('user_id', userId)
    .single()

  if (error || !data) {
    return null
  }

  return data as Profile
}

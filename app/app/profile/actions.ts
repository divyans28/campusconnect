'use server'

import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { getCurrentUserServer } from '@/lib/auth-server'

export async function updateProfile(formData: {
  name: string
  usn: string
  branch: string
  section: string
  academic_year: number
  semester: number
  skills: string
  interests: string
}) {
  const user = await getCurrentUserServer()

  if (!user) {
    return { error: 'Not authenticated' }
  }

  const supabase = await createClient()

  // Check if profile exists
  const { data: existingProfile } = await supabase
    .from('profiles')
    .select('*')
    .eq('user_id', user.id)
    .single()

  // Parse skills and interests from comma-separated strings to arrays
  const skillsArray = formData.skills
    .split(',')
    .map(s => s.trim())
    .filter(s => s.length > 0)

  const interestsArray = formData.interests
    .split(',')
    .map(i => i.trim())
    .filter(i => i.length > 0)

  if (existingProfile) {
    // Update existing profile
    const { error } = await supabase
      .from('profiles')
      .update({
        name: formData.name,
        usn: formData.usn,
        branch: formData.branch,
        section: formData.section,
        academic_year: formData.academic_year,
        semester: formData.semester,
        skills: skillsArray,
        interests: interestsArray,
      })
      .eq('user_id', user.id)

    if (error) {
      return { error: error.message }
    }
  } else {
    // Create new profile using admin client (bypasses RLS for initial creation)
    const adminSupabase = createAdminClient()

    const { error } = await adminSupabase
      .from('profiles')
      .insert({
        user_id: user.id,
        name: formData.name,
        usn: formData.usn,
        branch: formData.branch,
        section: formData.section,
        academic_year: formData.academic_year,
        semester: formData.semester,
        skills: skillsArray,
        interests: interestsArray,
        role: 'student',
      })

    if (error) {
      return { error: error.message }
    }
  }

  return { success: true }
}

'use server'

import { createClient } from '@/lib/supabase/server'
import { getCurrentUserServer } from '@/lib/auth-server'
import type { Team } from '@/lib/types'

export async function createTeam(formData: {
  team_name: string
  event_name: string
  description: string
  max_members: number
  current_members: number
  required_skills: string[]
  roles_needed: string[]
  application_deadline?: string | null
}) {
  const user = await getCurrentUserServer()

  if (!user) {
    return { error: 'Not authenticated' }
  }

  const supabase = await createClient()

  const { error } = await supabase
    .from('teams')
    .insert({
      user_id: user.id, // Use authenticated user's ID, not from form
      team_name: formData.team_name,
      event_name: formData.event_name,
      description: formData.description,
      max_members: formData.max_members,
      current_members: formData.current_members,
      required_skills: formData.required_skills,
      roles_needed: formData.roles_needed,
      application_deadline: formData.application_deadline,
    })

  if (error) {
    return { error: error.message }
  }

  return { success: true }
}

export async function getTeam(id: string): Promise<Team | null> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('teams')
    .select('*')
    .eq('id', id)
    .single()

  if (error || !data) {
    return null
  }

  return data as Team
}

export async function updateTeam(id: string, updates: Partial<Team>) {
  const user = await getCurrentUserServer()

  if (!user) {
    return { error: 'Not authenticated' }
  }

  const supabase = await createClient()

  const { error } = await supabase
    .from('teams')
    .update(updates)
    .eq('id', id)
    .eq('user_id', user.id)

  if (error) {
    return { error: error.message }
  }

  return { success: true }
}

export async function deleteTeam(id: string) {
  const user = await getCurrentUserServer()

  if (!user) {
    return { error: 'Not authenticated' }
  }

  const supabase = await createClient()

  const { error } = await supabase
    .from('teams')
    .delete()
    .eq('id', id)
    .eq('user_id', user.id)

  if (error) {
    return { error: error.message }
  }

  return { success: true }
}

'use server'

import { createClient } from '@/lib/supabase/server'
import { getCurrentUserServer } from '@/lib/auth-server'
import type { Issue } from '@/lib/types'

export async function createIssue(formData: {
  title: string
  category: string
  location: string
  description: string
  image_url?: string
}) {
  const user = await getCurrentUserServer()

  if (!user) {
    return { error: 'Not authenticated' }
  }

  const supabase = await createClient()

  const { error } = await supabase
    .from('issues')
    .insert({
      user_id: user.id, // Use authenticated user's ID, not from form
      title: formData.title,
      category: formData.category,
      location: formData.location,
      description: formData.description,
      image_url: formData.image_url || null,
      status: 'submitted',
    })

  if (error) {
    return { error: error.message }
  }

  return { success: true }
}

export async function getIssue(id: string): Promise<Issue | null> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('issues')
    .select('*')
    .eq('id', id)
    .single()

  if (error || !data) {
    return null
  }

  return data as Issue
}

export async function updateIssueStatus(id: string, status: string) {
  const user = await getCurrentUserServer()

  if (!user) {
    return { error: 'Not authenticated' }
  }

  const supabase = await createClient()

  const { error } = await supabase
    .from('issues')
    .update({ status })
    .eq('id', id)
    .eq('user_id', user.id)

  if (error) {
    return { error: error.message }
  }

  return { success: true }
}

export async function deleteIssue(id: string) {
  const user = await getCurrentUserServer()

  if (!user) {
    return { error: 'Not authenticated' }
  }

  const supabase = await createClient()

  const { error } = await supabase
    .from('issues')
    .delete()
    .eq('id', id)
    .eq('user_id', user.id)

  if (error) {
    return { error: error.message }
  }

  return { success: true }
}

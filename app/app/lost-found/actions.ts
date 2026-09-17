'use server'

import { createClient } from '@/lib/supabase/server'
import { getCurrentUserServer } from '@/lib/auth-server'
import type { LostFoundItem } from '@/lib/types'

interface ActionResult {
  success?: boolean
  error?: string
}

export async function createItem(formData: {
  type: 'lost' | 'found'
  title: string
  category: string
  description: string
  location: string
  date: string
  image_url?: string
}): Promise<ActionResult> {
  const user = await getCurrentUserServer()

  if (!user) {
    return { error: 'Not authenticated' }
  }

  const supabase = await createClient()

  const { error } = await supabase
    .from('lost_found_items')
    .insert({
      user_id: user.id, // Use authenticated user's ID, not from form
      type: formData.type,
      title: formData.title,
      category: formData.category,
      description: formData.description,
      location: formData.location,
      date: formData.date,
      image_url: formData.image_url || null,
      status: 'open',
    })

  if (error) {
    return { error: error.message }
  }

  return { success: true }
}

export async function getItem(id: string): Promise<LostFoundItem | null> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('lost_found_items')
    .select('*')
    .eq('id', id)
    .single()

  if (error || !data) {
    return null
  }

  return data as LostFoundItem
}

export async function markAsResolved(id: string): Promise<ActionResult> {
  const user = await getCurrentUserServer()

  if (!user) {
    return { error: 'Not authenticated' }
  }

  const supabase = await createClient()

  const { error } = await supabase
    .from('lost_found_items')
    .update({ status: 'resolved' })
    .eq('id', id)
    .eq('user_id', user.id)

  if (error) {
    return { error: error.message }
  }

  return { success: true }
}

export async function deleteItem(id: string): Promise<ActionResult> {
  const user = await getCurrentUserServer()

  if (!user) {
    return { error: 'Not authenticated' }
  }

  const supabase = await createClient()

  const { error } = await supabase
    .from('lost_found_items')
    .delete()
    .eq('id', id)
    .eq('user_id', user.id)

  if (error) {
    return { error: error.message }
  }

  return { success: true }
}

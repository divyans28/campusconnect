'use server'

import { createClient } from '@/lib/supabase/server'
import { getCurrentUserServer } from '@/lib/auth-server'
import type { LostFoundItem } from '@/lib/types'

export async function createItem(formData: {
  user_id: string
  type: 'lost' | 'found'
  title: string
  category: string
  description: string
  location: string
  date: string
  image_url?: string
}) {
  const user = await getCurrentUserServer()

  if (!user) {
    return { error: 'Not authenticated' }
  }

  const supabase = await createClient()

  const { error } = await supabase
    .from('lost_found_items')
    .insert({
      user_id: formData.user_id,
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

export async function markAsResolved(id: string) {
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

export async function deleteItem(id: string) {
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

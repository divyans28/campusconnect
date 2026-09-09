'use server'

import { signUp } from '@/lib/auth-server'
import { redirect } from 'next/navigation'

export async function handleSignup(formData: FormData) {
  const name = formData.get('name') as string
  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const confirmPassword = formData.get('confirmPassword') as string

  // Basic validation
  if (password !== confirmPassword) {
    return { error: 'Passwords do not match' }
  }

  if (password.length < 6) {
    return { error: 'Password must be at least 6 characters' }
  }

  const result = await signUp(email, password, name)

  if (result.error) {
    return { error: result.error }
  }

  redirect('/app')
}

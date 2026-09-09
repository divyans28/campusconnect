'use server'

import { signInServer } from '@/lib/auth-server'
import { redirect } from 'next/navigation'

export async function handleLogin(formData: FormData) {
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  const result = await signInServer(email, password)

  if (result.error) {
    return { error: result.error }
  }

  redirect('/app')
}

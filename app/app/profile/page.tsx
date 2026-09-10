import { redirect } from 'next/navigation'
import { getCurrentUserServer } from '@/lib/auth-server'
import { getProfile } from '@/lib/auth'
import ProfileForm from './profile-form'
import AppLayout from '../layout'

export default async function ProfilePage() {
  const user = await getCurrentUserServer()

  if (!user) {
    redirect('/login')
  }

  // Get user profile
  const profile = await getProfile(user.id)

  return (
    <AppLayout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
          <p className="text-gray-600 mt-2">Manage your campus profile information</p>
        </div>

        <ProfileForm user={user} profile={profile} />
      </div>
    </AppLayout>
  )
}

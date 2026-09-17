import { redirect } from 'next/navigation'
import { getCurrentUserServer } from '@/lib/auth-server'
import CreateTeamForm from './create-team-form'
import AppLayout from '../../layout'

export default async function CreateTeamPage() {
  const user = await getCurrentUserServer()

  if (!user) {
    redirect('/login')
  }

  return (
    <AppLayout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Create Team</h1>
          <p className="text-gray-600 mt-2">Create a team listing to find teammates</p>
        </div>

        <CreateTeamForm />
      </div>
    </AppLayout>
  )
}

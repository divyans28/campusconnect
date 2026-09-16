import { redirect } from 'next/navigation'
import { getCurrentUserServer } from '@/lib/auth-server'
import { getTeam } from '../actions'
import TeamDetails from '../team-details'
import AppLayout from '../../layout'

export default async function TeamDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const user = await getCurrentUserServer()

  if (!user) {
    redirect('/login')
  }

  const { id } = await params
  const team = await getTeam(id)

  if (!team) {
    return (
      <AppLayout>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
            <p className="text-gray-500">Team not found</p>
          </div>
        </div>
      </AppLayout>
    )
  }

  const isOwner = team.user_id === user.id

  return (
    <AppLayout>
      <TeamDetails team={team} isOwner={isOwner} userId={user.id} />
    </AppLayout>
  )
}

import { redirect } from 'next/navigation'
import { getCurrentUserServer } from '@/lib/auth-server'
import { getIssue } from '../actions'
import IssueDetails from '../issue-details'
import AppLayout from '../../layout'

export default async function IssueDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const user = await getCurrentUserServer()

  if (!user) {
    redirect('/login')
  }

  const { id } = await params
  const issue = await getIssue(id)

  if (!issue) {
    return (
      <AppLayout>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
            <p className="text-gray-500">Issue not found</p>
          </div>
        </div>
      </AppLayout>
    )
  }

  const isOwner = issue.user_id === user.id

  return (
    <AppLayout>
      <IssueDetails issue={issue} isOwner={isOwner} userId={user.id} />
    </AppLayout>
  )
}

import { redirect } from 'next/navigation'
import { getCurrentUserServer } from '@/lib/auth-server'
import { createClient } from '@/lib/supabase/client'
import Link from 'next/link'
import AppLayout from '../layout'

export default async function IssuesPage() {
  const user = await getCurrentUserServer()

  if (!user) {
    redirect('/login')
  }

  const supabase = createClient()

  // Fetch all issues (users can see all issues but only edit their own)
  const { data: issues } = await supabase
    .from('issues')
    .select('*')
    .order('created_at', { ascending: false })

  return (
    <AppLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Issue Reporting</h1>
            <p className="text-gray-600 mt-2">Report campus issues and track their status</p>
          </div>
          <Link
            href="/app/issues/create"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Report Issue
          </Link>
        </div>

        {!issues || issues.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
            <p className="text-gray-500">No issues reported yet</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {issues.map((issue) => (
              <div
                key={issue.id}
                className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition"
              >
                <div className="flex items-center justify-between mb-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(issue.status)}`}
                  >
                    {formatStatus(issue.status)}
                  </span>
                  <span className="text-xs text-gray-500">
                    {issue.category}
                  </span>
                </div>

                <h3 className="text-lg font-semibold mb-2">{issue.title}</h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{issue.description}</p>

                <div className="text-sm text-gray-500 space-y-1">
                  <p><strong>Location:</strong> {issue.location}</p>
                  <p><strong>Reported:</strong> {new Date(issue.created_at).toLocaleDateString()}</p>
                </div>

                <Link
                  href={`/app/issues/${issue.id}`}
                  className="mt-4 inline-block text-blue-600 font-semibold text-sm hover:text-blue-700"
                >
                  View Details →
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </AppLayout>
  )
}

function getStatusColor(status: string): string {
  switch (status) {
    case 'submitted':
      return 'bg-blue-100 text-blue-700'
    case 'under_review':
      return 'bg-yellow-100 text-yellow-700'
    case 'in_progress':
      return 'bg-orange-100 text-orange-700'
    case 'resolved':
      return 'bg-green-100 text-green-700'
    default:
      return 'bg-gray-100 text-gray-700'
  }
}

function formatStatus(status: string): string {
  return status
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

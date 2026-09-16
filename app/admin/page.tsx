import { redirect } from 'next/navigation'
import { getCurrentUserServer } from '@/lib/auth-server'
import { getProfile } from '@/lib/auth'
import { createClient } from '@/lib/supabase/client'
import Link from 'next/link'

export default async function AdminDashboard() {
  const user = await getCurrentUserServer()

  if (!user) {
    redirect('/login')
  }

  const profile = await getProfile(user.id)

  if (!profile || profile.role !== 'admin') {
    redirect('/app')
  }

  const supabase = createClient()

  // Fetch all issues
  const { data: issues } = await supabase
    .from('issues')
    .select('*')
    .order('created_at', { ascending: false })

  // Fetch all lost_found_items
  const { data: items } = await supabase
    .from('lost_found_items')
    .select('*')
    .order('created_at', { ascending: false })

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-6 py-3">
            <Link
              href="/app"
              className="text-gray-700 hover:text-blue-600 transition font-medium"
            >
              Back to App
            </Link>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600 mt-2">Manage campus issues and Lost & Found posts</p>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold mb-2">Total Issues</h3>
            <p className="text-3xl font-bold text-blue-600">{issues?.length || 0}</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold mb-2">Total Lost & Found</h3>
            <p className="text-3xl font-bold text-green-600">{items?.length || 0}</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold mb-2">Resolved Issues</h3>
            <p className="text-3xl font-bold text-purple-600">
              {issues?.filter(i => i.status === 'resolved').length || 0}
            </p>
          </div>
        </div>

        {/* Issues Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Issues</h2>
          {!issues || issues.length === 0 ? (
            <p className="text-gray-500">No issues reported</p>
          ) : (
            <div className="space-y-4">
              {issues.map((issue) => (
                <div
                  key={issue.id}
                  className="border border-gray-200 rounded-lg p-4 flex items-center justify-between"
                >
                  <div className="flex-1">
                    <h3 className="font-semibold">{issue.title}</h3>
                    <p className="text-sm text-gray-600">{issue.category} • {issue.location}</p>
                    <p className="text-sm text-gray-500 mt-1">Status: {issue.status}</p>
                  </div>
                  <Link
                    href={`/app/issues/${issue.id}`}
                    className="ml-4 text-blue-600 font-semibold text-sm hover:text-blue-700"
                  >
                    View →
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Lost & Found Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold mb-4">Lost & Found</h2>
          {!items || items.length === 0 ? (
            <p className="text-gray-500">No items reported</p>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="border border-gray-200 rounded-lg p-4 flex items-center justify-between"
                >
                  <div className="flex-1">
                    <h3 className="font-semibold">{item.title}</h3>
                    <p className="text-sm text-gray-600">{item.type} • {item.category}</p>
                    <p className="text-sm text-gray-500 mt-1">Status: {item.status}</p>
                  </div>
                  <Link
                    href={`/app/lost-found/${item.id}`}
                    className="ml-4 text-blue-600 font-semibold text-sm hover:text-blue-700"
                  >
                    View →
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

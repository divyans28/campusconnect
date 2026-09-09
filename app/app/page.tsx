import { redirect } from 'next/navigation'
import { getCurrentUser } from '@/lib/auth'

export default async function DashboardPage() {
  const user = await getCurrentUser()

  if (!user) {
    redirect('/login')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Welcome to CampusConnect</h1>
          <p className="text-gray-600 mt-2">Your campus dashboard</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h2 className="text-xl font-semibold mb-2">Lost & Found</h2>
            <p className="text-gray-600 text-sm mb-4">
              Report or search for lost and found items on campus.
            </p>
            <button className="text-blue-600 font-semibold text-sm hover:text-blue-700">
              Coming soon →
            </button>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h2 className="text-xl font-semibold mb-2">Issue Reporting</h2>
            <p className="text-gray-600 text-sm mb-4">
              Report campus issues and track their status.
            </p>
            <button className="text-blue-600 font-semibold text-sm hover:text-blue-700">
              Coming soon →
            </button>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h2 className="text-xl font-semibold mb-2">Team Finder</h2>
            <p className="text-gray-600 text-sm mb-4">
              Find teammates for hackathons, events, and projects.
            </p>
            <button className="text-blue-600 font-semibold text-sm hover:text-blue-700">
              Coming soon →
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

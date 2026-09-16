import { redirect } from 'next/navigation'
import { getCurrentUserServer } from '@/lib/auth-server'
import { getProfile } from '@/lib/auth'
import Link from 'next/link'
import AppLayout from './layout'

export default async function DashboardPage() {
  const user = await getCurrentUserServer()

  if (!user) {
    redirect('/login')
  }

  const profile = await getProfile(user.id)

  return (
    <AppLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Welcome to CampusConnect</h1>
          <p className="text-gray-600 mt-2">Your campus dashboard</p>
        </div>

        {/* Profile Card */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold mb-1">Your Profile</h2>
              <p className="text-gray-600 text-sm">
                {profile?.name || user?.email}
                {profile?.usn && ` • ${profile.usn}`}
              </p>
            </div>
            <Link
              href="/app/profile"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              Edit Profile
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h2 className="text-xl font-semibold mb-2">Lost & Found</h2>
            <p className="text-gray-600 text-sm mb-4">
              Report or search for lost and found items on campus.
            </p>
            <Link
              href="/app/lost-found"
              className="text-blue-600 font-semibold text-sm hover:text-blue-700"
            >
              Go to Lost & Found →
            </Link>
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
    </AppLayout>
  )
}

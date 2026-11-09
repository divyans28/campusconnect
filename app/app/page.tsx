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
        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-6 rounded-2xl shadow-lg mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold mb-1 text-white">Your Profile</h2>
              <p className="text-blue-100 text-sm">
                {profile?.name || user?.email}
                {profile?.usn && ` • ${profile.usn}`}
              </p>
            </div>
            <Link
              href="/app/profile"
              className="bg-white text-blue-600 px-4 py-2 rounded-lg font-semibold hover:bg-blue-50 transition shadow-md"
            >
              Edit Profile
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100 group">
            <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-orange-500 rounded-xl flex items-center justify-center mb-4 shadow-md group-hover:scale-110 transition-transform">
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <h2 className="text-xl font-semibold mb-2 text-gray-900">Lost & Found</h2>
            <p className="text-gray-600 text-sm mb-4">
              Report or search for lost and found items on campus.
            </p>
            <Link
              href="/app/lost-found"
              className="inline-flex items-center text-blue-600 font-semibold text-sm hover:text-blue-700 group-hover:translate-x-1 transition-transform"
            >
              Go to Lost & Found →
            </Link>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100 group">
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mb-4 shadow-md group-hover:scale-110 transition-transform">
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h2 className="text-xl font-semibold mb-2 text-gray-900">Issue Reporting</h2>
            <p className="text-gray-600 text-sm mb-4">
              Report campus issues and track their status.
            </p>
            <Link
              href="/app/issues"
              className="inline-flex items-center text-blue-600 font-semibold text-sm hover:text-blue-700 group-hover:translate-x-1 transition-transform"
            >
              Go to Issue Reporting →
            </Link>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100 group">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-4 shadow-md group-hover:scale-110 transition-transform">
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </div>
            <h2 className="text-xl font-semibold mb-2 text-gray-900">Team Finder</h2>
            <p className="text-gray-600 text-sm mb-4">
              Find teammates for hackathons, events, and projects.
            </p>
            <Link
              href="/app/teams"
              className="inline-flex items-center text-blue-600 font-semibold text-sm hover:text-blue-700 group-hover:translate-x-1 transition-transform"
            >
              Go to Team Finder →
            </Link>
          </div>
        </div>
      </div>
    </AppLayout>
  )
}

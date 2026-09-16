import Link from 'next/link'

export default function AppLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Simple App Navigation */}
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-6 py-3">
            <Link
              href="/app"
              className="text-gray-700 hover:text-blue-600 transition font-medium"
            >
              Dashboard
            </Link>
            <Link
              href="/app/lost-found"
              className="text-gray-700 hover:text-blue-600 transition font-medium"
            >
              Lost & Found
            </Link>
            <Link
              href="/app/issues"
              className="text-gray-700 hover:text-blue-600 transition font-medium"
            >
              Issues
            </Link>
            <Link
              href="/app/teams"
              className="text-gray-700 hover:text-blue-600 transition font-medium"
            >
              Teams
            </Link>
            <Link
              href="/app/profile"
              className="text-gray-700 hover:text-blue-600 transition font-medium"
            >
              Profile
            </Link>
          </div>
        </div>
      </nav>

      {children}
    </div>
  )
}

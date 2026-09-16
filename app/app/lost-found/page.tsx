import { redirect } from 'next/navigation'
import { getCurrentUserServer } from '@/lib/auth-server'
import { createClient } from '@/lib/supabase/client'
import Link from 'next/link'
import AppLayout from '../layout'

export default async function LostFoundPage() {
  const user = await getCurrentUserServer()

  if (!user) {
    redirect('/login')
  }

  const supabase = createClient()

  // Fetch all lost and found items
  const { data: items } = await supabase
    .from('lost_found_items')
    .select('*')
    .order('created_at', { ascending: false })

  return (
    <AppLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Lost & Found</h1>
            <p className="text-gray-600 mt-2">Report or search for lost and found items on campus</p>
          </div>
          <Link
            href="/app/lost-found/create"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Report Item
          </Link>
        </div>

        {!items || items.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
            <p className="text-gray-500">No items reported yet</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition"
              >
                <div className="flex items-center justify-between mb-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      item.type === 'lost'
                        ? 'bg-red-100 text-red-700'
                        : 'bg-green-100 text-green-700'
                    }`}
                  >
                    {item.type.toUpperCase()}
                  </span>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      item.status === 'open'
                        ? 'bg-blue-100 text-blue-700'
                        : 'bg-gray-100 text-gray-700'
                    }`}
                  >
                    {item.status.toUpperCase()}
                  </span>
                </div>

                <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{item.description}</p>

                <div className="text-sm text-gray-500 space-y-1">
                  <p><strong>Category:</strong> {item.category}</p>
                  <p><strong>Location:</strong> {item.location}</p>
                  <p><strong>Date:</strong> {item.date}</p>
                </div>

                <Link
                  href={`/app/lost-found/${item.id}`}
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

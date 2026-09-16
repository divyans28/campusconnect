'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { markAsResolved, deleteItem } from './actions'
import type { LostFoundItem } from '@/lib/types'

interface ItemDetailsProps {
  item: LostFoundItem
  isOwner: boolean
  userId: string
}

export default function ItemDetails({ item, isOwner, userId }: ItemDetailsProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const handleMarkResolved = async () => {
    setLoading(true)
    const result = await markAsResolved(item.id)
    setLoading(false)

    if (result.success) {
      router.refresh()
    }
  }

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this item?')) {
      return
    }

    setLoading(true)
    const result = await deleteItem(item.id)
    setLoading(false)

    if (result.success) {
      router.push('/app/lost-found')
    }
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <button
          onClick={() => router.back()}
          className="text-blue-600 hover:text-blue-700 font-medium"
        >
          ← Back to Lost & Found
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {item.image_url && (
          <img
            src={item.image_url}
            alt={item.title}
            className="w-full h-64 object-cover"
          />
        )}

        <div className="p-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <span
                className={`px-4 py-2 rounded-full text-sm font-semibold ${
                  item.type === 'lost'
                    ? 'bg-red-100 text-red-700'
                    : 'bg-green-100 text-green-700'
                }`}
              >
                {item.type.toUpperCase()}
              </span>
              <span
                className={`px-4 py-2 rounded-full text-sm font-semibold ${
                  item.status === 'open'
                    ? 'bg-blue-100 text-blue-700'
                    : 'bg-gray-100 text-gray-700'
                }`}
              >
                {item.status.toUpperCase()}
              </span>
            </div>

            {isOwner && (
              <div className="flex space-x-2">
                {item.status === 'open' && (
                  <button
                    onClick={handleMarkResolved}
                    disabled={loading}
                    className="bg-green-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Mark as Resolved
                  </button>
                )}
                <button
                  onClick={handleDelete}
                  disabled={loading}
                  className="bg-red-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Delete
                </button>
              </div>
            )}
          </div>

          <h1 className="text-3xl font-bold text-gray-900 mb-4">{item.title}</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <p className="text-sm text-gray-500">Category</p>
              <p className="font-medium">{item.category}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Location</p>
              <p className="font-medium">{item.location}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Date</p>
              <p className="font-medium">{item.date}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Reported on</p>
              <p className="font-medium">
                {new Date(item.created_at).toLocaleDateString()}
              </p>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-6">
            <h2 className="text-lg font-semibold mb-3">Description</h2>
            <p className="text-gray-700 whitespace-pre-wrap">{item.description}</p>
          </div>

          {isOwner && (
            <div className="border-t border-gray-200 pt-6 mt-6">
              <h2 className="text-lg font-semibold mb-3">Contact Reporter</h2>
              <p className="text-gray-600 text-sm">
                To contact the person who reported this item, please use the campus contact directory or ask around in the mentioned location.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

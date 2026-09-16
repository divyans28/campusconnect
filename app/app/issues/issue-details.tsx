'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { updateIssueStatus, deleteIssue } from './actions'
import type { Issue } from '@/lib/types'

interface IssueDetailsProps {
  issue: Issue
  isOwner: boolean
  userId: string
}

export default function IssueDetails({ issue, isOwner, userId }: IssueDetailsProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState(issue.status)

  const handleStatusChange = async (newStatus: string) => {
    setLoading(true)
    const result = await updateIssueStatus(issue.id, newStatus)
    setLoading(false)

    if (result.success) {
      setStatus(newStatus)
      router.refresh()
    }
  }

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this issue?')) {
      return
    }

    setLoading(true)
    const result = await deleteIssue(issue.id)
    setLoading(false)

    if (result.success) {
      router.push('/app/issues')
    }
  }

  const getStatusColor = (status: string): string => {
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

  const formatStatus = (status: string): string => {
    return status
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <button
          onClick={() => router.back()}
          className="text-blue-600 hover:text-blue-700 font-medium"
        >
          ← Back to Issues
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {issue.image_url && (
          <img
            src={issue.image_url}
            alt={issue.title}
            className="w-full h-64 object-cover"
          />
        )}

        <div className="p-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <span
                className={`px-4 py-2 rounded-full text-sm font-semibold ${getStatusColor(status)}`}
              >
                {formatStatus(status)}
              </span>
              <span className="text-sm text-gray-500 font-medium">
                {issue.category}
              </span>
            </div>

            {isOwner && (
              <div className="flex space-x-2">
                <select
                  value={status}
                  onChange={(e) => handleStatusChange(e.target.value)}
                  disabled={loading}
                  className="px-4 py-2 border border-gray-300 rounded-lg font-medium focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <option value="submitted">Submitted</option>
                  <option value="under_review">Under Review</option>
                  <option value="in_progress">In Progress</option>
                  <option value="resolved">Resolved</option>
                </select>
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

          <h1 className="text-3xl font-bold text-gray-900 mb-4">{issue.title}</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <p className="text-sm text-gray-500">Location</p>
              <p className="font-medium">{issue.location}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Reported on</p>
              <p className="font-medium">
                {new Date(issue.created_at).toLocaleDateString()}
              </p>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-6">
            <h2 className="text-lg font-semibold mb-3">Description</h2>
            <p className="text-gray-700 whitespace-pre-wrap">{issue.description}</p>
          </div>

          {isOwner && (
            <div className="border-t border-gray-200 pt-6 mt-6">
              <h2 className="text-lg font-semibold mb-3">Status Updates</h2>
              <p className="text-gray-600 text-sm">
                You can update the status of this issue to track its progress. Use the dropdown above to change the status.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { updateTeam, deleteTeam } from './actions'
import type { Team } from '@/lib/types'

interface TeamDetailsProps {
  team: Team
  isOwner: boolean
  userId: string
}

export default function TeamDetails({ team, isOwner, userId }: TeamDetailsProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [currentMembers, setCurrentMembers] = useState(team.current_members)

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this team?')) {
      return
    }

    setLoading(true)
    const result = await deleteTeam(team.id)
    setLoading(false)

    if (result.success) {
      router.push('/app/teams')
    }
  }

  const handleUpdateMembers = async (change: number) => {
    const newCount = currentMembers + change
    if (newCount < 1 || newCount > team.max_members) {
      return
    }

    setLoading(true)
    const result = await updateTeam(team.id, { current_members: newCount })
    setLoading(false)

    if (result.success) {
      setCurrentMembers(newCount)
      router.refresh()
    }
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <button
          onClick={() => router.back()}
          className="text-blue-600 hover:text-blue-700 font-medium"
        >
          ← Back to Teams
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{team.team_name}</h1>
            <p className="text-blue-600 font-medium">{team.event_name}</p>
          </div>

          {isOwner && (
            <button
              onClick={handleDelete}
              disabled={loading}
              className="bg-red-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Delete Team
            </button>
          )}
        </div>

        <div className="border-t border-gray-200 pt-6 mb-6">
          <h2 className="text-lg font-semibold mb-3">Description</h2>
          <p className="text-gray-700 whitespace-pre-wrap">{team.description}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <p className="text-sm text-gray-500">Team Members</p>
            <div className="flex items-center space-x-2 mt-1">
              {isOwner && (
                <button
                  onClick={() => handleUpdateMembers(-1)}
                  disabled={loading || currentMembers <= 1}
                  className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  -
                </button>
              )}
              <span className="font-medium text-lg">{currentMembers}/{team.max_members}</span>
              {isOwner && (
                <button
                  onClick={() => handleUpdateMembers(1)}
                  disabled={loading || currentMembers >= team.max_members}
                  className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  +
                </button>
              )}
            </div>
          </div>

          {team.application_deadline && (
            <div>
              <p className="text-sm text-gray-500">Application Deadline</p>
              <p className="font-medium">{team.application_deadline}</p>
            </div>
          )}

          <div>
            <p className="text-sm text-gray-500">Created</p>
            <p className="font-medium">
              {new Date(team.created_at).toLocaleDateString()}
            </p>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-6 mb-6">
          <h2 className="text-lg font-semibold mb-3">Required Skills</h2>
          <div className="flex flex-wrap gap-2">
            {team.required_skills.map((skill, idx) => (
              <span
                key={idx}
                className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        <div className="border-t border-gray-200 pt-6">
          <h2 className="text-lg font-semibold mb-3">Roles Needed</h2>
          <div className="flex flex-wrap gap-2">
            {team.roles_needed.map((role, idx) => (
              <span
                key={idx}
                className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm"
              >
                {role}
              </span>
            ))}
          </div>
        </div>

        {isOwner && (
          <div className="border-t border-gray-200 pt-6 mt-6">
            <h2 className="text-lg font-semibold mb-3">Team Management</h2>
            <p className="text-gray-600 text-sm">
              As the team leader, you can update the member count using the +/- buttons above. The join request system will be implemented in a future update.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

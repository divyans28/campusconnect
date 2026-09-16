'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createTeam } from '../actions'

interface CreateTeamFormProps {
  userId: string
}

export default function CreateTeamForm({ userId }: CreateTeamFormProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const [formData, setFormData] = useState({
    team_name: '',
    event_name: '',
    description: '',
    max_members: 4,
    required_skills: '',
    roles_needed: '',
    application_deadline: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    const requiredSkills = formData.required_skills
      .split(',')
      .map(s => s.trim())
      .filter(s => s.length > 0)

    const rolesNeeded = formData.roles_needed
      .split(',')
      .map(s => s.trim())
      .filter(s => s.length > 0)

    const result = await createTeam({
      user_id: userId,
      team_name: formData.team_name,
      event_name: formData.event_name,
      description: formData.description,
      max_members: formData.max_members,
      current_members: 1,
      required_skills: requiredSkills,
      roles_needed: rolesNeeded,
      application_deadline: formData.application_deadline || null,
    })

    if (result.error) {
      setError(result.error)
      setLoading(false)
      return
    }

    router.push('/app/teams')
    router.refresh()
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-600 text-sm">{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="team_name" className="block text-sm font-medium text-gray-700 mb-2">
            Team Name
          </label>
          <input
            type="text"
            id="team_name"
            name="team_name"
            value={formData.team_name}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
            placeholder="e.g., Code Warriors"
          />
        </div>

        <div>
          <label htmlFor="event_name" className="block text-sm font-medium text-gray-700 mb-2">
            Event Name
          </label>
          <input
            type="text"
            id="event_name"
            name="event_name"
            value={formData.event_name}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
            placeholder="e.g., Smart India Hackathon 2024"
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            rows={4}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
            placeholder="Describe your team and what you're working on..."
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="max_members" className="block text-sm font-medium text-gray-700 mb-2">
              Maximum Members
            </label>
            <input
              type="number"
              id="max_members"
              name="max_members"
              value={formData.max_members}
              onChange={handleChange}
              required
              min="2"
              max="10"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
            />
          </div>

          <div>
            <label htmlFor="application_deadline" className="block text-sm font-medium text-gray-700 mb-2">
              Application Deadline (optional)
            </label>
            <input
              type="date"
              id="application_deadline"
              name="application_deadline"
              value={formData.application_deadline}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
            />
          </div>
        </div>

        <div>
          <label htmlFor="required_skills" className="block text-sm font-medium text-gray-700 mb-2">
            Required Skills (comma-separated)
          </label>
          <textarea
            id="required_skills"
            name="required_skills"
            value={formData.required_skills}
            onChange={handleChange}
            required
            rows={3}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
            placeholder="React, Python, UI/UX, Backend"
          />
          <p className="text-sm text-gray-500 mt-1">Separate skills with commas</p>
        </div>

        <div>
          <label htmlFor="roles_needed" className="block text-sm font-medium text-gray-700 mb-2">
            Roles Needed (comma-separated)
          </label>
          <textarea
            id="roles_needed"
            name="roles_needed"
            value={formData.roles_needed}
            onChange={handleChange}
            required
            rows={3}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
            placeholder="Frontend Developer, Backend Developer, Designer"
          />
          <p className="text-sm text-gray-500 mt-1">Separate roles with commas</p>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Creating...' : 'Create Team'}
        </button>
      </form>
    </div>
  )
}

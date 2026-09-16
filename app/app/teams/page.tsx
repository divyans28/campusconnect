import { redirect } from 'next/navigation'
import { getCurrentUserServer } from '@/lib/auth-server'
import { createClient } from '@/lib/supabase/client'
import Link from 'next/link'
import AppLayout from '../layout'

export default async function TeamsPage() {
  const user = await getCurrentUserServer()

  if (!user) {
    redirect('/login')
  }

  const supabase = createClient()

  // Fetch all teams
  const { data: teams } = await supabase
    .from('teams')
    .select('*')
    .order('created_at', { ascending: false })

  return (
    <AppLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Team Finder</h1>
            <p className="text-gray-600 mt-2">Find teammates for hackathons, events, and projects</p>
          </div>
          <Link
            href="/app/teams/create"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Create Team
          </Link>
        </div>

        {!teams || teams.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
            <p className="text-gray-500">No teams listed yet</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {teams.map((team) => (
              <div
                key={team.id}
                className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition"
              >
                <div className="mb-4">
                  <h3 className="text-lg font-semibold mb-1">{team.team_name}</h3>
                  <p className="text-sm text-blue-600 font-medium">{team.event_name}</p>
                </div>

                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{team.description}</p>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Members</span>
                    <span className="font-medium">
                      {team.current_members}/{team.max_members}
                    </span>
                  </div>
                  {team.application_deadline && (
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">Deadline</span>
                      <span className="font-medium">{team.application_deadline}</span>
                    </div>
                  )}
                </div>

                <div className="mb-4">
                  <p className="text-xs text-gray-500 mb-1">Skills needed:</p>
                  <div className="flex flex-wrap gap-1">
                    {team.required_skills.slice(0, 3).map((skill: string, idx: number) => (
                      <span
                        key={idx}
                        className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded"
                      >
                        {skill}
                      </span>
                    ))}
                    {team.required_skills.length > 3 && (
                      <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                        +{team.required_skills.length - 3}
                      </span>
                    )}
                  </div>
                </div>

                <Link
                  href={`/app/teams/${team.id}`}
                  className="inline-block text-blue-600 font-semibold text-sm hover:text-blue-700"
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

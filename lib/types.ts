// Database table types based on our schema

export type UserRole = 'student' | 'admin'

export interface Profile {
  id: string
  user_id: string
  name: string
  usn: string
  branch: string
  section: string
  academic_year: number
  semester: number
  skills: string[]
  interests: string[]
  role: UserRole
  created_at: string
  updated_at: string
}

export type LostFoundType = 'lost' | 'found'
export type LostFoundStatus = 'open' | 'resolved'

export interface LostFoundItem {
  id: string
  user_id: string
  type: LostFoundType
  title: string
  category: string
  description: string
  location: string
  date: string
  image_url?: string
  status: LostFoundStatus
  created_at: string
  updated_at: string
}

export type IssueCategory = 'wifi' | 'classroom' | 'lab' | 'projector' | 'electricity' | 'water' | 'furniture' | 'cleanliness' | 'other'
export type IssueStatus = 'submitted' | 'under_review' | 'in_progress' | 'resolved'

export interface Issue {
  id: string
  user_id: string
  title: string
  category: IssueCategory
  location: string
  description: string
  image_url?: string
  status: IssueStatus
  created_at: string
  updated_at: string
}

export type EventType = 'hackathon' | 'event' | 'competition' | 'workshop' | 'other'

export interface Event {
  id: string
  name: string
  description: string
  date: string
  location: string
  registration_deadline?: string
  event_type: EventType
  external_link?: string
  created_at: string
  updated_at: string
}

export interface Team {
  id: string
  event_id: string
  user_id: string // team leader
  team_name: string
  description: string
  current_members: number
  max_members: number
  required_skills: string[]
  roles_needed: string[]
  application_deadline?: string
  created_at: string
  updated_at: string
}

export type JoinRequestStatus = 'pending' | 'accepted' | 'rejected'

export interface TeamJoinRequest {
  id: string
  team_id: string
  user_id: string
  status: JoinRequestStatus
  created_at: string
  updated_at: string
}

export interface TeamMember {
  id: string
  team_id: string
  user_id: string
  joined_at: string
}

export interface Notification {
  id: string
  user_id: string
  title: string
  message: string
  type: 'info' | 'success' | 'warning' | 'error'
  read: boolean
  link?: string
  created_at: string
}

import { redirect } from 'next/navigation'
import { getCurrentUserServer } from '@/lib/auth-server'
import CreateItemForm from './create-item-form'
import AppLayout from '../../layout'

export default async function CreateItemPage() {
  const user = await getCurrentUserServer()

  if (!user) {
    redirect('/login')
  }

  return (
    <AppLayout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Report Item</h1>
          <p className="text-gray-600 mt-2">Report a lost or found item on campus</p>
        </div>

        <CreateItemForm />
      </div>
    </AppLayout>
  )
}

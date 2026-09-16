import { redirect } from 'next/navigation'
import { getCurrentUserServer } from '@/lib/auth-server'
import { getItem } from '../actions'
import ItemDetails from '../item-details'
import AppLayout from '../../layout'

export default async function ItemDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const user = await getCurrentUserServer()

  if (!user) {
    redirect('/login')
  }

  const { id } = await params
  const item = await getItem(id)

  if (!item) {
    return (
      <AppLayout>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
            <p className="text-gray-500">Item not found</p>
          </div>
        </div>
      </AppLayout>
    )
  }

  const isOwner = item.user_id === user.id

  return (
    <AppLayout>
      <ItemDetails item={item} isOwner={isOwner} userId={user.id} />
    </AppLayout>
  )
}

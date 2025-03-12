import { getIndustryInsights } from '@/actions/dashboard'
import { getUserOnboardingStatus } from '@/actions/user'
import { redirect } from 'next/navigation'
import DashboardView from './_components/dashboard-view'
import ClearDataButton from './_components/clear-data-view'

const IndustryInsightsPage = async () => {

  // Отримуємо статус користувача та інсайти на сервері
  const { isOnboarded } = await getUserOnboardingStatus()
  const insights = await getIndustryInsights()

  // Якщо користувач не пройшов onboarding, редіректимо
  if (!isOnboarded) {
    redirect('/onboarding')
  }

  return (
    <div className='container mx-auto space-y-5'>
      <DashboardView insights={insights} />
      <ClearDataButton />
    </div>
  )
}

export default IndustryInsightsPage;

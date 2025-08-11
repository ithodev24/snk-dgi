import { Suspense } from 'react'
import AgreementContent from './AgreementContent'
import LoadingPage from '../components/LoadingPage'

export default function AgreementPage() {
  return (
    <Suspense fallback={<LoadingPage />}>
      <AgreementContent />
    </Suspense>
  )
}

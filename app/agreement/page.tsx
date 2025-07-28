import { Suspense } from 'react'
import AgreementContent from './AgreementContent'

export default function AgreementPage() {
  return (
    <Suspense fallback={<div>Memuat...</div>}>
      <AgreementContent />
    </Suspense>
  )
}

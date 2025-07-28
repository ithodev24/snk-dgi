'use client'

import SignatureCanvas from 'react-signature-canvas'
import { useRef, useEffect } from 'react'

export default function SignaturePad({
  onEnd,
  width = 400,
  height = 200,
}: {
  onEnd: (sig: string) => void
  width?: number
  height?: number
}) {
  const sigRef = useRef<SignatureCanvas>(null)



  useEffect(() => {
    if (sigRef.current?.isEmpty()) {
      onEnd('')
    }
  }, [])

  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-gray-700 mb-1">Tanda Tangan</label>
      <div className="rounded-md overflow-hidden bg-gray-100 border border-gray-300">
        <SignatureCanvas
          ref={sigRef}
          penColor="black"
          backgroundColor="transparent"
          canvasProps={{
            width,
            height,
            className: 'w-full h-full'
          }}
          onEnd={() => {
            const dataURL = sigRef.current?.toDataURL()
            if (dataURL) onEnd(dataURL)
          }}
        />
      </div>
    </div>
  )
}

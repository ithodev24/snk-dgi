'use client'

import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import CustomDropdown from './components/CustomDropdown'

export default function FormPage() {
  const router = useRouter()
  const [selectedLayanan, setSelectedLayanan] = useState({ name: '' })
  const [nama, setNama] = useState('')
  const [telepon, setTelepon] = useState('')
  const [formError, setFormError] = useState('')

  const handleNext = () => {
    if (!selectedLayanan.name || !nama || !telepon) {
      setFormError('Harap lengkapi semua data sebelum melanjutkan.')
      return
    }

    setFormError('') // Bersihkan pesan error sebelumnya

    const params = new URLSearchParams({
      layanan: selectedLayanan.name,
      nama,
      telepon,
    })

    router.push(`/agreement?${params.toString()}`)
  }

  // Hapus alert otomatis setelah 4 detik
  useEffect(() => {
    if (formError) {
      const timeout = setTimeout(() => {
        setFormError('')
      }, 4000)
      return () => clearTimeout(timeout)
    }
  }, [formError])

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-[#950900] text-white p-4 text-center pt-10">
        <h1 className="text-xl font-semibold">PT Dahlia Global Indonesia</h1>
        <p className="text-sm">Harap lengkapi data dibawah ini.</p>
      </div>

      {/* Form */}
      <div className="max-w-xl mx-auto p-6 space-y-4">
        {/* Dropdown Layanan */}
        <div className="relative">
          <label className="text-sm text-black">Layanan</label>
          <CustomDropdown
            selected={selectedLayanan}
            setSelected={setSelectedLayanan}
          />
          <div className="absolute inset-y-0 right-3 top-[26px] flex items-center pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-400"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>

        {/* Nama Penyewa */}
        <div>
          <label className="text-sm text-black">Nama Penyewa</label>
          <input
            type="text"
            placeholder="Masukkan nama lengkap penyewa"
            className="w-full bg-gray-100 rounded px-3 py-2 text-sm text-black placeholder:text-[#ACACAC]"
            value={nama}
            onChange={(e) => setNama(e.target.value)}
          />
        </div>

        {/* Nomor Telepon */}
        <div>
          <label className="text-sm text-black">Nomor Telepon</label>
          <input
            type="text"
            placeholder="Masukkan nomor telepon aktif"
            className="w-full bg-gray-100 rounded px-3 py-2 text-sm text-black placeholder:text-[#ACACAC]"
            value={telepon}
            onChange={(e) => setTelepon(e.target.value)}
          />
        </div>

        {/* Alert Error */}
        {formError && (
          <div className="relative bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded text-sm">
            <strong className="font-semibold">Error: </strong>
            {formError}
            <button
              className="absolute top-1 right-2 text-lg font-bold text-red-500"
              onClick={() => setFormError('')}
              aria-label="Close"
            >
              ×
            </button>
          </div>
        )}

        {/* Tombol Selanjutnya */}
        <div className="flex justify-center">
          <button
            className="w-full text-white px-6 py-2 rounded font-medium bg-[#0899E1] hover:bg-[#007bc1] focus:outline focus:outline-2 focus:outline-white focus:outline-offset-2"
            onClick={handleNext}
          >
            Selanjutnya
          </button>
        </div>
      </div>
    </div>
  )
}

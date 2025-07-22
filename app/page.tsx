'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import CustomDropdown from './components/CustomDropdown'

export default function FormPage() {
  const router = useRouter()
  const [selectedLayanan, setSelectedLayanan] = useState({ name: '' })
  const [nama, setNama] = useState('')
  const [telepon, setTelepon] = useState('')

  const handleNext = () => {
    if (!selectedLayanan.name || !nama || !telepon) {
      alert('Harap lengkapi semua data.')
      return
    }

    const params = new URLSearchParams({
      layanan: selectedLayanan.name,
      nama,
      telepon,
    })

    router.push(`/agreement?${params.toString()}`)
  }

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
          {/* Ikon panah dropdown */}
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

        {/* Tombol Selanjutnya */}
        <div className="flex justify-center bg-[#0899E1] hover:bg-[#007bc1] rounded-md">
          <button
            className=" text-white px-6 py-2 rounded font-medium"
            onClick={handleNext}
          >
            Selanjutnya
          </button>
        </div>
      </div>
    </div>
  )
}

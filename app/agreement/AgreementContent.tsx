'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'
import SignaturePad from '../components/SignaturePad'
import axios from 'axios'
import { ChevronLeftIcon } from '@heroicons/react/20/solid'

export default function AgreementContent() {
  const searchParams = useSearchParams()
  const layanan = searchParams.get('layanan') || ''
  const nama = searchParams.get('nama') || ''
  const telepon = searchParams.get('telepon') || ''
  const [signature, setSignature] = useState('')
  const [agreed, setAgreed] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [showError, setShowError] = useState(false)

  const router = useRouter()

  // await new Promise((resolve) => setTimeout(resolve, 3000))

  const syarat =
  layanan === 'Pixelnesia' ? (
    <div className="space-y-2 text-sm text-gray-700">
      <ul className="list-disc list-inside ml-4">
        <li>Melampirkan identitas seperti KTP/Paspor</li>
        <li>Usia 17 tahun ke bawah yang belum memiliki identitas wajib melampirkan KTP/Paspor orang tua</li>
        <li>Melengkapi lampiran yang diminta seperti sosial media penyewa, Kartu Keluarga, dan selfie terbaru</li>
      </ul>
    </div>
  ) : layanan === 'Rentalday' ? (
    <div className="space-y-2 text-sm text-black">
      <ul className="list-disc list-inside ml-4">
        <li>Berusia 17 tahun ke atas</li>
        <li>Memiliki KTP</li>
        <li>Melengkapi syarat administrasi yang diminta</li>
        <li>
          Sewa motor khusus wisatawan dan mahasiswa yang sedang menempuh pendidikan di Bandung/Malang
          (sesuai daerah sewa)
        </li>
      </ul>

      <div className="mt-4">
        <strong>Notes Tambahan :</strong>

        <p className="mt-2 font-semibold">Kelengkapan Syarat Sewa Khusus Wisatawan</p>
        <ul className="list-disc list-inside ml-4">
          <li>Melampirkan KTP/Paspor</li>
          <li>Melampirkan tiket perjalanan, tiket penginapan, dan sosial media penyewa</li>
        </ul>

        <p className="mt-2 font-semibold">Kelengkapan Syarat Sewa Khusus Mahasiswa</p>
        <ul className="list-disc list-inside ml-4">
          <li>Wajib mahasiswa yang sedang menempuh pendidikan di Bandung/Malang (daerah sesuai tempat sewa)</li>
          <li>Melampirkan Kartu Tanda Mahasiswa (KTM)</li>
          <li>Shareloc alamat kost/alamat tinggal</li>
        </ul>
      </div>
    </div>
  ) : (
    <p className="text-sm text-black">Layanan tidak dikenali.</p>
  )

  const handleSubmit = async () => {
    if (!agreed || !signature) {
      setShowError(true)
      return
    }

    setIsLoading(true)

    try {
      await axios.post('/api/submit-agreement', {
        layanan,
        nama,
        telepon,
        signature,
      })
      setShowSuccess(true)
    } catch (err) {
      console.error(err)
      setShowError(true)
    } finally {
      setIsLoading(false)
    }
  }
  

  return (
    <div className="min-h-screen bg-white relative">
      {/* HEADER */}
      <div className="bg-[#950900] text-white pt-10 px-4 pb-4 relative text-center">
        <button
          onClick={() => router.back()}
          className="absolute left-4 top-4 text-white text-2xl"
          aria-label="Kembali"
        >
          <ChevronLeftIcon className="w-6" />
        </button>
        <div>
          <h1 className="text-xl font-bold uppercase">{layanan}</h1>
          <p className="text-sm">PT Dahlia Global Indo</p>
        </div>
      </div>

      {/* BODY */}
      <div className="max-w-md mx-auto p-4 space-y-6">
        <div>
          <h2 className="text-md font-semibold text-black px-4">Syarat & Ketentuan Penyewaan</h2>
          <div className="mt-2 px-4 text-justify">{syarat}</div>
        </div>

        <div className="flex items-start gap-2">
          <input
            type="checkbox"
            id="agree"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
            className="mt-1"
          />
          <label htmlFor="agree" className="text-sm text-black">
            Dengan menggunakan layanan ini, pengguna dianggap telah membaca, memahami, dan menyetujui seluruh syarat dan ketentuan yang berlaku.
          </label>
        </div>

        <div className="px-4">
          <SignaturePad onEnd={setSignature} />
        </div>

        <div className="flex justify-center px-3">
          <button
            disabled={isLoading}
            onClick={handleSubmit}
            className={`w-full text-white py-2 rounded font-medium ${
              isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'
            }`}
          >
            {isLoading ? 'Mengirim...' : 'Kirim'}
          </button>
        </div>
      </div>

      {/* Modal Sukses */}
      {showSuccess && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg text-center max-w-sm">
            <h2 className="text-lg font-semibold text-green-600">Berhasil!</h2>
            <p className="text-sm mt-2 text-gray-500">Persetujuan berhasil dikirim.</p>
            <button
              onClick={() => {
                setShowSuccess(false)
                router.push('/')
              }}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Tutup
            </button>
          </div>
        </div>
      )}

      {/* Modal Gagal */}
      {showError && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg text-center max-w-sm">
            <h2 className="text-lg font-semibold text-red-600">Gagal!</h2>
            <p className="text-sm mt-2 text-gray-500">Pastikan semua data & tanda tangan telah diisi.</p>
            <button
              onClick={() => setShowError(false)}
              className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Tutup
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
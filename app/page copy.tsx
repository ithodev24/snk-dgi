'use client'

import { useState } from 'react'
import SignaturePad from './components/SignaturePad'
import axios from 'axios'

export default function AgreementForm() {
  const [agreed, setAgreed] = useState(false)
  const [signature, setSignature] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!agreed) {
      alert('Silakan centang persetujuan terlebih dahulu.')
      return
    }
    if (!signature) {
      alert('Silakan isi tanda tangan terlebih dahulu.')
      return
    }

    try {
      const res = await axios.post('/api/submit-agreement', {
        name: 'Tidak Ada', // atau kosongkan
        email: 'Tidak Ada', // atau kosongkan
        signature,
      })
      alert('Persetujuan berhasil dikirim!')
    } catch (err) {
      alert('Gagal mengirim data.')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto p-4 space-y-4">
      <h1 className="text-2xl font-bold">Syarat dan Ketentuan Penyewaan</h1>
      <div className="bg-gray-800 p-4 border rounded space-y-2 text-justify">
        <p>1. Penyewa wajib memiliki SIM yang masih berlaku.</p>
        <p>2. Penyewa bertanggung jawab penuh atas kerusakan atau kehilangan unit.</p>
        <p>3. Penyewa tidak diperbolehkan membawa kendaraan keluar kota tanpa izin.</p>
        <p>4. Denda akan dikenakan untuk keterlambatan pengembalian kendaraan.</p>
        <p>5. Pembayaran dilakukan di muka sesuai dengan tarif yang telah disepakati.</p>
        <p>6. Pihak rental berhak menolak penyewaan jika ada indikasi penyalahgunaan.</p>
        <p className="font-semibold mt-4">Catatan: Tanda tangan harus menyertakan nama lengkap penandatangan.</p>
      </div>

      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          id="agree"
          checked={agreed}
          onChange={(e) => setAgreed(e.target.checked)}
        />
        <label htmlFor="agree" className="text-sm">
          Saya telah membaca dan menyetujui syarat dan ketentuan di atas.
        </label>
      </div>

      <div>
        <label className="block mb-1">Tanda Tangan:</label>
        <SignaturePad onEnd={(sig) => setSignature(sig)} />
        <p className="text-xs text-gray-600 mt-1">
          Harap tanda tangan dengan mencantumkan nama lengkap Anda.
        </p>
      </div>

      <button
        className="bg-blue-500 text-white px-4 py-2 rounded"
        type="submit"
      >
        Kirim Persetujuan
      </button>
    </form>
  )
}

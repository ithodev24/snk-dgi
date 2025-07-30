'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'
import SignaturePad from '../components/SignaturePad'
import axios from 'axios'
import { ChevronLeftIcon } from '@heroicons/react/20/solid'

export default function AgreementPage() {
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

  const syarat =
    layanan === 'Pixelnesia' ? (
      <ol className="list-decimal list-inside space-y-2 text-sm text-gray-700">
  <li>
    <strong>Kedatangan & Operasional</strong>
    <ul className="list-disc list-inside ml-4">
      <li>Bisa datang ke store jika belum proses verifikasi izin sewa.</li>
      <li>Jam operasional: 08.00 - 21.00</li>
      <li>Sistem sewa: 24 Jam / 1 Hari</li>
      <li>COD (antar di luar store) dikenakan biaya tambahan (ongkir)</li>
    </ul>
  </li>
  <li>
    <strong>Sistem Biaya</strong>
    <ul className="list-disc list-inside ml-4">
      <li>Sewa berlaku 24 Jam = 1 Hari</li>
      <li>COD di luar store akan dikenakan biaya ongkir</li>
      <li>Biaya layanan (service fee): Rp 10.000 / transaksi</li>
    </ul>
  </li>
  <li>
    <strong>Keterlambatan & Extend</strong>
    <ul className="list-disc list-inside ml-4">
      <li>Telat / tambah 1 jam: kena biaya 10%</li>
      <li>Telat / tambah 2 s/d 12 jam: biaya 50%</li>
      <li>Lebih dari 12 jam: kena biaya sewa 1 hari</li>
      <li>Service fee dikenakan untuk minimal extend 1 hari</li>
      <li>⏰ Konfirmasi extend maksimal 4 jam sebelum waktu sewa habis.</li>
      <li>💸 Biaya extend harus ditransfer maksimal 2 jam sebelum waktu sewa habis.</li>
      <li>🔁 Jika tidak melakukan pembayaran extend, maka unit wajib dikembalikan sesuai jam sewa awal.</li>
    </ul>
  </li>
  <li>
    <strong>Kebijakan Lainnya</strong>
    <ul className="list-disc list-inside ml-4">
      <li>Sampaikan aplikasi yang dibutuhkan, karena tidak bisa download sendiri</li>
      <li>Tidak bisa login iCloud</li>
      <li>Permintaan pemindahan data oleh tim Pixel dikenakan biaya Rp 100.000 / 100 foto & video</li>
      <li>Pastikan unit kembali dalam kondisi seperti semula</li>
      <li>Segala kerusakan / kehilangan saat pemakaian menjadi 100% tanggung jawab penyewa</li>
    </ul>
  </li>
  <li>
    <strong>Proses Booking</strong>
    <ul className="list-disc list-inside ml-4">
      <li>Isi data booking</li>
      <li>Pengecekan unit & jadwal</li>
      <li>Informasi total biaya sewa</li>
      <li>Isi form pesanan dan lampiran</li>
      <li>Verifikasi keamanan data + follow back IG</li>
      <li>Transfer DP 50%</li>
      <li>Jadwal disimpan (keep)</li>
      <li>Dihubungi kembali H-1 untuk konfirmasi pengantaran</li>
    </ul>
  </li>
  <li>
    <strong>Lampiran Verifikasi Data</strong>
    <ul className="list-disc list-inside ml-4">
      <li>Foto KTP Asli</li>
      <li>Foto Kartu Keluarga</li>
      <li>Screenshot Profil Instagram penyewa</li>
      <li>Screenshot Profil Instagram orang terdekat</li>
      <li>Foto SIM atau KTP orang terdekat (khusus KTP luar kota)</li>
      <li>Selfie terbaru</li>
    </ul>
  </li>
  <li>
    <strong>Jaminan</strong>
    <ul className="list-disc list-inside ml-4">
      <li>🔐 Penyewa wajib menyerahkan identitas berupa:</li>
      <li>KTP penyewa + KTP/SIM/kartu pelajar orang terdekat</li>
      <li>Mohon dibawa saat COD sebagai jaminan</li>
    </ul>
  </li>
</ol>
    ) : layanan === 'Rentalday' ? (
      <ol className="list-decimal space-y-3 pl-4 text-sm text-black">
    <li>
      <strong>Lokasi Pengambilan Unit</strong>
      <ul className="list-disc pl-6 space-y-1">
        <li>Alamat: Jl. Kebon Kawung No. 49-50, Pasir Kaliki, Kec. Cicendo, Kota Bandung, Jawa Barat 40171</li>
        <li>Google Maps: Rentalday Bandung / Rentalday Cab 2 (Sewa Motor Bandung)</li>
        <li>Alamat Ojek Online: Rentalday Cab 2 (Sewa Motor Bandung) / Harmoni Trans Bandung</li>
      </ul>
    </li>
    <li>
      <strong>Pengantaran Unit</strong>
      <ul className="list-disc pl-6 space-y-1">
        <li>Pengantaran ke hotel/stasiun/COD di luar garasi akan dikenakan biaya tambahan sesuai jarak tempuh</li>
        <li>Biaya tambahan diinformasikan oleh admin</li>
        <li>Waktu pengantaran tidak dapat dijamin tepat waktu karena tergantung kondisi lalu lintas</li>
      </ul>
    </li>
    <li>
      <strong>Sistem Sewa</strong>
      <ul className="list-disc pl-6 space-y-1">
        <li>Sewa berlaku 24 jam</li>
        <li>Weekday: dihitung dari pukul 12.00 - 12.00</li>
        <li>Weekend: dihitung dari pukul 00.00 - 00.00</li>
        <li>Biaya layanan: Rp 10.000</li>
      </ul>
    </li>
    <li>
      <strong>Hitungan Waktu Sewa</strong>
      <ul className="list-disc pl-6 space-y-1">
        <li>Weekday:
          <ul className="list-disc pl-6">
            <li>08.00 - 08.00 = 1 Hari</li>
            <li>09.00 - 09.00 = 1 Hari</li>
            <li>12.00 - 12.00 = 1 Hari</li>
            <li>13.00 - 12.00 = 1 Hari</li>
          </ul>
        </li>
        <li>Weekend:
          <ul className="list-disc pl-6">
            <li>00.00 - 00.00 = 1 Hari</li>
            <li>08.00 - 00.00 = 1 Hari</li>
            <li>dan seterusnya</li>
          </ul>
        </li>
      </ul>
    </li>
    <li>
      <strong>Late Checkout</strong>
      <ul className="list-disc pl-6 space-y-1">
        <li>Minimal keterlambatan 3 jam</li>
        <li>Dikenakan Rp 15.000/jam</li>
        <li>Jika melebihi 3 jam, dikenakan biaya sewa setengah hari</li>
      </ul>
    </li>
    <li>
      <strong>Booking Weekend</strong>
      <ul className="list-disc pl-6 space-y-1">
        <li>Booking hanya 1 hari (misal: Sabtu saja atau Minggu saja) dikenakan charge tambahan Rp 20.000</li>
      </ul>
    </li>
    <li>
      <strong>Fasilitas Unit</strong>
      <ul className="list-disc pl-6 space-y-1">
        <li>2 Buah Helm</li>
        <li>2 Buah Jas Hujan</li>
        <li>Phone Holder</li>
        <li>Kanebo</li>
        <li>Kunci Ganda</li>
      </ul>
    </li>
    <li>
      <strong>Pengisian Bensin</strong>
      <ul className="list-disc pl-6 space-y-1">
        <li>Wajib mengembalikan motor dengan jumlah bar bensin yang sama saat serah terima</li>
        <li>Jika kurang, akan dikenakan biaya Rp 10.000/bar yang hilang</li>
      </ul>
    </li>
    <li>
      <strong>Persyaratan Penyewa</strong>
      <ul className="list-disc pl-6 space-y-1">
        <li>KTP Asli (bukan scan)</li>
        <li>SIM C aktif (opsional, jika tidak ada bukan tanggung jawab kami bila terjadi tilang)</li>
        <li>Tiket perjalanan pulang-pergi</li>
        <li>Bukti booking hotel</li>
        <li>Akun Instagram asli</li>
        <li>Kontak darurat</li>
        <li>Selfie dan dokumen pendukung lainnya (akan diinformasikan admin saat booking fix)</li>
      </ul>
    </li>
    <li>
      <strong>Batas Wilayah Pemakaian</strong>
      <ul className="list-disc pl-6 space-y-1">
        <li>Hanya diperbolehkan digunakan di wilayah Bandung dan sekitarnya</li>
        <li>(Maksimal: Cimahi, Padalarang, Ciwidey, Pangalengan)</li>
        <li>Jika ditemukan digunakan di luar area tersebut, akan dikenakan denda 2x lipat dari harga sewa</li>
      </ul>
    </li>
    <li>
      <strong>Sistem Pembayaran</strong>
      <ul className="list-disc pl-6 space-y-1">
        <li>Wajib DP minimal 50% dari total harga sewa</li>
        <li>DP tidak dapat dikembalikan sepihak dengan alasan apapun</li>
        <li>Reschedule maksimal 15 hari sejak transfer dilakukan</li>
        <li>Reschedule wajib diinformasikan paling lambat H-3</li>
      </ul>
    </li>
    <li>
      <strong>Tanggung Jawab Kerusakan / Kehilangan</strong>
      <ul className="list-disc pl-6 space-y-1">
        <li>Segala kerusakan atau kehilangan selama masa sewa menjadi tanggung jawab penyewa</li>
      </ul>
    </li>
    <li>
      <strong>Jam Operasional</strong>
      <ul className="list-disc pl-6 space-y-1">
        <li>Buka dari pukul 08.00 – 22.00 WIB (termasuk untuk antar jemput / COD)</li>
      </ul>
    </li>
    <li>
      <strong>Tanggal Merah / Libur Nasional</strong>
      <ul className="list-disc pl-6 space-y-1">
        <li>Akan dikenakan kenaikan harga, sesuai kebijakan yang berlaku</li>
      </ul>
    </li>
    <li>
      <strong>Kriteria Penyewa</strong>
      <ul className="list-disc pl-6 space-y-1">
        <li>Dikhususkan untuk wisatawan atau mahasiswa dengan KTP luar Bandung</li>
      </ul>
    </li>
  </ol>
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

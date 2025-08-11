// components/LoadingPage.jsx
export default function LoadingPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="flex flex-col items-center gap-4">
        {/* Spinner */}
        <div className="w-12 h-12 border-4 border-[#950900] border-t-transparent rounded-full animate-spin"></div>

        {/* Teks Loading */}
        <p className="text-gray-700 font-semibold text-lg">
          Menyiapkan halaman perjanjian...
        </p>
        <p className="text-gray-500 text-sm">
          Mohon tunggu sebentar
        </p>
      </div>
    </div>
  )
}

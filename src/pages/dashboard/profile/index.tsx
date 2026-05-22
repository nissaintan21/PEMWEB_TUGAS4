import { useAuthStore } from "../../../store/useAuthStore";

export default function ProfileIndex() {
    // Mengambil data user dari Zustand Store
    const user = useAuthStore((state) => state.user);

    // Ambil nilai string username-nya saja (antisipasi jika berbentuk objek atau string langsung)
    const usernameText = typeof user === "object" ? user?.username : user;

    return (
        <div className="p-6 max-w-2xl mx-auto">
            {/* Header Halaman */}
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-gray-800">Profil Saya</h1>
                <p className="text-gray-500">Kelola dan lihat informasi data diri Anda di sini.</p>
            </div>

            {/* Kartu Informasi Profil */}
            <div className="bg-white rounded-2xl shadow p-6 border border-gray-100 flex flex-col items-center sm:flex-row sm:items-start gap-6">
                
                {/* Avatar Besar (Menggunakan inisial dari Nama Dummy "N") */}
                <div className="w-24 h-24 bg-blue-600 rounded-full flex items-center justify-center text-white text-4xl font-bold shadow-md">
                    N
                </div>

                {/* Detail Data */}
                <div className="flex-1 w-full space-y-4">
                    {/* NAMA LENGKAP DUMMY */}
                    <div>
                        <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider">
                            Nama Lengkap
                        </label>
                        <p className="text-lg font-medium text-gray-800 mt-1 bg-gray-50 px-4 py-2 rounded-lg border border-gray-200">
                            Nissa Intan Nurani
                        </p>
                    </div>

                    {/* USERNAME DARI LOGIN */}
                    <div>
                        <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider">
                            Username
                        </label>
                        <p className="text-lg font-medium text-gray-800 mt-1 bg-gray-50 px-4 py-2 rounded-lg border border-gray-200">
                            {usernameText || "24090018"}
                        </p>
                    </div>
                </div>

            </div>
        </div>
    );
}
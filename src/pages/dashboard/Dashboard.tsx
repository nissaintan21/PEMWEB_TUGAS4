import { useEffect, useState } from "react";
import { useAuthStore } from "../../store/useAuthStore";
import { Link } from "react-router-dom"; 

export default function Dashboard() {
    const user = useAuthStore((state) => state.user);

    if (!user) return null;

    const usernameText = typeof user === "object" ? user?.username : user;

    const [stats, setStats] = useState({
        pembicara: 0, 
        events: 0,
        categories: 0
    });

    useEffect(() => {
        fetch("http://localhost:3000/dashboard")
            .then((res) => res.json())
            .then((data) => {
                setStats(data);
            })
            .catch((err) => console.log(err));
    }, []);

    return (
        <div className="p-6 relative">
            
            <div className="flex justify-between items-start mb-6">
                <div>
                    <h1 className="text-3xl font-bold">
                        Dashboard
                    </h1>
                    <p className="text-gray-600 mt-1">
                        Selamat Datang di Dashboard Anda, <span className="font-semibold">{usernameText}</span>
                    </p>
                </div>
                <Link 
                    to="/dashboard/profile" 
                    className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 transition p-2 rounded-full shadow-sm cursor-pointer group"
                    title="Ke Profil Saya"
                >
        
                    <div className="w-10 h-10 bg-blue-600 group-hover:bg-blue-700 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-sm">
                        {usernameText?.charAt(0).toUpperCase() || "U"}
                    </div>
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">

                {/* Card Pembicara */}
                <div className="bg-blue-500 text-white p-6 rounded-xl shadow">
                    <h2 className="text-xl font-semibold">
                        Pembicara
                    </h2>
                    <p className="text-3xl mt-2">
                        {stats.pembicara || stats.pembicara || 0}
                    </p>
                </div>

                {/* Card Event */}
                <div className="bg-green-500 text-white p-6 rounded-xl shadow">
                    <h2 className="text-xl font-semibold">
                        Event
                    </h2>
                    <p className="text-3xl mt-2">
                        {stats.events}
                    </p>
                </div>

                {/* Card Kategori */}
                <div className="bg-purple-500 text-white p-6 rounded-xl shadow">
                    <h2 className="text-xl font-semibold">
                        Kategori
                    </h2>
                    <p className="text-3xl mt-2">
                        {stats.categories}
                    </p>
                </div>

            </div>
        </div>
    );
}
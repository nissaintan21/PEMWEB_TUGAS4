import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "../components/Input";
import InputPassword from "../components/InputPassword";
import Button from "../components/Button";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";

type FormData = {
    username: string;
    password: string;
}

const schema = z.object({
    username: z.string().min(2, "Username harus minimal 2 karakter"),
    password: z.string().min(8, "Password harus minimal 8 karakter"),
});

export default function Login() {
    const navigate = useNavigate();
    const login = useAuthStore((state) => state.login);

    const { register, handleSubmit, formState: { errors } } = useForm<FormData>({ 
        resolver: zodResolver(schema) 
    });

    const onSubmit = (data: FormData) => {
        console.log(data);
        
        // Ambil data username & nama yang tadinya disimpan dari form register
        const registeredUsername = localStorage.getItem("registered_username");
        const registeredNama = localStorage.getItem("registered_nama");

        const isValidRegister = registeredUsername && data.username === registeredUsername && data.password === "nissa123";
        const isValidDefault = data.username === "24090018" && data.password === "nissa123";

        if (isValidRegister || isValidDefault) {
            alert("Login berhasil");

            const namaUser = isValidRegister ? registeredNama : "Nissa Intan";

            login({
                username: data.username,
                nama: namaUser || "Nissa Intan"
            });

            navigate("/dashboard");
        } else {
            alert("Login gagal, pastikan username dan password benar");
        }
    };

    return (
        <div className="w-full max-w-md mx-auto">
            <div className="bg-white p-8 rounded-2xl shadow-lg w-full">
                <h1 className="text-3xl font-bold text-center mb-1 text-[#76153C]">
                    Login
                </h1>
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                    <Input 
                        label="Username" 
                        name="username" 
                        register={register} 
                        error={errors.username?.message}
                        placeholder="Masukkan username dengan format NIM"
                    />

                    <InputPassword 
                        label="Password" 
                        name="password" 
                        register={register} 
                        error={errors.password?.message}
                        placeholder="........"
                    />

                    <div>
                        <Button title="Login" variant="primary" />
                    </div>

                    <div className="text-sm text-gray-600">
                        Belum punya akun ? <Link to="/register" className="text-[#76153C] font-semibold hover:underline">Daftar Sekarang</Link>
                    </div>
                </form>
            </div>
        </div>
    );
}
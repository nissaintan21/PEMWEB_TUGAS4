
import { useForm } from "react-hook-form";
import { useState } from "react";
import { Navigate } from "react-router-dom";
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "../components/Input";
import InputPassword from "../components/InputPassword";
import Button  from "../components/Button";

type FormData = {
    nama: string;
    username: string;
    password: string;
    password_confirm: string;
}

const schema = z.object({
    nama: z.string().min(1, "Nama tidak boleh kosong!"),
    username: z.string().min(2, "Username harus minimal 2 karakter"),
    password: z.string().min(8, "Minimal 8 Karakter"),
    password_confirm: z.string().min(8, "Minimal 8 Karakter"),
}).refine((data) => data.password === data.password_confirm, {
    message: "Password tidak sama",
    path: ["password_confirm"],
});



export default function Register(){

    const {register, handleSubmit, formState:{errors} } = useForm<FormData>({ resolver: zodResolver(schema) });
    
    const onSubmit = (data:FormData) => {
        console.log(data)
        setRedirect(true);
    }

    const [redirect, setRedirect] = useState(false);

    if (redirect) {
        return <Navigate to="/login" />
    }

    return(
        <div className="w-full max-w-md mx-auto">
            <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-lg">
            <h1 className="text-3xl font-bold text-center mb-1 text-[#76153C]">
                Register
            </h1>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                <Input 
                    label="Nama" 
                    name="nama" 
                    register={register} 
                    error={errors.nama?.message}
                    placeholder="Nama lengkap Anda"
                />

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
                    placeholder="......."
                />

                <InputPassword
                    label="Konfirmasi Password" 
                    name="password_confirm" 
                    register={register} 
                    error={errors.password_confirm?.message}
                    placeholder="........"
                />
                
                <Button title="Register" variant="primary" />

            </form>
        </div>
        </div>
    );
}

import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "../components/Input";
import InputPassword from "../components/InputPassword";
import Button  from "../components/Button";
import { Link } from "react-router-dom";
import {useAuthStore} from "../store/useAuthStore";

type FormData = {
    email:string;
    password:string;
}

const schema = z.object({
    email: z.string().email("Email tidak valid"),
    password: z.string().min(8, "Minimal 8 Karakter"),
});

export default function Login() {
    const navigate = useNavigate();
    const login=useAuthStore((state)=>state.login);

    const {register, handleSubmit, formState:{errors} } = useForm<FormData>({ resolver: zodResolver(schema) });

    const onSubmit = (data:FormData) => {
        console.log(data);
        if(data.email==="nissaintan@gmail.com" && 
            data.password==="24090018"
        )
        {
            alert("Login berhasil");
            login(data.email);
            navigate("/dashboard");
        }else
        {alert("Login gagal, pastikan email dan password benar");
        }
    };

    return(
        <div className="w-full max-w-md mx-auto">
    <div className="bg-white p-8 rounded-2xl shadow-lg w-full">
                <h1 className="text-3xl font-bold text-center mb-1 text-[#76153C]">
                    Login
                </h1>
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                    <Input 
                        label="Email" 
                        name="email" 
                        register={register} 
                        error={errors.email?.message}
                        placeholder="email@anda.com"
                    />

                    <InputPassword 
                        label="Password" 
                        name="password" 
                        register={register} 
                        error={errors.password?.message}
                        placeholder="........"
                    />

                    <div>
                        <Button title="Login" variant="primary" ></Button>
                    </div>

                    <div>
                        Belum punya akun ? <Link to="/register" className="text-[#76153C]">Daftar Sekarang</Link>
                    </div>
                </form>
            </div>
        </div>
    )
}
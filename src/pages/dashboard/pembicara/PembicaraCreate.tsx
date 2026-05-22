import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Input from "../../../components/Input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const API_URL = "http://localhost:3000";

type FormData = {
  name: string;
  role: string;
};

const schema = z.object({
  name: z.string().min(1, "Name tidak boleh kosong"),
  role: z.string().min(1, "Role tidak boleh kosong"),
});

export default function PembicaraCreate() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema), 
  });
const onSubmit = async (data: FormData) => {

  try {

    const response = await fetch(
      `${API_URL}/pembicara`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    const result = await response.json();

    console.log(result);

    alert("Pembicara berhasil ditambahkan");

    navigate("/dashboard/pembicara");

  } catch (error) {

    console.error(error);

    alert("Gagal menambahkan pembicara");
  }
};
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-2">Tambah Pembicara</h1>
      <p className="mb-4">Form untuk menambahkan Pembicara</p>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          label="Nama"
          name="name"
          placeholder="Masukkan nama category"
          register={register}
          error={errors.name?.message}
        />

        <Input
          label="Role"
          name="role"
          placeholder="Masukkan role"
          register={register}
          error={errors.role?.message}
        />


        
        {/* Tombol */}
        <button type="submit" className="bg-red-900 text-white p-2 rounded-xl">
  Simpan
</button>
      </form>
    </div>
  );
}
import { useForm } from "react-hook-form";
import Input from "../../../components/Input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";



type FormData = {
  nama: string;
  role: string;
};

const schema = z.object({
  nama: z.string().min(1, "Nama tidak boleh kosong"),
  role: z.string().min(1, "Role tidak boleh kosong"),
});

export default function PembicaraCreate() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema), 
  });

  const onSubmit = (data: FormData) => {
    console.log(data);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-2">Tambah Pembicara</h1>
      <p className="mb-4">Form untuk menambahkan Pembicara</p>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          label="Nama"
          name="nama"
          placeholder="Masukkan nama category"
          register={register}
          error={errors.nama?.message}
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
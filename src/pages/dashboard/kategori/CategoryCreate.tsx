import { useForm } from "react-hook-form"; 
import { z } from "zod"; //untuk validasi
import { zodResolver } from "@hookform/resolvers/zod"; //validasi
import Input from "../../../components/Input";
import Button from "../../../components/Button";

//definisikan field yang ada di dalam form
type FormData = {
  nama: string;
};
//definisikan validasi untuk form
const schema = z.object({
  nama: z.string().min(1, "Category tidak boleh kosong"),
});

//registrasi fungsi zod
export default function CategoryCreate() {
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
      <h1 className="text-2xl font-bold mb-2">Tambah Kategori</h1>
      <p className="mb-4">Form untuk menambahkan Kategori baru</p>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          label="Nama Category"
          name="nama"
          placeholder="Masukkan nama category"
          register={register}
          error={errors.nama?.message}
        />

        <Button title="Simpan" variant="primary" />
      </form>
    </div>
  );
}
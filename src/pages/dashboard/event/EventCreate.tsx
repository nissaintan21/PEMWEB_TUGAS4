import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "../../../components/Input";

type FormData = {
  event: string;
  category: string;
  date: string;
};

const schema = z.object({
  event: z.string().min(1, "Nama Event tidak boleh kosong"),
  category: z.string().min(1, "Category tidak boleh kosong"),
  date: z.string().min(1, "Tanggal tidak boleh kosong")
});
export default function EventCreate() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
  resolver: zodResolver(schema), 
});
  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-2">Tambah Event</h1>
      <p className="mb-4">Form untuk menambahkan Event baru</p>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          label="Nama Event"
          name="nama"
          placeholder="Masukkan nama category"
          register={register}
          error={errors.event?.message}
        />

        <Input
          label="Category"
          name="category"
          placeholder="Masukkan category"
          register={register}
          error={errors.category?.message}
        />

        {/* Tanggal */}
        <Input
          label="Tanggal Event"
          name="date"
          type="date"
          register={register}
          error={errors.date?.message}
        />

        {/* Tombol */}
        <button className="bg-red-900 text-white p-2 rounded-xl">
          Simpan
        </button>
      </form>
    </div>
  );
}
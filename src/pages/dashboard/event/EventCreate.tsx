import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import Input from "../../../components/Input";

const API_URL = "http://localhost:3000";

type Category = {
  id: number;
  name: string;
};

type Pembicara = {
  id: number;
  name: string;
};

type FormData = {
  name: string;
  categoryId: string;
  pembicaraId: string;
  location: string;
  dateEvent: string;
  description: string;
};

const schema = z.object({
  name: z.string().min(1, "Nama Event tidak boleh kosong"),
  categoryId: z.string().min(1, "Category tidak boleh kosong"),
  pembicaraId: z.string().min(1, "Pembicara tidak boleh kosong"),
  location: z.string().min(1, "Location tidak boleh kosong"),
  dateEvent: z.string().min(1, "Tanggal tidak boleh kosong"),
  description: z.string().min(1, "Description tidak boleh kosong"),
});

export default function EventCreate() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState<Category[]>([]);
  const [pembicara, setPembicara] = useState<Pembicara[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  // GET CATEGORY & PEMBICARA
  useEffect(() => {
    fetch(`${API_URL}/categories`)
      .then((res) => res.json())
      .then((data) => setCategories(data));

    fetch(`${API_URL}/pembicara`)
      .then((res) => res.json())
      .then((data) => setPembicara(data));
  }, []);

  const onSubmit = async (data: FormData) => {
    try {
      const response = await fetch(`${API_URL}/events`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...data,
          categoryId: Number(data.categoryId),
          pembicaraId: Number(data.pembicaraId),
          dateEvent: new Date(data.dateEvent),
        }),
      });

      if (!response.ok) {
        throw new Error("Gagal menyimpan data ke server backend");
      }

      const result = await response.json();
      console.log(result);

      alert("Event berhasil ditambahkan");
      navigate("/dashboard/event");

    } catch (error) {
      console.error(error);
      alert("Gagal menambahkan event");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-2">Tambah Event</h1>
      <p className="mb-4">Form untuk menambahkan Event baru</p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* NAMA EVENT */}
        <Input
          label="Nama Event"
          name="name"
          placeholder="Masukkan nama event"
          register={register}
          error={errors.name?.message}
        />

        {/* CATEGORY */}
        <div>
          <label className="block mb-1">Category</label>
          <select
            {...register("categoryId")}
            className="border p-2 w-full rounded-xl"
          >
            <option value="">Pilih Category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
          <p className="text-red-500 text-sm">{errors.categoryId?.message}</p>
        </div>

        {/* PEMBICARA */}
        <div>
          <label className="block mb-1">Pembicara</label>
          <select
            {...register("pembicaraId")}
            className="border p-2 w-full rounded-xl"
          >
            <option value="">Pilih Pembicara</option>
            {pembicara.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>
          <p className="text-red-500 text-sm">{errors.pembicaraId?.message}</p>
        </div>

        {/* TANGGAL */}
        <Input
          label="Tanggal Event"
          name="dateEvent"
          type="date"
          register={register}
          error={errors.dateEvent?.message}
        />

        {/* LOCATION */}
        <Input
          label="Location"
          name="location"
          placeholder="Masukkan location"
          register={register}
          error={errors.location?.message}
        />

        {/* DESCRIPTION */}
        <Input
          label="Description"
          name="description"
          placeholder="Masukkan description"
          register={register}
          error={errors.description?.message}
        />

        {/* BUTTON */}
        <button
          type="submit"
          className="bg-red-900 text-white p-2 rounded-xl"
        >
          Simpan
        </button>
      </form>
    </div>
  );
}
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";

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

export default function EventEdit() {

  const { id } = useParams();

  const navigate = useNavigate();

  const [categories, setCategories] =
    useState<Category[]>([]);

  const [pembicara, setPembicara] =
    useState<Pembicara[]>([]);

  const {
    register,
    handleSubmit,
    setValue,
  } = useForm<FormData>();

  // GET DATA EVENT
  useEffect(() => {

    fetch(`${API_URL}/events/${id}`)
      .then((res) => res.json())
      .then((data) => {

        setValue("name", data.name);

        setValue(
          "categoryId",
          String(data.categoryId)
        );

        setValue(
          "pembicaraId",
          String(data.pembicaraId)
        );

        setValue("location", data.location);

        setValue(
          "dateEvent",
          data.dateEvent.split("T")[0]
        );

        setValue("description", data.description);
    });
    
    // CATEGORY
    fetch(`${API_URL}/categories`)
      .then((res) => res.json())
      .then((data) => setCategories(data));

    // PEMBICARA
    fetch(`${API_URL}/pembicara`)
      .then((res) => res.json())
      .then((data) => setPembicara(data));

  }, [id, setValue]);

  // UPDATE
  const onSubmit = async (
    data: FormData
  ) => {

    try {

          await fetch(
      `${API_URL}/events/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...data,
          categoryId: Number(data.categoryId),
          pembicaraId: Number(data.pembicaraId),
          dateEvent: new Date(data.dateEvent),
        }),
      }
    );

      alert("Event berhasil diupdate");

      navigate("/dashboard/event");

    } catch (error) {

      console.error(error);

      alert("Gagal update event");
    }
  };

  return (
    <div className="p-6">

      <h1 className="text-2xl font-bold mb-4">
        Edit Event
      </h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4"
      >

        {/* NAME */}
        <Input
          label="Nama Event"
          name="name"
          register={register}
        />

        {/* CATEGORY */}
        <select
          {...register("categoryId")}
          className="border p-2 w-full rounded-xl"
        >

          <option value="">
            Pilih Category
          </option>

          {categories.map((category) => (
            <option
              key={category.id}
              value={category.id}
            >
              {category.name}
            </option>
          ))}
        </select>

        {/* PEMBICARA */}
        <select
          {...register("pembicaraId")}
          className="border p-2 w-full rounded-xl"
        >

          <option value="">
            Pilih Pembicara
          </option>

          {pembicara.map((item) => (
            <option
              key={item.id}
              value={item.id}
            >
              {item.name}
            </option>
          ))}
        </select>

        {/* DATE */}
        <Input
          label="Tanggal Event"
          name="dateEvent"
          type="date"
          register={register}
        />

        {/* LOCATION */}
        <Input
          label="Location"
          name="location"
          register={register}
        />

        {/* DESCRIPTION */}
        <Input
          label="Description"
          name="description"
          register={register}
        />

        <button
          type="submit"
          className="bg-yellow-500 text-white p-2 rounded-xl"
        >
          Update
        </button>

      </form>
    </div>
  );
}
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";

import Input from "../../../components/Input";

const API_URL = "http://localhost:3000";

// TYPE
type FormData = {
  name: string;
  role: string;
};

export default function PembicaraEdit() {

  const { id } = useParams();

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setValue,
  } = useForm<FormData>();

  // GET PEMBICARA BY ID
  useEffect(() => {

    fetch(
      `${API_URL}/pembicara/${id}`
    )
      .then((res) => res.json())
      .then((data) => {

        setValue("name", data.name);

        setValue("role", data.role);
      });

  }, [id, setValue]);

  // UPDATE
  const onSubmit = async (
    data: FormData
  ) => {

    try {

      await fetch(
        `${API_URL}/pembicara/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      alert("Pembicara berhasil diupdate");

      navigate("/dashboard/pembicara");

    } catch (error) {

      console.error(error);

      alert("Gagal update pembicara");
    }
  };

  return (
    <div className="p-6">

      <h1 className="text-2xl font-bold mb-2">
        Edit Pembicara
      </h1>

      <p className="mb-4">
        Form untuk mengedit pembicara
      </p>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4"
      >

        <Input
          label="Nama"
          name="name"
          placeholder="Masukkan nama"
          register={register}
        />

        <Input
          label="Role"
          name="role"
          placeholder="Masukkan role"
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
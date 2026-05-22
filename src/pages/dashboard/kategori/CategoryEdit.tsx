import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";

import Input from "../../../components/Input";
import Button from "../../../components/Button";

const API_URL = "http://localhost:3000";

// TYPE
type FormData = {
  name: string;
};

export default function CategoryEdit() {

  const { id } = useParams();

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setValue,
  } = useForm<FormData>();

  // GET CATEGORY BY ID
  useEffect(() => {

    fetch(
      `${API_URL}/categories/${id}`
    )
      .then((res) => res.json())
      .then((data) => {

        setValue("name", data.name);
      });

  }, [id, setValue]);

  // UPDATE
  const onSubmit = async (
    data: FormData
  ) => {

    try {

      await fetch(
        `${API_URL}/categories/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      alert("Category berhasil diupdate");

      navigate("/dashboard/category");

    } catch (error) {

      console.error(error);

      alert("Gagal update category");
    }
  };

  return (
    <div className="p-6">

      <h1 className="text-2xl font-bold mb-2">
        Edit Kategori
      </h1>

      <p className="mb-4">
        Form untuk mengedit kategori
      </p>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4"
      >

        <Input
          label="Nama Category"
          name="name"
          placeholder="Masukkan nama category"
          register={register}
        />

        <Button
          title="Update"
          variant="primary"
        />

      </form>
    </div>
  );
}
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const API_URL = "http://localhost:3000";

type Category = {
  id: number;
  name: string;
};

export default function CategoryIndex() {

  const [categories, setCategories] =
    useState<Category[]>([]);

  // GET DATA
  const getCategories = async () => {

    try {

      const response = await fetch(
        `${API_URL}/categories`
      );

      const data = await response.json();

      setCategories(data);

    } catch (error) {

      console.error(error);
    }
  };

  // DELETE
  const handleDelete = async (id: number) => {

    const confirmDelete = confirm(
      "Yakin ingin menghapus kategori?"
    );

    if (!confirmDelete) return;

    try {

      await fetch(
        `${API_URL}/categories/${id}`,
        {
          method: "DELETE",
        }
      );

      getCategories();

    } catch (error) {

      console.error(error);

      alert("Gagal menghapus kategori");
    }
  };

  // LOAD DATA
  useEffect(() => {
    getCategories();
  }, []);

  return (
    <div className="p-4">

      <h1 className="text-2xl font-bold mb-4">
        KATEGORI
      </h1>

      <p className="mb-4">
        Berikut daftar kategori yang tersedia
      </p>

      {/* LIST */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        {categories.map((cat) => (

          <div
            key={cat.id}
            className="bg-white shadow rounded-xl p-4"
          >

            <h2 className="font-bold text-lg mb-4">
              {cat.name}
            </h2>

            <div className="flex gap-2">

              {/* EDIT */}
              <Link
                to={`/dashboard/category/edit/${cat.id}`}
                className="px-3 py-1 bg-yellow-500 text-white rounded"
              >
                Edit
              </Link>

              {/* DELETE */}
              <button
                onClick={() => handleDelete(cat.id)}
                className="px-3 py-1 bg-red-500 text-white rounded"
              >
                Hapus
              </button>

            </div>
          </div>
        ))}
      </div>

      {/* BUTTON */}
      <Link
        to="/dashboard/category/create"
        className="inline-block mt-6 px-4 py-2 bg-blue-500 text-white rounded-lg"
      >
        Tambah Kategori
      </Link>

    </div>
  );
}
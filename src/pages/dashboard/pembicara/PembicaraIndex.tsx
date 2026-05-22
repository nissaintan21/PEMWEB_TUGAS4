import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const API_URL = "http://localhost:3000";

type Pembicara = {
  id: number;
  name: string;
  role: string;
};

export default function PembicaraIndex() {

  const [pembicara, setPembicara] =
    useState<Pembicara[]>([]);

  // GET DATA
  const getPembicara = async () => {

    try {

      const response = await fetch(
        `${API_URL}/pembicara`
      );

      const data = await response.json();

      setPembicara(data);

    } catch (error) {

      console.error(error);
    }
  };

  // DELETE
  const handleDelete = async (id: number) => {

    const confirmDelete = confirm(
      "Yakin ingin menghapus pembicara?"
    );

    if (!confirmDelete) return;

    try {

      await fetch(
        `${API_URL}/pembicara/${id}`,
        {
          method: "DELETE",
        }
      );

      getPembicara();

    } catch (error) {

      console.error(error);

      alert("Gagal menghapus pembicara");
    }
  };

  // LOAD DATA
  useEffect(() => {
    getPembicara();
  }, []);

  return (
    <div className="p-4">

      <h1 className="text-2xl font-bold mb-4">
        PEMBICARA
      </h1>

      <p className="mb-4">
        Berikut daftar pembicara yang tersedia
      </p>

      {/* LIST */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        {pembicara.map((pemb) => (

          <div
            key={pemb.id}
            className="bg-white shadow rounded-xl p-4"
          >

            <h2 className="font-bold text-lg">
            {pemb.name}
            </h2>

            <p className="text-gray-500 text-sm mt-1">
            {pemb.role}
            </p>

            <div className="flex gap-2">

              {/* EDIT */}
              <Link
                to={`/dashboard/pembicara/edit/${pemb.id}`}
                className="px-3 py-1 bg-yellow-500 text-white rounded"
              >
                Edit
              </Link>

              {/* DELETE */}
              <button
                onClick={() => handleDelete(pemb.id)}
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
        to="/dashboard/pembicara/create"
        className="inline-block mt-6 px-4 py-2 bg-blue-500 text-white rounded-lg"
      >
        Tambah Pembicara
      </Link>

    </div>
  );
}
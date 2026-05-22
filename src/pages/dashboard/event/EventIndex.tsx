import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const API_URL = "http://localhost:3000";

type Event = {
  id: number;
  name: string;
  location: string;
};

export default function EventIndex() {

  const [events, setEvents] = useState<Event[]>([]);

  // GET DATA
  const getEvents = async () => {

    try {

      const response = await fetch(
        `${API_URL}/events`
      );

      const data = await response.json();

      setEvents(data);

    } catch (error) {

      console.error(error);
    }
  };

  // DELETE
  const handleDelete = async (id: number) => {

    const confirmDelete = confirm(
      "Yakin ingin menghapus event?"
    );

    if (!confirmDelete) return;

    try {

      await fetch(
        `${API_URL}/events/${id}`,
        {
          method: "DELETE",
        }
      );

      getEvents();

    } catch (error) {

      console.error(error);
    }
  };

  // LOAD DATA
  useEffect(() => {
    getEvents();
  }, []);

  return (
    <div className="p-4">

      <h1 className="text-2xl font-bold mb-4">
        EVENT
      </h1>

      <p className="mb-4">
        Berikut daftar event yang tersedia
      </p>

      {/* LIST */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        {events.map((event) => (

          <div
            key={event.id}
            className="bg-white shadow rounded-xl p-4"
          >

            <h2 className="font-bold text-lg">
              {event.name}
            </h2>

            <p className="text-gray-500 mb-4">
              {event.location}
            </p>

            <div className="flex gap-2">

              {/* EDIT */}
              <Link
                to={`/dashboard/event/edit/${event.id}`}
                className="px-3 py-1 bg-yellow-500 text-white rounded"
              >
                Edit
              </Link>

              {/* DELETE */}
              <button
                onClick={() => handleDelete(event.id)}
                className="px-3 py-1 bg-red-500 text-white rounded"
              >
                Hapus
              </button>

            </div>
          </div>
        ))}
      </div>

      {/* TAMBAH */}
      <Link
        to="/dashboard/event/create"
        className="inline-block mt-6 px-4 py-2 bg-blue-500 text-white rounded-lg"
      >
        Tambah Event
      </Link>

    </div>
  );
}
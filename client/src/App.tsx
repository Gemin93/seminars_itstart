import { useEffect, useState } from "react";
import CardSeminar from "../src/components/CardSeminar/CardSeminar";
import Modal from "./components/Modal/Modal";
import { ISeminar } from "./types";

function App() {
  const [seminars, setSeminars] = useState<ISeminar[]>([]); //стейт для хранения списка семинаров
  const [selectedSeminar, setSelectedSeminar] = useState<ISeminar | null>(null); //стейт для хранения выбранного семинара
  const [isDeleteOpen, setIsDeleteOpen] = useState(false); //стейт для открытия окна удаления
  const [isEditOpen, setIsEditOpen] = useState(false); //стейт для открытия окна редактирования

  // Запрос списка семинаров
  useEffect(() => {
    fetch("http://localhost:3001/seminars")
      .then((response) => response.json())
      .then((data) => setSeminars(data));
  }, []);

  // функция удаления семинара
  const handleDelete = (id: number) => {
    fetch(`http://localhost:3001/seminars/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        setSeminars((prevSeminars) =>
          prevSeminars.filter((seminar) => seminar.id !== id)
        );
        setIsDeleteOpen(false);
      })
      .catch((error) => console.error("Ошибка при удалении:", error));
  };

  // заменить на редактирование
  const handleEdit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!selectedSeminar) return;

    const formData = new FormData(event.currentTarget);
    // собираем данные для редактирования
    const updatedSeminar = {
      ...selectedSeminar,
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      date: formData.get("date") as string,
      time: formData.get("time") as string,
    };

    fetch(`http://localhost:3001/seminars/${selectedSeminar.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedSeminar),
    })
      .then(() => {
        setSeminars((prevSeminars) =>
          prevSeminars.map((seminar) =>
            seminar.id === selectedSeminar.id ? updatedSeminar : seminar
          )
        );
        setIsEditOpen(false);
      })
      .catch((error) => console.error("Ошибка при обновлении:", error));
  };

  const openDeleteModal = (seminar: ISeminar) => {
    setSelectedSeminar(seminar);
    setIsDeleteOpen(true);
  };

  const openEditModal = (seminar: ISeminar) => {
    setSelectedSeminar(seminar);
    setIsEditOpen(true);
  };

  return (
    <>
      <div className="font-sans max-w-[1280px] mx-auto p-8">
        <h1 className="text-4xl sm:text-5xl md:text-6xl text-[#ac3b61] font-bold mb-10 text-center">
          Семинары
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {seminars.map((seminar) => (
            <CardSeminar
              key={seminar.id}
              seminar={seminar}
              onDelete={() => openDeleteModal(seminar)}
              onEdit={() => openEditModal(seminar)}
            />
          ))}
        </div>
      </div>

      {/* модальное окно для удаления семинара */}

      {selectedSeminar && (
        <Modal
          isOpen={isDeleteOpen}
          onClose={() => setIsDeleteOpen(false)}
          title="Удалить семинар?"
        >
          <p>Вы уверены, что хотите удалить {selectedSeminar.title}?</p>
          <div className="flex justify-end space-x-3 mt-4">
            <button
              onClick={() => setIsDeleteOpen(false)}
              className="px-4 py-2 bg-gray-300 rounded"
            >
              Отмена
            </button>
            <button
              onClick={() => handleDelete(selectedSeminar.id)}
              className="px-4 py-2 bg-red-500 text-white rounded"
            >
              Удалить
            </button>
          </div>
        </Modal>
      )}

      {/* модальное окно для редактирования семинара */}

      {selectedSeminar && (
        <Modal
          isOpen={isEditOpen}
          onClose={() => setIsEditOpen(false)}
          title="Редактировать семинар"
        >
          <form onSubmit={handleEdit}>
            <input
              name="title"
              className="border p-2 w-full mb-2"
              type="text"
              defaultValue={selectedSeminar.title}
              required
            />
            <textarea
              name="description"
              className="border p-2 w-full mb-2"
              defaultValue={selectedSeminar.description}
              required
            />
            <input
              name="date"
              className="border p-2 w-full mb-2"
              type="date"
              defaultValue={selectedSeminar.date}
              required
            />
            <input
              name="time"
              className="border p-2 w-full mb-2"
              type="time"
              defaultValue={selectedSeminar.time}
              required
            />
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded"
            >
              Сохранить
            </button>
          </form>
        </Modal>
      )}
    </>
  );
}

export default App;

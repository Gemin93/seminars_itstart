import { FC } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { ISeminar } from "../../types";

interface Props {
  seminar: ISeminar;
  onDelete: (id: number) => void;
  onEdit: (id: number) => void;
}

const CardSeminar: FC<Props> = ({ seminar, onDelete, onEdit }) => {
  return (
    <>
      <div
        className="p-6 border-6 border-[#edc7b7] rounded-lg bg-cover bg-center flex flex-col justify-between"
        style={{ backgroundImage: `url(${seminar.photo})` }}
      >
        {/* Полупрозрачный слой для читаемости текста */}
        <div className="bg-white/80 p-4 rounded-md">
          <div className="flex flex-row-reverse mb-3">
            <button
              onClick={() => onDelete(seminar.id)}
              className="cursor-pointer rounded-md p-2 bg-[#edc7b7]"
            >
              <FaTrash color="#123c69" size={20} />
            </button>
            <button
              onClick={() => onEdit(seminar.id)}
              className="cursor-pointer mr-3 rounded-md p-2 bg-[#edc7b7] accent-[#fff]"
            >
              <FaEdit color="#123c69" size={20} />
            </button>
          </div>

          <h2 className="text-2xl font-bold mb-5 text-[#ac3b61]">
            {seminar.title}
          </h2>
          <p className="font-medium text-[#123c69] mb-5">
            {seminar.description}
          </p>
          <div className="mt-auto">
            <span className="font-bold p-2 bg-[#edc7b7] text-[#123c69] rounded-md mr-3">
              {seminar.date}
            </span>
            <span className="font-bold p-2 bg-[#edc7b7] text-[#123c69] rounded-md">
              {seminar.time}
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default CardSeminar;

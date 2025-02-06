import { useEffect, useState } from "react";
import CardSeminar from "../src/components/CardSeminar/CardSeminar";
import { ISeminar } from "./types";

function App() {
  const [seminars, setSeminars] = useState<ISeminar[]>([]);

  // Запрос списка семинаров
  useEffect(() => {
    fetch("http://localhost:3001/seminars")
      .then((response) => response.json())
      .then((data) => setSeminars(data));
  }, []);

  return (
    <>
      <div className="font-sans max-w-[1280px] mx-auto p-8">
        <h1 className="text-4xl sm:text-5xl md:text-6xl text-[#ac3b61] font-bold mb-10 text-center">
          Семинары
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {seminars.map((seminar) => (
            <CardSeminar key={seminar.id} seminar={seminar} />
          ))}
        </div>
      </div>
    </>
  );
}

export default App;

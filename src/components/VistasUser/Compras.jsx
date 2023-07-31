import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllBooks } from "../../redux/actions";
import { FaArrowRight } from "react-icons/fa";
import { useEffect } from "react";

const Compras = () => {
  const dispatch = useDispatch();
  const books = useSelector((state) => state.copyState);
  console.log(books);

  useEffect(() => {
    dispatch(getAllBooks());
  }, []);

  const [selectedBook, setSelectedBook] = useState(null);

  const handleBookClick = (book) => {
    setSelectedBook(book);
  };

  const handleCloseInfo = () => {
    setSelectedBook(null);
  };

  return (
    <div className="flex flex-col items-center py-10 bg-[#FFD8D4] min-h-screen">
      <div className="mb-10 text-center">
        <h1 className="text-4xl text-customColor4 font-bold">Compras realizadas</h1>
      </div>
      <div className="grid grid-cols-1 gap-8">
        {books?.slice(0, 5).map((book) => (
          <div
            key={book.id}
            className="relative rounded-lg p-6 pr-8 bg-[#FF988B] shadow-lg transform hover:scale-105 transition-transform"
          >
            <img
              src={book.image}
              alt={book.name}
              className="w-72 h-88 object-cover mr-2 rounded-lg"
            />
            {/* Flecha que aparecerá en el centro del marco */}
            <div
              className="absolute top-1/2 right-0 transform -translate-y-1/2 mt-2 mr-2 cursor-pointer"
              onClick={() => handleBookClick(book)}
            >
              <FaArrowRight size={24} />
            </div>
            {selectedBook && selectedBook.id === book.id && (
              <div className="absolute top-1/2 left-full mt-[-110px] ml-4 p-4 bg-[#FF988B] text-white shadow-lg rounded-lg"
              style={{ width: "420px", height: "220px" }}>
                <p className="text-3xl font-semibold mb-4">{selectedBook.name}</p>
                <p className="text-lg font-medium mb-2">Precio: ${selectedBook.price}</p>
                <p className="text-base mb-6">Género: {selectedBook.Gender?.name}</p>
                <p>Cantidad comprada: 10</p>
                <button
                  className="absolute top-2 right-2 text-white hover:text-gray-200"
                  onClick={handleCloseInfo}
                >
                  X
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Compras;

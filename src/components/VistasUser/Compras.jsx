import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllPurchases } from "../../redux/actions";
import { FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Compras = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const purchases = useSelector((state) => state.myShopping);
  console.log(purchases);

  useEffect(() => {
    dispatch(getAllPurchases());
  }, []);

  const [selectedBook, setSelectedBook] = useState(null);

  const handleBookClick = (book) => {
    setSelectedBook(book);
  };

  const handleCloseInfo = () => {
    setSelectedBook(null);
  };

  const goHome = () => {
    navigate("/home");
  };

  const groupedBooks = purchases.reduce((grouped, purchase) => {
    purchase.products.forEach((product) => {
      const { title, totalAmount, quantity, image } = product;
      if (!grouped[title]) {
        grouped[title] = {
          title,
          totalAmount: parseInt(totalAmount, 10),
          quantity: parseInt(quantity, 10),
          image: image || "https://mymodernmet.com/wp/wp-content/uploads/2022/02/how-to-draw-a-book-1.jpg",
        };
      } else {
        grouped[title].quantity += parseInt(quantity, 10);
        grouped[title].totalAmount += parseInt(totalAmount, 10);
      }
    });
    return grouped;
  }, {});

  const books = Object.values(groupedBooks);

  return (
    <div className="flex flex-col items-center py-10 bg-negro min-h-screen">
      {books.length === 0 ? (
        <div className="flex flex-col items-center justify-center font-secondary" style={{ height: "45vh" }}>
          <p className="text-2xl mb-4 text-blanco font-bold">POR AHORA NO HAS COMPRADO NINGÚN LIBRO</p>
          <button className="mt-4 bg-white hover:border hover:border-blanco bg-gradient-to-r from-violeta to-rojo px-6 py-3 text-white rounded-lg text-xl" onClick={goHome}>
            Volver al Home
          </button>
        </div>
      ) : (
        <div>
          <div className="mb-10 text-center">
            <h1 className="text-4xl text-blanco font-bold underline font-secondary">Compras realizadas</h1>
          </div>
          <div className="grid grid-cols-1 gap-8">
            {books.map((book) => (
              <div
                key={book.title}
                className="relative  rounded-lg p-6 pr-8  bg-white hover:border hover:border-blanco bg-gradient-to-r from-violeta to-rojo shadow-lg transform hover:scale-105 transition-transform"
              >
                <img src={book.image} alt={book.title} className="w-72 h-80 object-cover mr-2 rounded-lg" />

                <div className="absolute top-1/2 right-0 transform -translate-y-1/2 mt-2 mr-2 cursor-pointer" onClick={() => handleBookClick(book)}>
                  <FaArrowRight size={24} />
                </div>
                {selectedBook && selectedBook.title === book.title && (
                  <div className="absolute top-1/2 left-full mt-[-110px] ml-4 p-4 bg-white hover:border hover:border-blanco bg-gradient-to-r from-violeta to-rojo text-white shadow-lg rounded-lg" style={{ width: "420px", height: "220px" }}>
                    <p className="text-3xl font-semibold mb-8  font-secondary">{book.title.toUpperCase()}</p>
                    <p className="text-lg font-medium mb-4 font-secondary">Precio Total: ${book.totalAmount}</p>
                    <p className="text-lg font-medium mb-2 font-secondary">Cantidad comprada: {book.quantity}</p>
                    <button className="absolute top-2 right-2 text-white hover:text-gray-200 font-bold" onClick={handleCloseInfo}>
                      X
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Compras;

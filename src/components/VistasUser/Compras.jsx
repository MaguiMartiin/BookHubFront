import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllPurchases } from "../../redux/actions";
import { FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Compras = () => {
  const navigate = useNavigate()
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
    navigate('/home');
  }


  const groupedBooks = purchases.reduce((grouped, purchase) => {
    purchase.products.forEach((product) => {
      const { title, unit_price, quantity } = product;
      if (!grouped[title]) {
        grouped[title] = {
          title,
          unit_price,
          quantity: parseInt(quantity, 10),
        };
      } else {
        grouped[title].quantity += parseInt(quantity, 10);
      }
    });
    return grouped;
  }, {});

  
  const books = Object.values(groupedBooks);

  return (
    <div className="flex flex-col items-center py-10 bg-[#FFD8D4] min-h-screen">
      {books.length === 0 ? (
         <div className="flex flex-col items-center justify-center" style={{height: "45vh"}}>
         <p className="text-2xl mb-4">POR AHORA NO HAS COMPRADO NINGÚN LIBRO</p>
         <button className="mt-4 bg-customColor4 px-6 py-3 text-white rounded-lg text-xl" onClick={goHome}>
           Volver al Home
         </button>
       </div>
        
      ) : (
        <div>
      <div className="mb-10 text-center">
        <h1 className="text-4xl text-customColor4 font-bold">Compras realizadas</h1>
      </div>
        <div className="grid grid-cols-1 gap-8">
          {books.map((book) => (
            <div
              key={book.title}
              className="relative rounded-lg p-6 pr-8 bg-[#FF988B] shadow-lg transform hover:scale-105 transition-transform"
            >
              <img
                src={book.image}
                alt={book.title}
                className="w-72 h-88 object-cover mr-2 rounded-lg"
              />

              <div
                className="absolute top-1/2 right-0 transform -translate-y-1/2 mt-2 mr-2 cursor-pointer"
                onClick={() => handleBookClick(book)}
              >
                <FaArrowRight size={24} />
              </div>
              {selectedBook && selectedBook.title === book.title && (
                <div
                  className="absolute top-1/2 left-full mt-[-110px] ml-4 p-4 bg-[#FF988B] text-white shadow-lg rounded-lg"
                  style={{ width: "420px", height: "220px" }}
                >
                  <p className="text-3xl font-semibold mb-8">{book.title}</p>
                  <p className="text-lg font-medium mb-4">Precio unitario: ${book.unit_price}</p>
                  <p className="text-lg font-medium mb-2">Cantidad comprada: {book.quantity}</p>
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
      )}
    </div>
  );
};

export default Compras;

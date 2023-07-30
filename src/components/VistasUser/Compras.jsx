import React from "react";
import axios from "axios";
import { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { getAllBooks } from "../../redux/actions";
const Compras = () => {

    // const compra = async () => {

    //     try {
    //         const compras = await axios.get("/perfil/myBooks")
    //     } catch (error) {
            
    //     }
    // }

    const dispatch = useDispatch();
    const books = useSelector((state) => state.copyState);
    console.log(books);
  
    useEffect(() => {
      dispatch(getAllBooks());
    }, []);
  
    return ( 
      <div className="flex flex-col items-center my-10">
        <div className="mb-5 text-center">
          <h1 className="text-3xl text-customColor4 font-bold">
            Compras realizadas
          </h1>
        </div>
        <div className="grid grid-cols-1 gap-4">
          {books?.slice(0, 5).map((book) => (
            <div
              key={book.id}
              className="flex items-center"
              onMouseEnter={() => {
                const bookInfo = document.getElementById(`book-info-${book.id}`);
                bookInfo.classList.remove("hidden");
              }}
              onMouseLeave={() => {
                const bookInfo = document.getElementById(`book-info-${book.id}`);
                bookInfo.classList.add("hidden");
              }}
            >
              <img
                src={book.image}
                alt={book.name}
                className="w-40 h-auto object-contain"
              />
              <div
                id={`book-info-${book.id}`}
                className="hidden bg-white p-2 shadow-md ml-4"
              >
                <p>{book.name}</p>
                <p>{book.price}</p>
                <p>{book.Gender?.name}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  export default Compras
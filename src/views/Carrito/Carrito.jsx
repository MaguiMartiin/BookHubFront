import style from "./Carrito.module.css";
import React from "react";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteFromCart } from "../../redux/actions";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Footer from "../../components/Footer/Footer";

const Carrito = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const cart = useSelector((state) => state.cart);

	const [totalPrice, setTotalPrice] = useState(0);
	const [selectedQuantities, setSelectedQuantities] = useState({});

	useEffect(() => {
		if (totalPrice === 0) {
			const timer = setTimeout(() => {
				Swal.fire({
					title: "El carrito está vacío",
					icon: "warning",
					timer: 2000,
					toast: true,
					showConfirmButton: false,
					didOpen: (toast) => {
						toast.addEventListener('mouseenter', Swal.stopTimer)
						toast.addEventListener('mouseleave', Swal.resumeTimer)
					}
				}).then(() => {
					navigate("/home");
				});
			}, 300);
			return () => clearTimeout(timer);
		}
	}, [totalPrice, navigate]);

	useEffect(() => {
		const calculateTotalPrice = () => {
			let total = 0;
			cart?.forEach((book) => {
				total += book.price * selectedQuantities[book.id];
			});
			setTotalPrice(total);
		};
		calculateTotalPrice();
	}, [cart, selectedQuantities]);

	useEffect(() => {
		const initialQuantities = cart?.reduce((quantities, book) => {
			quantities[book.id] = 1;
			return quantities;
		}, {});
		setSelectedQuantities(initialQuantities);
	}, [cart]);


  const handleQuantityChange = (bookId, value) => {
    setSelectedQuantities((prevQuantities) => {
      const newQuantity = Math.max(1, prevQuantities[bookId] + value);
	  console.log(newQuantity);
      return {
        ...prevQuantities,
        [bookId]: Math.min(newQuantity, cart.find((item) => item.id === bookId).available),
      };
    });
  }
  


	const handleDeleteItem = (itemId) => {
		console.log(itemId);
		dispatch(deleteFromCart(itemId));
		const updatedCart = cart.filter((item) => item.id !== itemId);
		localStorage.setItem("cart", JSON.stringify(updatedCart));
	};
	const itemsMapped = cart.map((item) => ({
		item_id: item.id,
		title: item.name,
		quantity: selectedQuantities[item.id],
		totalAmount: totalPrice,
		price: item.price,
		image: item.image,
		ventaId: "",
	}));
	const handleClick = () => {
		const accessToken = localStorage.getItem("accessToken");
		if (!accessToken) {
			Swal.fire({
				title: "Para comprar un libro debes iniciar sesión",
				icon: "warning",
				timer: 2000,
				toast: true,
				showConfirmButton: false,
				didOpen: (toast) => {
					toast.addEventListener('mouseenter', Swal.stopTimer)
					toast.addEventListener('mouseleave', Swal.resumeTimer)
				}
			});
		} else {
			axios
				.post(
					"/payment",
					{
						products: itemsMapped,
						totalPrice: totalPrice,
						title: "Compra de libros",

					},
					{
						headers: {
							Authorization: `Bearer ${accessToken}`,
						},
					}
				)
				.then((response) => {
					const { preference_id } = response.data;
					localStorage.setItem("compra_id", preference_id);
					return response.data;
				})
				.then((data) => {
					window.location.href = data.url;
				});
		}
	};

	return (
		<div>
		<div className="flex font-secondary pt-[7rem]">
			<div  className='w-1/2 flex justify-end'>
				<div className=" space-y-8 mb-[6rem]">
					{cart?.map((book) => (
						<div key={book.id} className=" text-blanco flex rounded-lg p-3  bg-gris hover:border hover:border-blanco shadow-lg  h-[17rem] w-[35rem] ">
							<div className='w-1/3 flex p-5'>
								<img
									src={book.image}
									alt={book.name}
									className=" w-[8rem] h-[13rem] object-cover"
								/>
							</div>
							<div className='flex flex-col text-xl space-y-3 w-1/3 p-5 '>
								<h1 className="font-primary w-[20rem] h-[3rem]">{book.name.toUpperCase()}</h1>
								<h2 className="w-[20rem] h-[1rem]">Precio: ${book.price}</h2>
								<p className="w-[20rem] h-[1rem]">Género: {book.Gender?.name}</p>
								<p className="w-[20rem] h-[1rem]">Autor: {book.Author?.name}</p>
								<div className='flex items-center justify-center space-x-2 pt-7 '>
									<button
										className="bg-rojo w-[2rem] h-[2rem] rounded-full "
										onClick={() => handleQuantityChange(book.id, -1)}>
										-
									</button>
									<input
										type="number"
										value={selectedQuantities[book.id]}
										min="1"
										readOnly
										className='w-[4rem] h-[2rem] text-black font-primary text-center pl-3 '
									/>
									<button
										className="bg-rojo w-[2rem] h-[2rem] rounded-full "
										onClick={() => handleQuantityChange(book.id, 1)}>
										+
									</button>
								</div>
							</div>
							<div className='w-1/3 flex justify-end '>
									<button className="bg-rojo w-[2rem] h-[2rem] rounded-full font-primary"
										onClick={() => handleDeleteItem(book.id)}>
										X
									</button>
							</div>
						</div>
					))}
				</div>
			</div>
			<div className='w-1/2 flex justify-center h-auto'>
				<div className="bg-white w-[15rem] h-[10rem] items-center flex flex-col p-[1rem] mb-[13rem]">

					<h3>Total:</h3>
					<p className={style.totalPrice}>${totalPrice}</p>
					<button className={style.payButton} onClick={handleClick}>
						{" "}
						PAY!{" "}
					</button>
				</div>
			</div>
		</div>
			<div>
				<Footer/>
			</div>
		</div>
		
	);
};

export default Carrito;

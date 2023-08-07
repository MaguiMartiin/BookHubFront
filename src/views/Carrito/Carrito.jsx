import style from "./Carrito.module.css";
import React from "react";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteFromCart } from "../../redux/actions";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Carrito = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const cart = useSelector((state) => state.cart);

	const [totalPrice, setTotalPrice] = useState(0);
	console.log(totalPrice);
	const [selectedQuantities, setSelectedQuantities] = useState({});

	useEffect(() => {
		if (totalPrice === 0) {
			const timer = setTimeout(() => {
				Swal.fire({
					title: "El carrito está vacío",
					icon: "warning",
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
		image: item.image,
	}));
	const handleClick = () => {
		const accessToken = localStorage.getItem("accessToken");
		if (!accessToken) {
			Swal.fire({
				title: "Para comprar un libro debes iniciar sesión",
				icon: "warning",
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
		<div className="font-secondary">
		<div className={style.cartContainer}>
			<div className={style.cardContainer}>
				{cart?.map((book) => (
					<div key={book.id} style={{ width: '865px'}} className=" text-blanco relative flex rounded-lg p-20 m-16 bg-white hover:border hover:border-blanco bg-gradient-to-r from-violeta to-rojo shadow-lg transform hover:scale-105 transition-transform">
						<div className={style.imageContainer}>
							<img
								src={book.image}
								alt={book.name}
								className={style.bookImage}
							/>
						</div>
						<div className={style.bookInfo}>
							<h1>{book.name.toUpperCase()}</h1>
							<h2>Precio: ${book.price}</h2>
							<p>Disponibles: {book.available}</p>
							<p>Género: {book.Gender?.name}</p>
							<p>Autor: {book.Author?.name}</p>
							<div className={style.deleteButtonContainer}>
								<button
									className={style.deleteButton}
									onClick={() => handleDeleteItem(book.id)}>
									X
								</button>
							</div>
							<div className={style.quantityControls}>
								<button
									className={style.quantityButton}
									onClick={() => handleQuantityChange(book.id, -1)}>
									-
								</button>
								<input
									type="number"
									value={selectedQuantities[book.id]}
									min="1"
									readOnly
									className={style.quantityInput}
								/>
								<button
									className={style.quantityButton}
									onClick={() => handleQuantityChange(book.id, 1)}>
									+
								</button>
							</div>
						</div>
					</div>
				))}
			</div>
			<div className={style.totalPriceContainer}>
				<h3>Total:</h3>
				<p className={style.totalPrice}>${totalPrice}</p>
				<button className={style.payButton} onClick={handleClick}>
					{" "}
					PAY!{" "}
				</button>
			</div>
		</div>
		</div>
	);
};

export default Carrito;

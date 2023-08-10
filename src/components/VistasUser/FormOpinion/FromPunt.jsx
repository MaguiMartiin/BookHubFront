import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import Modal from "./Modal";
import axios from "axios";
import Swal from "sweetalert2";

const FormPunt = ({ id, name, image }) => {
	const token = localStorage.getItem("accessToken");
	const [rating, setRating] = useState(0);
	const [comment, setComment] = useState("");
	const [showModal, setShowModal] = useState(false);
	const [hoverRating, setHoverRating] = useState(0);

	const handleRatingClick = (ratingValue) => {
		// Aquí manejas la acción cuando el usuario hace clic en una estrella
		setRating(ratingValue);
	};

	const handleShowModal = () => {
		setShowModal(true);
	};

	const handleCloseModal = () => {
		setShowModal(false);
	};

	const handleSubmit = async () => {
		if (rating < 1 || rating > 5) {
			console.error("La puntuación debe estar entre 1 y 5");
			return;
		}
		try {
			const puntuación = await axios.post(
				"/punctuation",
				{
					punctuation: rating,
					id: id,
				},
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);
			const comments = await axios.post(
				"/comments",
				{
					comment: comment,
					id: id,
				},
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);
			console.log("Puntuación creada con éxito:", puntuación.data);
			console.log("Comentario creado con éxito:", comments.data);
			handleCloseModal();
			Swal.fire({
				icon: "success",
				title: "Libro creado correctamente",
				confirmButtonText: "Accept",
				timer: 2000,
			});
			window.location.reload();
		} catch (error) {
			console.error("Error al crear la puntuación:", error);
		}
	};

	const handleRatingChange = (value) => {
		setRating(value);
	};

	return (
		<div>
			<div className="flex items-start mt-2 mb-5">
				{[...Array(5)].map((star, index) => {
					const ratingValue = index + 1;
					return (
						<FaStar
							key={index}
							onMouseEnter={() => setHoverRating(ratingValue)}
							onMouseLeave={() => setHoverRating(0)}
							onClick={() => {
								handleShowModal();
								handleRatingClick(ratingValue);
							}} // Cambiar el nombre de la función para el evento onClick
							className={
								ratingValue <= (hoverRating || rating)
									? "text-yellow-500"
									: "text-gray-400"
							}
							size="2rem"
						/>
					);
				})}
			</div>
			{showModal && (
				<Modal onClose={handleCloseModal}>
					<div className="flex items-center justify-center p-2">
						<img src={image} alt="image product" className="w-35 h-36" />
					</div>
					<div className="p-2 ">
						<h1 className="font-primary text-2xl flex items-center justify-center">
							¿Qué te pareció tu producto?{" "}
						</h1>
						<h1 className="text-gris flex items-center justify-center">
							{name}
						</h1>
						<div className="mt-4 flex items-center justify-center">
							{[...Array(5)].map((star, index) => {
								const ratingValue = index + 1;
								return (
									<FaStar
										key={index}
										onMouseEnter={() => setHoverRating(ratingValue)}
										onMouseLeave={() => setHoverRating(0)}
										onClick={() => handleRatingClick(ratingValue)} // Cambiar el nombre de la función para el evento onClick
										className={
											ratingValue <= (hoverRating || rating)
												? "text-yellow-500"
												: "text-gray-400"
										}
										size="2rem"
									/>
								);
							})}
						</div>

						<div>
							<input
								type="text"
								value={comment}
								onChange={(e) => setComment(e.target.value)}
								placeholder="Agrega un comentario"
								style={{
									fontSize: "1rem",
									padding: "10px",
									width: "100%",
									marginTop: "10px",
								}}
							/>
							{comment.trim() === "" && (
								<p className="text-red-500 font-secondary p-2">
									El comentario es obligatorio
								</p>
							)}
						</div>
						<div className="p-2 justify-center items-center flex">
							<button
								onClick={handleSubmit}
								className="bg-gradient-to-r from-violeta to-rojo text-blanco font-primary p-4 rounded-lg">
								Enviar Puntuación
							</button>
						</div>
					</div>
				</Modal>
			)}
		</div>
	);
};

export default FormPunt;
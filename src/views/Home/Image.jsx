import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import image from "../../assets/books.jpg";

const Image = () => {
	const [scrollY, setScrollY] = useState(0);

	// Función para actualizar el valor de scrollY en función del desplazamiento de la página
	const handleScroll = () => {
		setScrollY(window.scrollY);
	};

	// Agrega un event listener al montar el componente para detectar el scroll
	useEffect(() => {
		window.addEventListener("scroll", handleScroll);
		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, []);

	// Ajusta estos valores para controlar la cantidad de desplazamiento y escala en la animación
	const parallaxVariants = {
		hidden: { scale: 1, y: 0 },
		visible: {
			scale: 1.1,
			y: -scrollY * 0.3,
			transition: { type: "spring", stiffness: 50, damping: 10 },
		},
	};

	return (
		<div className="parallax-container h-80 overflow-hidden -z-50 ">
			<motion.div
				className="parallax-image"
				variants={parallaxVariants}
				initial="hidden"
				animate="visible">
				<img src={image} alt="" />
			</motion.div>
		</div>
	);
};

export default Image;

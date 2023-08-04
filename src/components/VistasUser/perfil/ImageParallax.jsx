import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import image from "../../../assets/profile/fondo1.jpg";

const Image = () => {
	const parallaxVariants = {
		hidden: { scale: 1, y: 0 },
		visible: {
			scale: 1.1,
			y: -scrollY * 0.3,
			transition: { type: "spring", stiffness: 50, damping: 10 },
		},
	};

	return (
		<div className="parallax-container h-96 overflow-hidden -z-50 ">
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

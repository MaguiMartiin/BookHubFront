import React from 'react';
import { Link } from 'react-router-dom';
import style from './Card.module.css';

const Card = ({ book }) => {
	return (
		<>
			<Link to={`/home/${book.id}`} className="inline-block h-full w-full ">
				<div className="flex h-full w-full items-center justify-center overflow-hidden rounded-lg bg-gris border border-transparent hover:border-blanco duration-300">
					<div className="flex justify-center flex-col aspect-square transition-opacity animate-fadeIn p-4 text-center space-y-4">
						<img
							src={book?.image}
							className="h-[300px] w-full object-contain transition duration-300 ease-in-out hover:scale-105"
							alt={book?.name}
						/>
						<div className="flex flex-col justify-center items-center space-y-4 ">
							<div>
								<p className="text-md overflow-hidden my-2 text-blanco font-bold uppercase">
									{book?.name}
								</p>
							</div>
							<div className="flex w-[150px] justify-between items-center rounded-full border bg-white/70 p-1 text-[10px] font-bold text-black backdrop-blur-md @[275px]/label:text-xs dark:border-neutral-800 dark:bg-black/70 dark:text-white">
								<p className="mr-4 inline pl-2 leading-none font-bold tracking-tight">
									{book.Gender?.name}
								</p>
								<p className="flex-none rounded-full  bg-gradient-to-r from-violeta to-rojo transition p-2 text-white">
									${book?.price}
								</p>
							</div>
						</div>
					</div>
				</div>
			</Link>
		</>
	);
};

export default Card;

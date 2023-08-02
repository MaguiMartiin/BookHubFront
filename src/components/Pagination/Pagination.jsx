import React from 'react';
import style from './Pagination.module.css'

const Pagination = ({max, page, setPage}) => {

  console.log(page, max, setPage);

    const handlePrevPage = () => {
        if(page < 2) return;
        setPage(page - 1)
    }
    
    const handleNextPage = () => {
        setPage(page + 1)
    }
    console.log(page);

    return (
			<div className="flex items-center justify-center my-4">
				<button
					onClick={handlePrevPage}
					disabled={page === 1}
					className="mr-2 px-3 py-2 border rounded text-gray-600 bg-blanco border-gray-300 hover:bg-turquesa focus:outline-none focus:ring focus:border-blue-300 disabled:opacity-50">
					🡸
				</button>
				<div className="px-3 py-2 text-blanco">
					<span>{page}</span>
				</div>
				<button
					onClick={handleNextPage}
					disabled={page >= max}
					className="ml-2 px-3 py-2 border rounded text-gray-600 bg-blanco border-gray-300 hover:bg-turquesa focus:outline-none focus:ring focus:border-blue-300 disabled:opacity-50">
					🡺
				</button>
			</div>
		);
}


export default Pagination
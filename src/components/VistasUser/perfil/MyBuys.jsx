import React from "react";

const MyBuys = ({ buys }) => {
    console.log(buys);
	return (<div className="flex justify-center flex-col items-center">
        <h1 className="text-4xl font-bold">Mis compras</h1>
        <h1 className="text-[5rem] font-bold">
            {buys.length}
        </h1>
    </div>);
};

export default MyBuys;

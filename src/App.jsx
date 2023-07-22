import "./App.css";
import Landing from "./views/Landing";
import { Route, Routes } from "react-router-dom";
import React from "react";
import NavBar from "./components/NavBar";
import Home from "./views/Home/Home";
import Form from "./views/Form/FormCreate";
import { useLocation } from "react-router-dom";
function App() {
	const location = useLocation();
	return (
		<div>
			{location.pathname !== "/" && <NavBar />}
			<Routes>
				<Route exact path="/" element={<Landing />} />
				<Route path="/home" element={<Home />} />
				<Route path="/form" element={<Form />} />
			</Routes>
		</div>
	);
}

export default App;

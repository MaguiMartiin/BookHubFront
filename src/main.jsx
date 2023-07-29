import React from "react";
import ReactDOM from "react-dom";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store.js";
import "./index.css";
import axios from "axios";

axios.defaults.baseURL = "https://servidor-libreria.onrender.com";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
	<React.StrictMode>
		<Provider store={store}>
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</Provider>
	</React.StrictMode>
);

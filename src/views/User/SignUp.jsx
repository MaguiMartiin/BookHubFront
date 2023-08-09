import React, { useState } from "react";
import SignUpForm1 from "../../components/user/SignUpForm1";
import SignUpForm2 from "../../components/user/SignUpForm2";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setSignUpStep as setSignUpStepAction } from "../../redux/userAction";
import axios from "axios";

const SignUp = () => {
	const dispatch = useDispatch();
	const signUpStep = useSelector((state) => state.signUpStep);

	const setSignUpStep = (step) => {
		dispatch(setSignUpStepAction(step));
	};

	const [userData, setUserData] = useState({
		email: "",
		passwordKey: "",
	});

	const setFormData1 = ({ email, passwordKey }) => {
		setUserData({
			...userData,
			email,
			passwordKey,
		});
		setSignUpStep(2); // Cambiar al segundo paso (SignUpForm2)
	};

	const handelGo = async () => {
		try {
		  const res = await axios.get("/auth/google");
		  // Redireccionar al usuario a la URL de autenticación de Google
		  window.location.href = res.data.authUrl;
		} catch (error) {
		  console.error("Error al obtener la URL de autenticación de Google:", error);
		}
	}; 

	return (
		<div className="w-full h-screen flex flex-col justify-center items-center">
			<div className="flex flex-col w-96 py-8 px-4 bg-blanco dark:bg-blanco rounded-xl border border-secondaryBorderLight dark:border-secondaryBorder ">
				{/* Forms */}
				{signUpStep === 1 && <SignUpForm1 callBack={setFormData1} />}
				{signUpStep === 2 && <SignUpForm2 userData={userData} />}

				{/* Divider */}
				<div className="my-4 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
					<p className="mx-4 mb-0 text-center font-semibold dark:text-text">
						OR
					</p>
				</div>
				<div className="flex justify-center">
					<button onClick={handelGo}>Registrate con Google</button>
				</div>

				<div className="flex flex-col mt-8">
					<div className="text-center flex-row my-1">
						Ya tenes una cuenta?{" "}
						<Link className="text-negro font-semibold" to="/login">
							Inicia sesión.
						</Link>
					</div>
					<div className="text-center flex-row my-">
						Volver al{" "}
						<Link className="text-negro font-semibold" to="/home">
							home.
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
};

export default SignUp;

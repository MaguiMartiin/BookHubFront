import React, { useState } from "react";
import SignUpForm1 from "../../components/user/SignUpForm1";
import SignUpForm2 from "../../components/user/SignUpForm2";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setSignUpStep as setSignUpStepAction } from "../../redux/userAction";

const SignUp = () => {
	const dispatch = useDispatch();
	const signUpStep = useSelector((state) => state.signUpStep);

	const setSignUpStep = (step) => {
		dispatch(setSignUpStepAction(step));
	};

	const [userData, setUserData] = useState({
		email: "",
		password: "",
	});

	const setFormData1 = ({ email, password }) => {
		setUserData({
			...userData,
			email,
			password,
		});
		setSignUpStep(2); // Cambiar al segundo paso (SignUpForm2)
	};

	return (
		<div className="w-full h-screen flex flex-col justify-center items-center">
			<div className="flex flex-col w-96 py-8 px-4 bg-secondaryLight dark:bg-secondary rounded-xl border border-secondaryBorderLight dark:border-secondaryBorder">
				{/* Forms */}
				{signUpStep === 1 && <SignUpForm1 callBack={setFormData1} />}
				{signUpStep === 2 && <SignUpForm2 userData={userData} />}

				{/* Divider */}
				<div className="my-4 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
					<p className="mx-4 mb-0 text-center font-semibold dark:text-text">
						OR
					</p>
				</div>
				<div className="flex justify-center">Registrarte con google</div>

				<div className="flex flex-col mt-8">
					<div className="text-center flex-row my-1">
						Ya tenes una cuenta?{" "}
						<Link className="text-primary" to="/login">
							Inicia sesión.
						</Link>
					</div>
					<div className="text-center flex-row my-">
						Volver al{" "}
						<Link className="text-primary" to="/">
							home.
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
};

export default SignUp;

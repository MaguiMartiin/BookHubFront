import React from "react";
import { Formik, Form, ErrorMessage, Field } from "formik";

const Login = () => {
	return (
		<div className="flex flex-col h-screen justify-center items-center">
			<Formik
				initialValues={{
					email: "",
					password: "",
				}}
				onSubmit={(values) => {
					console.log(values);
				}}
				validate={(values) => {
					const errors = {};
					 if (!values.email) {
							errors.email = "Se requiere un email";
						} else if (
							!/^[\w-]+(\.[\w-]+)*@([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/.test(
								values.email
							)
						) {
							errors.email = "Invalid email format";
						}
					 if (!values.password) {
							errors.password = "Required";
						} else if (values.password.length < 8) {
							errors.password = "Password must be at least 8 characters long.";
						} else if (
							!/(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]/.test(
								values.password
							)
						) {
							errors.password =
								"Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character.";
						}

					return errors;
				}}>
		
				{({ errors }) => (
					<Form className="flex flex-col">
						<div className="mb-5">
							<h1 className="text-3xl">Login</h1>
						</div>
						<div className="mb-5">
							<label htmlFor="email">Email</label>
							<Field type="email" name="email" className="border p-1" />
							<ErrorMessage
								name="email"
								component={() => (
									<p className="text-red-500 text-xs italic">{errors.email}</p>
								)}
							/>
						</div>
						<div className="mb-5">
							<label htmlFor="password">Password</label>
							<Field type="password" name="password" className="border p-1" />
							<ErrorMessage
								name="password"
								component={() => (
									<p className="text-red-500 text-xs italic">
										{errors.password}
									</p>
								)}
							/>
						</div>
						<button
							type="submit"
							className="bg-primary text-white px-4 py-2 rounded hover:bg-red-400">
							Submit
						</button>
					</Form>
				)}
			</Formik>
		</div>
	);
};

export default Login;

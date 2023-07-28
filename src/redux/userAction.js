import { USERS_SIGN_UP_STEP_SET } from "./action-types";

export const setSignUpStep = (step) => {
	return {
		type: USERS_SIGN_UP_STEP_SET,
		payload: step,
	};
};

export const signIn = ({email, password}) => {
  return async (dispatch) => {
	try {
	  const response = await axios.post("/login", {
		email: email,
		password: password,
	  });

	  console.log(response);

	} catch (error) {
	  console.log(error);
	}
  }
}



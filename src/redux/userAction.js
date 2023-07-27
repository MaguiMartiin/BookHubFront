import { USERS_SIGN_UP_STEP_SET } from "./action-types";

export const setSignUpStep = (step) => {
	return {
		type: USERS_SIGN_UP_STEP_SET,
		payload: step,
	};
};



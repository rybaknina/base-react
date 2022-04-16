import { CHECK_ME, TOGGLE_NAME } from "./actions";

const initialState = {
	showName: false,
	name: "John Doe",
	checkMe: false,
};
const profileReducer = (state = initialState, action) => {
	switch (action.type) {
		case TOGGLE_NAME: {
			return {
				...state,
				showName: !state.showName,
			};
		}
		case CHECK_ME: {
			return {
				...state,
				checkMe: !state.checkMe,
			};
		}
		default:
			return state;
	}
};
export default profileReducer;

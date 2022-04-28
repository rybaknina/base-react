import { CHECK_ME, TOGGLE_NAME, UPDATE_NAME } from "./actions";
import { AUTHOR } from "../../constants/common";

const initialState = {
	showName: true,
	name: AUTHOR.me,
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
		case UPDATE_NAME: {
			console.log(action.userId);
			return {
				...state,
				name: action.name,
			};
		}
		default:
			return state;
	}
};
export default profileReducer;

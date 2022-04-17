import { ADD_MESSAGE } from "./actions";
import _uniqueId from "lodash/uniqueId";

const initialState = {
	messageList: {},
};

const messagesReducer = (state = initialState, action) => {
	switch (action.type) {
		case ADD_MESSAGE: {
			const { chatId, message } = action.payload;
			const oldMessages = state.messageList[chatId] || [];
			return {
				...state,
				messageList: {
					...state.messageList,
					[chatId]: [
						...oldMessages,
						{
							...message,
							id: _uniqueId("msg_"),
						},
					],
				},
			};
		}
		default:
			return state;
	}
};

export default messagesReducer;

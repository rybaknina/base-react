import { AUTHOR, TIME_IN_SECONDS } from "../../constants/common";
import _uniqueId from "lodash/uniqueId";

export const ADD_MESSAGE = "MESSAGES::ADD_MESSAGE";
export const ADD_MESSAGE_WITH_SAGA = "MESSAGES::ADD_MESSAGE_WITH_SAGA";

export const addMessage = (chatId, message) => ({
	type: ADD_MESSAGE,
	payload: { chatId, message },
});

export const addMessageWithSaga = (chatId, message) => ({
	type: ADD_MESSAGE_WITH_SAGA,
	payload: { chatId, message },
});

export const addMessageWithThunk = (chatId, message) => (dispatch) => {
	dispatch(addMessage(chatId, message));

	if (message.author !== AUTHOR.bot) {
		const botMessage = {
			id: _uniqueId("bot_"),
			text: "Hello, friend! I'm from thunk",
			author: AUTHOR.bot,
		};
		setTimeout(() => {
			dispatch(addMessage(chatId, botMessage));
		}, TIME_IN_SECONDS);
	}
};

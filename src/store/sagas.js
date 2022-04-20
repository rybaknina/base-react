import { delay, put, takeLatest } from "redux-saga/effects";
import { ADD_MESSAGE_WITH_SAGA, addMessage } from "./messages/actions";
import { AUTHOR, TIME_IN_SECONDS } from "../constants/common";
import _uniqueId from "lodash/uniqueId";

function* onAddMessageWithSaga(action) {
	yield put(addMessage(action.payload.chatId, action.payload.message));
	if (action.payload.message.author !== AUTHOR.bot) {
		const botMessage = {
			id: _uniqueId("bot_"),
			text: "Hello, friend! I'm from saga",
			author: AUTHOR.bot,
		};
		yield delay(TIME_IN_SECONDS);
		yield put(addMessage(action.payload.chatId, botMessage));
	}
}

function* chatSaga() {
	yield takeLatest(ADD_MESSAGE_WITH_SAGA, onAddMessageWithSaga);
}

export default chatSaga;

import { ADD_CHAT, DEL_CHAT } from "./actions";
import _uniqueId from "lodash/uniqueId";

const initialState = {
	chatList: [],
};

const chatsReducer = (state = initialState, action) => {
	switch (action.type) {
		case ADD_CHAT: {
			const newChat = {
				id: _uniqueId("chat_"),
				name: action.payload,
			};
			return {
				...state,
				chatList: [...state.chatList, newChat],
			};
		}
		case DEL_CHAT: {
			return {
				...state,
				chatList: [...state.chatList.filter((chat) => chat.id !== action.payload)],
			};
		}
		default:
			return state;
	}
};

export default chatsReducer;

export const ADD_CHAT = "CHATS::ADD_CHAT";
export const DEL_CHAT = "CHATS::DEL_CHAT";
export const UPDATE_CHATS = "CHATS::UPDATE_CHATS";

export const addChat = (name) => ({
	type: ADD_CHAT,
	payload: name,
});

export const deleteChat = (chatId) => ({
	type: DEL_CHAT,
	payload: chatId,
});

export const chatListUpdate = (chats) => ({
	type: UPDATE_CHATS,
	chats,
});

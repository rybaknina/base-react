import { ADD_MESSAGE, addMessage, updateMessages } from "../store/messages/actions";
import { AUTHOR, TIME_IN_SECONDS } from "../constants/common";
import _uniqueId from "lodash/uniqueId";
import { getDatabase, onValue, push, ref, remove, set } from "firebase/database";
import firebaseConfig from "../services/firebaseConfig";
import { chatListUpdate } from "../store/chats/actions";
import { updateName } from "../store/profile/actions";

const middleware = (store) => (next) => (action) => {
	if (action.type === ADD_MESSAGE && action.payload.message.author !== AUTHOR.bot) {
		const newMessage = {
			id: _uniqueId("msg_"),
			author: AUTHOR.bot,
			text: "Hello, I'm from middleware",
		};
		setTimeout(() => {
			store.dispatch(addMessage(action.payload.chatId, newMessage));
		}, TIME_IN_SECONDS);
	}
	return next(action);
};

export const initTrackerWithFB = () => async (dispatch) => {
	const db = getDatabase(firebaseConfig);
	const chatRef = ref(db, "/chats");
	onValue(chatRef, (snapshot) => {
		const data = snapshot.val();
		const chatIds = data && Object.keys(data);
		if (chatIds?.length > 0) {
			const chatArr = chatIds.map((item) => ({ id: item, name: data[item].name }));
			dispatch(chatListUpdate(chatArr));
		}
	});
};

export const addChatWithFb = (name) => async () => {
	const db = getDatabase(firebaseConfig);
	const chatRef = ref(db, "/chats");
	const newChatRef = push(chatRef);
	set(newChatRef, { name }).then((res) => {
		console.log("chat added", res);
	});
};

export const deleteChatWithFb = (id) => async () => {
	const db = getDatabase(firebaseConfig);
	const chatRef = ref(db, `/chats/${id}`);
	const messageRef = ref(db, `/messages/${id}`);
	remove(messageRef).then((res) => {
		console.log("messages removed", res);
	});
	remove(chatRef).then((res) => {
		console.log("chat removed", res);
	});
};

export const addMessageWithFb = (chatId, message) => async () => {
	const db = getDatabase(firebaseConfig);
	const messageRef = ref(db, `/messages/${chatId}`);
	const newMessageRef = push(messageRef);
	set(newMessageRef, message).then((res) => {
		console.log("messages added", res);
	});
};

export const getMessagesByChatIdWithFB = (chatId) => async (dispatch) => {
	const db = getDatabase(firebaseConfig);
	const messageRef = ref(db, `/messages/${chatId}`);

	onValue(messageRef, (snapshot) => {
		const data = snapshot.val();
		const messages = data && Object.values(data);
		if (messages?.length > 0) {
			dispatch(updateMessages(chatId, messages));
		}
	});
};

export const updateNameWithFb = (userId, name) => async () => {
	const db = getDatabase(firebaseConfig);
	const profileRef = ref(db, `/profile/${userId}`);
	// can be update if just some attributes need to update
	set(profileRef, { name }).then((res) => {
		console.log("set profile", res);
	});
};

export const getProfileNameWithFB = (userId) => async (dispatch) => {
	const db = getDatabase(firebaseConfig);
	const profileRef = ref(db, `/profile/${userId}`);

	onValue(profileRef, (snapshot) => {
		const data = snapshot.val();
		const profileName = data && data.name;
		if (profileName) {
			dispatch(updateName(userId, profileName));
		}
	});
};

export default middleware;

import { ADD_CHAT, DEL_CHAT, UPDATE_CHATS } from "../store/chats/actions";
import chatsReducer from "../store/chats/reducer";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import Chats from "../pages/Chats";

describe("chats tests", () => {
	describe("chat reducer test", () => {
		it("return state with chatList after addChat action", () => {
			const expected = {
				chatList: [
					{
						id: "chat_1",
						name: "name",
					},
				],
			};
			const received = chatsReducer({ chatList: [] }, { type: ADD_CHAT, payload: "name" });
			expect(received).toEqual(expected);
		});

		it("return state with empty chatList after delChat action", () => {
			const expected = {
				chatList: [],
			};
			const received = chatsReducer(
				{ chatList: [{ id: "chat_1", name: "name" }] },
				{ type: DEL_CHAT, payload: "chat_1" },
			);
			expect(received).toEqual(expected);
		});

		it("return state with updated chatList after updateChat action", () => {
			const chats = [
				{
					id: "chat_1",
					name: "name_1",
				},
				{
					id: "chat_2",
					name: "name_2",
				},
			];
			const expected = {
				chatList: chats,
			};
			const received = chatsReducer({ chatList: [] }, { type: UPDATE_CHATS, chats });
			expect(received).toEqual(expected);
		});
	});

	describe("snapshot chats component", () => {
		const initialState = {
			chats: { chatList: [{ id: "chat_1", name: "chat_1" }] },
			messages: { messageList: [{ id: "123", name: "name" }] },
			profile: {
				name: "testName",
			},
		};
		const mockStore = configureStore();
		it("snapshot test", () => {
			let store = mockStore(initialState);
			const component = render(
				<Provider store={store}>
					<Chats />
				</Provider>,
				{ wrapper: MemoryRouter },
			);
			expect(component).toMatchSnapshot();
		});
	});
});

import {applyMiddleware, combineReducers, createStore} from "redux";
import {persistReducer, persistStore} from "redux-persist";
import storage from "redux-persist/lib/storage";
// import thunk from "redux-thunk";
import createSagaMiddleware from "redux-saga";

import profileReducer from "./profile/reducer";
import chatsReducer from "./chats/reducer";
import messagesReducer from "./messages/reducer";
import chatSaga from "./sagas";

// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSIOM_COMPOSE__ || compose;
const sagaMiddleware = createSagaMiddleware();

const persistConfig = {
	key: "root",
	storage,
};

const reducers = combineReducers({
	profile: profileReducer,
	chats: chatsReducer,
	messages: messagesReducer,
});

const persistedReducer = persistReducer(persistConfig, reducers);
// export const store = createStore(persistedReducer, composeEnhancers(applyMiddleware(thunk)));
export const store = createStore(persistedReducer, applyMiddleware(sagaMiddleware));

const persistor = persistStore(store);

export default persistor;

sagaMiddleware.run(chatSaga);

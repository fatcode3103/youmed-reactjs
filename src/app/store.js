import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { createBrowserHistory } from "history";
import { connectRouter } from "connected-react-router";

import userReducer from "../features/user/userSlice";

const history = createBrowserHistory(); // thao tac voi lich su trinh duyet

const persistConfig = {
    key: "root",
    storage,
    // blacklist: []
};

const rootReducer = combineReducers({
    router: connectRouter(history), // ket noi history voi reducer
    user: userReducer,
}); /// cau hinh vao 1 reducer

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
});

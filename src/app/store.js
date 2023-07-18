import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import userReducer from "../features/user/userSlice";

const persistConfig = {
    key: "root",
    storage,
    blacklist: ["user.loginErrorMessage"],
};

const rootReducer = combineReducers({
    user: userReducer,
}); /// cau hinh vao 1 reducer

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
});

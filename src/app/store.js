import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import userReducer from "../features/user/userSlice";
import adminReducer from "../features/admin/adminslice";

const persistConfig = {
    key: "root",
    storage,
    blacklist: ["user.loginErrorMessage", "admin"],
};

const rootReducer = combineReducers({
    user: userReducer,
    admin: adminReducer,
}); /// cau hinh vao 1 reducer

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
});

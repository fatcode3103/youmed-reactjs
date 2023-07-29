import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import userReducer from "../features/user/userSlice";
import adminReducer from "../features/admin/adminslice";

const userPersistConfig = {
    key: "user",
    storage,
    whitelist: ["currentUser", "language", "isLogin"],
};

const rootReducer = combineReducers({
    user: persistReducer(userPersistConfig, userReducer),
    admin: adminReducer,
}); /// cau hinh vao 1 reducer

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            immutableCheck: false,
            serializableCheck: false,
        }),
});

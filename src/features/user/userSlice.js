import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLogin: false,
    loginErrorMessage: "",
    currentUser: {},
    isLoading: false,
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        //login
        loginStart: (state, action) => {
            state.isLoading = true;
        },
        loginSuccess: (state, action) => {
            state.isLogin = true;
            state.isLoading = false;
            state.currentUser = action.payload.data;
            state.loginErrorMessage = action.payload.message;
        },
        loginFailed: (state, action) => {
            state.isLogin = false;
            state.isLoading = false;
            state.loginErrorMessage = action.payload.message;
        },
        //logout
        logoutStart: (state, action) => {
            state.isLoading = true;
        },
        logoutSuccess: (state, action) => {
            state.isLogin = false;
            state.isLoading = false;
            state.currentUser = [];
        },
        logoutFailed: (state, action) => {
            state.isLogin = false;
            state.isLoading = false;
        },
    },
});

export const {
    loginStart,
    loginSuccess,
    loginFailed,
    logoutStart,
    logoutSuccess,
    logoutFailed,
} = userSlice.actions;

export default userSlice.reducer;

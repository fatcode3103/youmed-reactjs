import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoading: false,
    allUser: [],
    gender: [],
    role: [],
    position: [],
    userById: {},
};

export const adminSlice = createSlice({
    name: "admin",
    initialState,
    reducers: {
        //al user
        getAllUserStart: (state, action) => {
            state.isLoading = true;
        },
        getAllUserSuccess: (state, action) => {
            state.isLoading = false;
            state.allUser = action.payload;
        },
        getAllUserFailed: (state, action) => {
            state.isLoading = false;
        },
        //get allcode
        getAllCodeStart: (state, action) => {
            state.isLoading = true;
        },
        getAllCodeSuccess: (state, action) => {
            const type = action.payload.type.toLowerCase();
            state.isLoading = false;
            state[type] = action.payload.data;
        },
        getAllCodeFailed: (state, action) => {
            state.isLoading = false;
        },
        //create user
        postUserStart: (state, action) => {
            state.isLoading = true;
        },
        postUserSuccess: (state, action) => {
            state.isLoading = false;
        },
        postUserFailed: (state, action) => {
            state.isLoading = false;
        },
        //delete user
        deleteUserStart: (state, action) => {
            state.isLoading = true;
        },
        deleteUserSuccess: (state, action) => {
            state.isLoading = false;
        },
        deleteUserFailed: (state, action) => {
            state.isLoading = false;
        },
        //get user by id
        getUserByIdStart: (state, action) => {
            state.isLoading = true;
        },
        getUserByIdSuccess: (state, action) => {
            state.isLoading = false;
            state.userById = action.payload;
        },
        getUserByIdFailed: (state, action) => {
            state.isLoading = false;
        },
        //edit user
        editUserStart: (state, action) => {
            state.isLoading = true;
        },
        editUserSuccess: (state, action) => {
            state.isLoading = false;
        },
        editUserFailed: (state, action) => {
            state.isLoading = false;
        },
    },
});

export const {
    getAllUserStart,
    getAllUserSuccess,
    getAllUserFailed,
    getAllCodeStart,
    getAllCodeSuccess,
    getAllCodeFailed,
    postUserStart,
    postUserSuccess,
    postUserFailed,
    deleteUserStart,
    deleteUserSuccess,
    deleteUserFailed,
    getUserByIdStart,
    getUserByIdSuccess,
    getUserByIdFailed,
    editUserStart,
    editUserSuccess,
    editUserFailed,
} = adminSlice.actions;

export default adminSlice.reducer;

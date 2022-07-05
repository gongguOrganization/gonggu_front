import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Users } from "../Login/Users";

/*  import {  loginApi, postUser } from "./usersApi.js";*/
const initialState = {
    users: Users,
    myId: localStorage.getItem("id"),
    isLogin: localStorage.getItem("id") === undefined ? true : false,
    me: {},
};

const LOGIN = "LOGIN";
const INSERT_USER = "INSERT_USER";

export const login = createAsyncThunk(LOGIN, async (user, thunkAPI) => {
/*      const { users } = thunkAPI.getState().users;
    const isLogin = await loginApi(users, user);
    return isLogin;  */
});
export const insertUser = createAsyncThunk(INSERT_USER, async (user, thunkAPI) => {
    const { users } = thunkAPI.getState().users;
    //await postUser(users, user);
    // return newUser;
});

export const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(login.fulfilled, (state, { payload }) => {
                if (payload.isLogin) {
                    localStorage.setItem("id", payload.user.id);
                    localStorage.setItem("token", payload.token);
                    return {
                        ...state,
                        isLogin: payload.login, //
                        me: payload.user,
                        myId: payload.user.id,
                    };
                } else {
                    return { ...state, isLogin: false };
                }
            })
            .addCase(insertUser.fulfilled, (state, { payload }) => {
                return { ...state, users: payload };
            })
            
    },
});

export default usersSlice.reducer;

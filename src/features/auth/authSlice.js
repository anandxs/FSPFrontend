import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	id: null,
	name: null,
	accessToken: null,
	refreshToken: null,
};

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		setCredentials: (state, action) => {
			const { id, name, accessToken, refreshToken } = action.payload;
			state.id = id;
			state.name = name;
			state.accessToken = accessToken;
			state.refreshToken = refreshToken;
		},
		logOut: (state, action) => {
			state.id = null;
			state.name = null;
			state.accessToken = null;
			state.refreshToken = null;
		},
	},
});

export default authSlice.reducer;

export const { setCredentials, logOut } = authSlice.actions;

export const selectCurrentUser = (state) => state.auth;

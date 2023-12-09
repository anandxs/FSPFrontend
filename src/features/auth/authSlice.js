import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	id: null,
	name: null,
	role: null,
	accessToken: null,
	refreshToken: null,
};

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		setCredentials: (state, action) => {
			const { firstName, lastName, role } = action.payload;
			state.name = `${firstName} ${lastName}`;
			state.role = role;
		},
		logIn: (state, action) => {
			const { email, accessToken, refreshToken } = action.payload;
			state.email = email;
			state.accessToken = accessToken;
			state.refreshToken = refreshToken;
		},
		logOut: (state) => {
			state.id = null;
			state.name = null;
			state.email = null;
			state.accessToken = null;
			state.refreshToken = null;
		},
	},
});

export default authSlice.reducer;
export const { setCredentials, logOut, logIn } = authSlice.actions;
export const selectCurrentUser = (state) => state.auth;

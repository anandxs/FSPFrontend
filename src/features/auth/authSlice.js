import { createSlice } from "@reduxjs/toolkit";

const localAuth = localStorage.getItem("auth");
const initialState = localAuth
	? JSON.parse(localAuth)
	: {
			id: null,
			name: null,
			role: null,
			email: null,
			accessToken: null,
			refreshToken: null,
	  };

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		logIn: (state, action) => {
			const {
				id,
				firstName,
				lastName,
				role,
				email,
				accessToken,
				refreshToken,
			} = action.payload;
			state.id = id;
			state.name = `${firstName} ${lastName}`;
			state.role = role;
			state.email = email;
			state.accessToken = accessToken;
			state.refreshToken = refreshToken;
			localStorage.setItem("auth", JSON.stringify(state));
		},
		logOut: (state) => {
			state.id = null;
			state.name = null;
			state.email = null;
			state.accessToken = null;
			state.refreshToken = null;
			localStorage.removeItem("auth");
		},
	},
});

export default authSlice.reducer;
export const { setCredentials, logOut, logIn } = authSlice.actions;
export const selectCurrentUser = (state) => state.auth;

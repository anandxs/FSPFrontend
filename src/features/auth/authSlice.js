import { createSlice } from "@reduxjs/toolkit";

const initialState =
	localStorage.getItem("auth") !== null
		? JSON.parse(localStorage.getItem("auth"))
		: {
				id: null,
				name: null,
				email: null,
				accessToken: null,
				refreshToken: null,
		  };

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		setCredentials: (state, action) => {
			const { id, name } = action.payload;
			state.id = id;
			state.name = name;
			localStorage.setItem(
				"auth",
				JSON.stringify({
					id,
					name,
					email: state.email,
					accessToken: state.accessToken,
					refreshToken: state.refreshToken,
				})
			);
		},
		logIn: (state, action) => {
			const { email, accessToken, refreshToken } = action.payload;
			state.email = email;
			state.accessToken = accessToken;
			state.refreshToken = refreshToken;
			localStorage.setItem("auth", JSON.stringify(action.payload));
		},
		logOut: (state, action) => {
			state.id = null;
			state.name = null;
			state.email = null;
			state.accessToken = null;
			state.refreshToken = null;
			localStorage.clear();
		},
	},
});

export default authSlice.reducer;

export const { setCredentials, logOut, logIn } = authSlice.actions;

export const selectCurrentUser = (state) => state.auth;

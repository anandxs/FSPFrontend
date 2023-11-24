import { createSlice } from "@reduxjs/toolkit";

const initialState =
	sessionStorage.getItem("auth") !== null
		? JSON.parse(sessionStorage.getItem("auth"))
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
			const { id, name, email } = action.payload;
			state.id = id;
			state.name = name;
			state.email = email;
			sessionStorage.removeItem("auth");
			sessionStorage.setItem(
				"auth",
				JSON.stringify({
					id,
					name,
					email,
					accessToken: state.accessToken,
					refreshToken: state.refreshToken,
				})
			);
		},
		logIn: (state, action) => {
			const { accessToken, refreshToken } = action.payload;
			state.accessToken = accessToken;
			state.refreshToken = refreshToken;
			sessionStorage.setItem("auth", JSON.stringify(action.payload));
		},
		logOut: (state, action) => {
			state.id = null;
			state.name = null;
			state.accessToken = null;
			state.refreshToken = null;
			sessionStorage.clear();
		},
	},
});

export default authSlice.reducer;

export const { setCredentials, logOut, logIn } = authSlice.actions;

export const selectCurrentUser = (state) => state.auth;

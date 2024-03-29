import { createSlice } from "@reduxjs/toolkit";
import { getColor } from "../../utils/colors";

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
			color: null,
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
			state.color = getColor();
			localStorage.setItem("auth", JSON.stringify(state));
		},
		logOut: (state) => {
			state.id = null;
			state.name = null;
			state.email = null;
			state.role = null;
			state.accessToken = null;
			state.refreshToken = null;
			state.color = null;
			localStorage.removeItem("auth");
		},
		updateName: (state, action) => {
			const { firstName, lastName } = action.payload;
			state.name = `${firstName} ${lastName}`;
			localStorage.setItem("auth", JSON.stringify(state));
		},
		updateToken: (state, action) => {
			const { accessToken, refreshToken } = action.payload;
			state.accessToken = accessToken;
			state.refreshToken = refreshToken;
			localStorage.setItem("auth", JSON.stringify(state));
		},
	},
});

export default authSlice.reducer;
export const { logIn, logOut, updateName, updateToken } = authSlice.actions;
export const selectCurrentUser = (state) => state.auth;

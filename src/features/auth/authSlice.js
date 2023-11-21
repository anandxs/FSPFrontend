import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	id: null,
	name: null,
	token: null,
};

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		setCredentials: (state, action) => {
			const { id, name, token } = action.payload;
			state.id = id;
			state.name = name;
			state.token = token;
		},
		logOut: (state, action) => {
			state.id = null;
			state.name = null;
			state.token = null;
		},
	},
});

export default authSlice.reducer;

export const { setCredentials, logOut } = authSlice.actions;

export const selectCurrentUser = (state) => state.auth;

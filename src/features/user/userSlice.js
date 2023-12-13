import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	projectId: null,
	ownerId: null,
	role: null,
};

const userSlice = createSlice({
	name: "userRole",
	initialState,
	reducers: {
		setRole: (state, action) => {
			const { projectId, role, ownerId } = action.payload;
			state.projectId = projectId;
			state.role = role;
			state.ownerId = ownerId;
		},
		clearRole: (state) => {
			state.projectId = null;
			state.role = null;
			state.ownerId = null;
		},
	},
});

export default userSlice.reducer;
export const { setRole, clearRole } = userSlice.actions;
export const selectCurrentProjectRole = (state) => state.userRole;

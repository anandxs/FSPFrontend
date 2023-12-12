import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	projectId: null,
	role: null,
};

const userSlice = createSlice({
	name: "userRole",
	initialState,
	reducers: {
		setRole: (state, action) => {
			const { projectId, role } = action.payload;
			(state.projectId = projectId), (state.role = role);
		},
		clearRole: (state) => {
			state.projectId = null;
			state.role = null;
		},
	},
});

export default userSlice.reducer;
export const { setRole, clearRole } = userSlice.actions;
export const selectCurrentProjectRole = (state) => state.userRole;

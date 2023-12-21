import { createSlice } from "@reduxjs/toolkit";

const initialState = localStorage.getItem("projectrole")
	? JSON.parse(localStorage.getItem("projectrole"))
	: {
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
			localStorage.setItem(
				"projectrole",
				JSON.stringify({ projectId, role, ownerId })
			);
		},
		clearRole: (state) => {
			state.projectId = null;
			state.role = null;
			state.ownerId = null;
			localStorage.removeItem("projectrole");
		},
	},
});

export default userSlice.reducer;
export const { setRole, clearRole } = userSlice.actions;
export const selectCurrentProjectRole = (state) => state.userRole;

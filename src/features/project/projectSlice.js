import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	projectId: null,
	name: null,
	createdAt: null,
	isActive: null,
	ownerId: null,
};

const projectSlice = createSlice({
	name: "project",
	initialState,
	reducers: {
		setProject: (state, action) => {
			const { projectId, name, createdAt, isActive, ownerId } = action.payload;
			state.projectId = projectId;
			state.name = name;
			state.createdAt = createdAt;
			state.isActive = isActive;
			state.ownerId = ownerId;
		},
		unsetProject: (state) => {
			state.projectId = null;
			state.name = null;
			state.createdAt = null;
			state.isActive = null;
			state.ownerId = null;
		},
	},
});

export default projectSlice.reducer;

export const { setProject, unsetProject } = projectSlice.actions;

export const selectProjectId = (state) => state.project.projectId;
export const selectOwnerId = (state) => state.project.ownerId;
export const selectProjectArchiveStatus = (state) => state.project.isActive;

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	groups: [],
};

const filterSlice = createSlice({
	name: "filter",
	initialState,
	reducers: {
		toggleFilter: (state, action) => {
			const id = action.payload;
			if (state.groups.includes(id)) {
				state.groups = state.groups.filter((f) => f !== id);
			} else {
				state.groups.push(id);
			}
		},
		resetFilters: (state) => {
			state.groups = [];
		},
	},
});

export default filterSlice.reducer;
export const { toggleFilter, resetFilters } = filterSlice.actions;
export const selectCurrentFilters = (state) => state.filter;

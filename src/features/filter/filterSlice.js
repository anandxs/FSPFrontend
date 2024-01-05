import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	stages: [],
	types: [],
};

const filterSlice = createSlice({
	name: "filter",
	initialState,
	reducers: {
		toggleStagesFilter: (state, action) => {
			const id = action.payload;
			if (state.stages.includes(id)) {
				state.stages = state.stages.filter((f) => f !== id);
			} else {
				state.stages.push(id);
			}
		},
		resetFilters: (state) => {
			state.stages = [];
			state.types = [];
		},
	},
});

export default filterSlice.reducer;
export const { toggleStagesFilter, resetFilters } = filterSlice.actions;
export const selectCurrentFilters = (state) => state.filter;

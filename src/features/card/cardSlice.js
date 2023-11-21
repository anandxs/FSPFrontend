import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	cardId: null,
	title: null,
	description: null,
	group: {
		groupId: null,
		groupName: null,
	},
};

const cardSlice = createSlice({
	name: "card",
	initialState,
	reducers: {
		setCard: (state, action) => {
			const { cardId, title, description, group } = action.payload;
			state.cardId = cardId;
			state.title = title;
			state.description = description;
			state.group.groupId = group.groupId;
			state.group.groupName = group.groupName;
		},
		unsetCard: (state) => {
			state.cardId = null;
			state.title = null;
			state.description = null;
			state.group.groupId = null;
			state.group.groupName = null;
		},
	},
});

export default cardSlice.reducer;

export const { setCard, unsetCard } = cardSlice.actions;

export const selectCurrentCard = (state) => state.card;

import {createSlice} from '@reduxjs/toolkit';

import {resetStore} from './serviceSlice';

const initialState = {
	card: null,
	cardChapter: null,
};

const editSlice = createSlice({
	name: 'editSlice',
	initialState,
	reducers: {
		setCard: (state, action) => {
			const {currentCard, activeProgram} = action.payload;

			state.card = currentCard;
			state.cardChapter = activeProgram;
		},
		clearEdit: (state) => {
			state.card = null;
			state.cardChapter = null;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(resetStore, () => initialState);
	},
});

const {actions, reducer} = editSlice;

export default reducer;
export const {setCard, clearEdit} = actions;

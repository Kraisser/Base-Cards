import {createSlice} from '@reduxjs/toolkit';

import {resetStore} from './serviceSlice';

const initialState = {
	cardList: [],
	filteredCardList: [],
	cardListStatus: 'firstLoad',
	cardListChapter: '',
};

const cardSlice = createSlice({
	name: 'cardList',
	initialState,
	reducers: {
		cardListLoading: (state) => {
			state.cardListStatus = 'loading';
			state.cardList = initialState.cardList;
		},
		cardListError: (state) => {
			state.cardListStatus = 'error';
		},
		cardListSuccess: (state, action) => {
			state.cardListStatus = 'idle';
			state.cardList = action.payload;
			state.filteredCardList = action.payload;
		},
		setCardFilter: (state, action) => {
			state.filteredCardList = action.payload;
		},
		cardListSetChapter: (state, action) => {
			state.cardListChapter = action.payload;
		},
		clearCards: () => initialState,
	},
	extraReducers: (builder) => {
		builder.addCase(resetStore, () => initialState);
	},
});

const {actions, reducer} = cardSlice;

export default reducer;
export const {
	cardListLoading,
	cardListError,
	cardListSuccess,
	setCardFilter,
	cardListSetChapter,
	clearCards,
} = actions;

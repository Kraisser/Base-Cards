import {createSlice} from '@reduxjs/toolkit';

import {resetStore} from './serviceSlice';

const initialState = {
	cardList: {},
	filteredCardList: [],
	cardListStatus: 'loading',
};

const cardSlice = createSlice({
	name: 'cardList',
	initialState,
	reducers: {
		cardListLoading: (state) => {
			state.cardListStatus = 'loading';
			state.cardList = {};
		},
		cardListError: (state) => {
			state.cardListStatus = 'error';
		},
		cardListSuccess: (state, action) => {
			state.cardListStatus = 'idle';
			state.cardList = action.payload;
			state.filteredCardList = action.payload.data;
		},
		setCardFilter: (state, action) => {
			state.filteredCardList = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(resetStore, () => initialState);
	},
});

const {actions, reducer} = cardSlice;

export default reducer;
export const {cardListLoading, cardListError, cardListSuccess, setCardFilter} = actions;

import {createSlice} from '@reduxjs/toolkit';

const initialState = {
	cardList: {},
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
		},
	},
});

const {actions, reducer} = cardSlice;

export default reducer;
export const {cardListLoading, cardListError, cardListSuccess} = actions;

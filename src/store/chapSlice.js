import {createSlice} from '@reduxjs/toolkit';

const initialState = {
	chapList: {},
	chapListStatus: 'loading',
};

const chapSlice = createSlice({
	name: 'chapList',
	initialState,
	reducers: {
		exListLoading: (state) => {
			state.chapListStatus = 'loading';
		},
		exListError: (state) => {
			state.chapListStatus = 'error';
		},
		exListSuccess: (state, action) => {
			state.chapListStatus = 'idle';
			state.chapList = action.payload;
		},
	},
});

const {actions, reducer} = chapSlice;

export default reducer;
export const {exListLoading, exListError, exListSuccess} = actions;

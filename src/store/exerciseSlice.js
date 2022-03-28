import {createSlice} from '@reduxjs/toolkit';

const initialState = {
	exerciseList: {},
	exerciseListStatus: 'loading',
};

const exerciseSlice = createSlice({
	name: 'exercise',
	initialState,
	reducers: {
		exListLoading: (state) => {
			state.exerciseListStatus = 'loading';
		},
		exListError: (state) => {
			state.exerciseListStatus = 'error';
		},
		exListSuccess: (state, action) => {
			state.exerciseListStatus = 'idle';
			state.exerciseList = action.payload;
		},
	},
});

const {actions, reducer} = exerciseSlice;

export default reducer;
export const {exListLoading, exListError, exListSuccess} = actions;

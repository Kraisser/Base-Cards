import {createSlice} from '@reduxjs/toolkit';

const initialState = {
	activeProgram: '',
	programList: [],
	programListStatus: 'loading',
	programFiltered: [],
};

const programSlice = createSlice({
	name: 'program',
	initialState,
	reducers: {
		setActiveProgram: (state, action) => {
			state.activeProgram = action.payload;
		},
		setProgramFilter: (state, action) => {
			state.programFiltered = action.payload;
		},
		programListLoading: (state) => {
			state.programListStatus = 'loading';
		},
		programListError: (state) => {
			state.programListStatus = 'error';
		},
		programListSuccess: (state, action) => {
			state.programListStatus = 'idle';
			state.programFiltered = action.payload;
			state.programList = action.payload;
		},
	},
});

const {actions, reducer} = programSlice;

export default reducer;
export const {
	setActiveProgram,
	setProgramFilter,
	programListLoading,
	programListError,
	programListSuccess,
} = actions;

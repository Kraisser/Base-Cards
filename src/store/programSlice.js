import {createSlice} from '@reduxjs/toolkit';

const initialState = {
	activeProgram: '',
	programList: {},
	programListStatus: 'loading',
};

const programSlice = createSlice({
	name: 'program',
	initialState,
	reducers: {
		setActiveProgram: (state, action) => {
			state.activeProgram = action.payload;
		},
		programListLoading: (state) => {
			state.programListStatus = 'loading';
		},
		programListError: (state) => {
			state.programListStatus = 'error';
		},
		programListSuccess: (state, action) => {
			state.programListStatus = 'idle';
			state.programList = action.payload;
		},
	},
});

const {actions, reducer} = programSlice;

export default reducer;
export const {setActiveProgram, programListLoading, programListError, programListSuccess} = actions;

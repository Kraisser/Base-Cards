import {createSlice} from '@reduxjs/toolkit';

const initialState = {
	delModalStatus: false,
	prevChapter: '',
};

const modalSlice = createSlice({
	name: 'modal',
	initialState,
	reducers: {
		delModalOpen: (state, action) => {
			state.delModalStatus = action.payload;
		},
		delModalSetPrevChapter: (state, action) => {
			state.prevChapter = action.payload;
		},
		delModalClose: (state) => {
			state.delModalStatus = false;
			state.prevChapter = '';
		},
	},
});

const {actions, reducer} = modalSlice;

export default reducer;
export const {delModalOpen, delModalClose, delModalSetPrevChapter} = actions;

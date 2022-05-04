import {createSlice} from '@reduxjs/toolkit';

const initialState = {
	delModalStatus: false,
};

const modalSlice = createSlice({
	name: 'modal',
	initialState,
	reducers: {
		delModalOpen: (state, action) => {
			state.delModalStatus = action.payload;
		},
		delModalClose: (state) => {
			state.delModalStatus = false;
		},
	},
});

const {actions, reducer} = modalSlice;

export default reducer;
export const {delModalOpen, delModalClose} = actions;

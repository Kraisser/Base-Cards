import {createSlice} from '@reduxjs/toolkit';

import {resetStore} from './serviceSlice';

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
	extraReducers: (builder) => {
		builder.addCase(resetStore, () => initialState);
	},
});

const {actions, reducer} = modalSlice;

export default reducer;
export const {delModalOpen, delModalClose} = actions;

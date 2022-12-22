import {createSlice} from '@reduxjs/toolkit';

import {resetStore} from './serviceSlice';

const initialState = {
	delModalTarget: false,
	delModalTargetId: {},
	deletedId: null,
};

const modalSlice = createSlice({
	name: 'modal',
	initialState,
	reducers: {
		delModalDeletedCardId: (state, action) => {
			state.deletedId = action.payload;
		},
		delModalOpen: (state, action) => {
			state.delModalTarget = action.payload.target;
			state.delModalTargetId = {
				id: action.payload.id,
				chapId: action.payload.chapId,
				favorite: action.payload.favorite,
				fromChapterId: action.payload.fromChapterId,
			};
		},
		delModalClose: (state) => {
			state.delModalTarget = initialState.delModalTarget;
			state.delModalTargetId = initialState.delModalTargetId;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(resetStore, () => initialState);
	},
});

const {actions, reducer} = modalSlice;

export default reducer;
export const {delModalOpen, delModalClose, delModalDeletedCardId} = actions;

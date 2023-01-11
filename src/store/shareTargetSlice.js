import {createSlice} from '@reduxjs/toolkit';

import {resetStore} from './serviceSlice';

const initialState = {
	link: '',
};

const shared = createSlice({
	name: 'shared',
	initialState,
	reducers: {
		setSharedData: (state, action) => {
			const {link} = action.payload;

			state.link = link;
		},
		clearSharedData: () => initialState,
	},
	extraReducers: (builder) => {
		builder.addCase(resetStore, () => initialState);
	},
});

const {actions, reducer} = shared;

export default reducer;
export const {setSharedData, clearSharedData} = actions;

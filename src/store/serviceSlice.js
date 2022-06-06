import {createSlice} from '@reduxjs/toolkit';

const serviceSlice = createSlice({
	name: 'service',
	initialState: {},
	reducers: {
		resetStore: () => {},
	},
});

const {actions, reducer} = serviceSlice;

export default reducer;
export const {resetStore} = actions;

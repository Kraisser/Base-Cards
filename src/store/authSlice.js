import {createSlice} from '@reduxjs/toolkit';

const initialState = {
	uid: null,
	userName: null,
	userImage: null,
};

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		authSuccess: (state, action) => {
			state.uid = action.payload.uid;
			state.userName = action.payload.userName;
			state.userImage = action.payload.userImage;
		},
		authError: (state) => {
			state.uid = false;
			state.userName = false;
			state.userImage = null;
		},
	},
});

const {actions, reducer} = authSlice;

export default reducer;
export const {authSuccess, authError} = actions;

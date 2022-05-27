import {createSlice} from '@reduxjs/toolkit';

const initialState = {
	uid: false,
	userName: false,
};

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		authSuccess: (state, action) => {
			state.uid = action.payload.uid;
      state.userName = action.payload.userName;
		},
    authError: (state) => {
      state.uid = false;
      state.userName = false;
    }
	},
});

const {actions, reducer} = authSlice;

export default reducer;
export const {authSuccess, authError} = actions;

import {configureStore} from '@reduxjs/toolkit';

import {default as cardList} from './cardSlice';
import {default as chapter} from './chapterSlice';
import {default as modal} from './modalSlice';
import {default as editSlice} from './editSlice';
import {default as auth} from './authSlice';
import {default as shared} from './shareTargetSlice';

const stringMiddleware = () => (dispatch) => (action) => {
	if (typeof action === 'string') {
		return dispatch({
			type: action,
		});
	}
	return dispatch(action);
};

const store = configureStore({
	reducer: {cardList, chapter, modal, editSlice, auth, shared},
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(stringMiddleware),
	devTools: process.env.NODE_ENV !== 'production',
});

export default store;

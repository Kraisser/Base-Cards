import {configureStore} from '@reduxjs/toolkit';

import {default as exercise} from './exerciseSlice';
import {default as program} from './programSlice';
import {default as modal} from './modalSlice';

const stringMiddleware = () => (dispatch) => (action) => {
	if (typeof action === 'string') {
		return dispatch({
			type: action,
		});
	}
	return dispatch(action);
};

const store = configureStore({
	reducer: {exercise, program, modal},
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(stringMiddleware),
	devTools: process.env.NODE_ENV !== 'production',
});

export default store;

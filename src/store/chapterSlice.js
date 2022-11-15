import {createSlice} from '@reduxjs/toolkit';

import {resetStore} from './serviceSlice';

const initialState = {
	activeChapter: 'favourite+chapter',
	activeChapterName: 'Избранное',
	chapterList: [],
	chapterListStatus: 'loading',
	chapterFiltered: [],
	menuHidden: false,
	clientWidth: 0,
};

const chapterSlice = createSlice({
	name: 'chapter',
	initialState,
	reducers: {
		setActiveChapter: (state, action) => {
			state.activeChapter = action.payload.id;
			state.activeChapterName = action.payload.name;
		},
		resetActiveChapter: (state) => {
			state.activeChapter = initialState.activeChapter;
			state.activeChapterName = initialState.activeChapterName;
		},
		setChapterFilter: (state, action) => {
			state.chapterFiltered = action.payload;
		},
		chapterListLoading: (state) => {
			state.chapterListStatus = 'loading';
		},
		chapterListError: (state) => {
			state.chapterListStatus = 'error';
		},
		chapterListSuccess: (state, action) => {
			state.chapterListStatus = 'idle';
			state.chapterFiltered = action.payload;
			state.chapterList = action.payload;
		},
		setMenuActive: (state, action) => {
			state.menuHidden = action.payload;
		},
		setClientWidth: (state, action) => {
			state.clientWidth = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(resetStore, () => initialState);
	},
});

const {actions, reducer} = chapterSlice;

export default reducer;
export const {
	setActiveChapter,
	resetActiveChapter,
	setChapterFilter,
	chapterListLoading,
	chapterListError,
	chapterListSuccess,
	setMenuActive,
	setClientWidth,
} = actions;

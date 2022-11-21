import {useDispatch, useSelector} from 'react-redux';
import {useCallback} from 'react';

import useRequests from './useRequests';

import {clearCards} from '../store/cardSlice.js';
import {
	chapterListSuccess,
	chapterListError,
	setActiveChapter,
	resetActiveChapter,
} from '../store/chapterSlice';

export default function useChapter() {
	const chapterList = useSelector((state) => state.chapter.chapterList);

	const dispatch = useDispatch();
	const {postChapter, getChapters, deleteChapter, editChapter, initFavorite} = useRequests();

	const updateChapters = () => {
		getChapters()
			.then((res) => {
				const favoriteChapterIn = res.find((item) => item.id === 'favorite+chapter');
				const chapArr = [...res];
				if (!favoriteChapterIn) {
					initFavorite();
					chapArr.push({id: 'favorite+chapter', name: 'Избранное'});
				}

				dispatch(chapterListSuccess(chapArr));
			})
			.catch((e) => {
				console.log(e);
				dispatch(chapterListError());
			});
	};

	const getChapterName = (chapterId) => {
		const name = chapterList.find((item) => (chapterId === item.id ? item.name : false));

		console.log(name);
	};

	const updateChapterList = (popId) => {
		const newChapList = chapterList.filter((item) => item.id !== popId);

		dispatch(chapterListSuccess(newChapList));
	};

	const uploadNewChapter = useCallback(
		async (id, name) => {
			try {
				await postChapter(id, name);

				const chapters = [...chapterList, {id, name}];
				dispatch(chapterListSuccess(chapters));
				return {id, name};
			} catch (e) {
				dispatch(chapterListError());
			}
		},
		[chapterList, postChapter, dispatch]
	);

	const deleteChapterFromList = (id) => {
		deleteChapter(id)
			.then(() => updateChapterList(id))
			.then(() => {
				const chapIndex = chapterList.findIndex((item) => id === item.id);
				const nextChapter = chapterList[chapIndex - 1] || chapterList[chapIndex + 1];

				if (nextChapter) {
					dispatch(setActiveChapter({id: nextChapter.id, name: nextChapter.name}));
					return;
				}
				dispatch(resetActiveChapter());
				dispatch(clearCards());
			})
			.catch((e) => console.log(e));
	};

	const updateChapterName = (id, name) => {
		editChapter(id, name);

		const newChapters = chapterList.map((item) => {
			if (item.id === id) {
				return {id, name: name};
			}
			return item;
		});
		dispatch(chapterListSuccess(newChapters));
		dispatch(setActiveChapter({id, name}));
	};

	return {
		updateChapters,
		getChapterName,
		uploadNewChapter,
		deleteChapterFromList,
		updateChapterName,
	};
}

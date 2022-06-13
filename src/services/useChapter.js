import {useDispatch, useSelector} from 'react-redux';
import {useCallback} from 'react';

import useRequests from './useRequests';

import {cardListError, cardListSuccess, cardListLoading} from '../store/cardSlice.js';
import {chapterListSuccess, chapterListError, setActiveChapter} from '../store/chapterSlice';

export default function useChapter() {
	const chapterList = useSelector((state) => state.chapter.chapterList);

	const dispatch = useDispatch();
	const {postChapter, getChapters, deleteChapter, editChapter} = useRequests();

	const updateChapters = () => {
		getChapters()
			.then((res) => dispatch(chapterListSuccess(res)))
			.catch((e) => {
				console.log(e);
				dispatch(chapterListError());
			});
	};

	const uploadNewChapter = useCallback(
		async (id, name) => {
			try {
				const chapters = [...chapterList, {id, name}];
				await postChapter(id, name);

				dispatch(chapterListSuccess(chapters));
			} catch (e) {
				dispatch(chapterListError());
			}
		},
		[chapterList, postChapter, dispatch]
	);

	const deleteChapterFromList = (id, nextPath) => {
		deleteChapter(id)
			.then(() => updateChapters())
			.then(() => {
				if (nextPath === null) {
					dispatch(cardListLoading());
				}
				dispatch(setActiveChapter(nextPath));
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
	};

	return {
		updateChapters,
		uploadNewChapter,
		deleteChapterFromList,
		updateChapterName,
	};
}

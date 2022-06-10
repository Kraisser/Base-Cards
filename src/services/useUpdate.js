import {useDispatch, useSelector} from 'react-redux';

import useRequests from './useRequests';
import {cardListError, cardListSuccess, cardListLoading} from '../store/cardSlice.js';
import {chapterListSuccess, chapterListError, setActiveChapter} from '../store/chapterSlice';
import {useCallback} from 'react';

export default function useUpdate() {
	const dispatch = useDispatch();
	const activeChapter = useSelector((state) => state.chapter.activeChapter);

	const {getCardList, getChapters} = useRequests();

	const updateCardList = useCallback(
		(id) => {
			console.log('id: ', id);
			console.log('activeChapter: ', activeChapter);
			console.log('id === activeChapter: ', id === activeChapter);
			if (id === activeChapter) {
				return;
			}
			dispatch(cardListLoading());
			dispatch(setActiveChapter(id));

			if (id) {
				getCardList(id)
					.then((res) => {
						dispatch(cardListSuccess(res));
					})
					.catch((e) => {
						console.log(e);
						dispatch(cardListError());
					});
			}
		},
		[activeChapter]
	);

	const updateChapters = () => {
		getChapters()
			.then((res) => dispatch(chapterListSuccess(res)))
			.catch((e) => {
				console.log(e);
				dispatch(chapterListError());
			});
	};

	return {updateCardList, updateChapters};
}

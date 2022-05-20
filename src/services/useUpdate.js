import {useDispatch} from 'react-redux';

import useRequests from './useRequests';
import {cardListError, cardListSuccess, cardListLoading} from '../store/cardSlice.js';
import {chapterListSuccess, chapterListError, setActiveChapter} from '../store/chapterSlice';

export default function useUpdate() {
	const dispatch = useDispatch();
	const {getCardList, getChapters} = useRequests();

	const updateCardList = (id) => {
		dispatch(cardListLoading());
		dispatch(setActiveChapter(id));

		if (id) {
			getCardList(id)
				.then((res) => {
					dispatch(cardListSuccess(res));
				})
				.catch((e) => dispatch(cardListError()));
		}
	};

	const updateChapters = () => {
		getChapters()
			.then((res) => dispatch(chapterListSuccess(res)))
			.catch((e) => dispatch(chapterListError()));
	};

	return {updateCardList, updateChapters};
}

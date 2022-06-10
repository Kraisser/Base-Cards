import {useDispatch, useSelector} from 'react-redux';
import {useCallback} from 'react';

import useRequests from './useRequests';
import useUpdate from './useUpdate';

import {cardListError, cardListSuccess, cardListLoading} from '../store/cardSlice.js';
import {chapterListSuccess, chapterListError, setActiveChapter} from '../store/chapterSlice';

export default function useUpload() {
	const cardList = useSelector((state) => state.cardList.cardList);
	const chapterList = useSelector((state) => state.chapter.chapterList);

	const dispatch = useDispatch();
	const {postChapter, postCard, deleteChapter, deleteCard, editChapter} = useRequests();
	const {updateChapters, updateCardList} = useUpdate();

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

	const uploadNewCard = (newCard, programId, activeChapter, id) => {
		postCard(newCard, programId)
			.then(() => {
				if (programId === activeChapter) {
					const prevData = cardList.data.filter((item) => item.id !== id);
					const newCardListArr = [...prevData, newCard];
					const newCardList = {description: cardList.description, data: newCardListArr};

					dispatch(cardListSuccess(newCardList));
				}
			})
			.catch((e) => console.log(e));
	};

	const deleteChapterFromList = (id, nextPath) => {
		deleteChapter(id)
			.then(() => updateChapters())
			.then(() => {
				if (nextPath === null) {
					dispatch(cardListLoading());
				}
				dispatch(setActiveChapter(nextPath));
			})
			.then(() => updateCardList(nextPath))
			.catch((e) => console.log(e));
	};

	const onDeleteCard = (cardId, activeChapter) => {
		deleteCard(cardId, activeChapter).then(() => {
			const newCardListArr = cardList.data.filter((item) => cardId !== item.id);
			const newCardList = {description: cardList.description, data: newCardListArr};

			dispatch(cardListSuccess(newCardList));
		});
	};

	const updateChapterName = useCallback(
		(id, name) => {
			editChapter(id, name);

			const newChapters = chapterList.map((item) => {
				if (item.id === id) {
					return {id, name: name};
				}
				return item;
			});
			dispatch(chapterListSuccess(newChapters));
		},
		[chapterList]
	);

	return {
		uploadNewChapter,
		uploadNewCard,
		deleteChapterFromList,
		onDeleteCard,
		updateChapterName,
	};
}

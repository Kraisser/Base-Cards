import {useDispatch, useSelector} from 'react-redux';
import {useCallback} from 'react';

import useRequests from './useRequests';

import {
	cardListError,
	cardListSuccess,
	cardListLoading,
	cardListSetChapter,
} from '../store/cardSlice.js';

export default function useCards() {
	const cardList = useSelector((state) => state.cardList.cardList);

	const dispatch = useDispatch();
	const {postCard, deleteCard, getCardList} = useRequests();

	const updateCardList = useCallback((id) => {
		if (!id) {
			return;
		}
		dispatch(cardListLoading());

		getCardList(id)
			.then((res) => {
				const {data, chapterId} = res;

				dispatch(cardListSuccess(data));
				dispatch(cardListSetChapter(chapterId));
			})
			.catch((e) => {
				console.log(e);
				dispatch(cardListError());
			});
		// eslint-disable-next-line
	}, []);

	const uploadNewCard = (newCard, chapterId, activeChapter, id) => {
		return postCard(newCard, chapterId)
			.then(() => {
				if (chapterId === activeChapter) {
					const prevData = cardList.filter((item) => item.id !== id);
					const newCardList = [...prevData, newCard];

					dispatch(cardListSuccess(newCardList));
				}
			})
			.catch((e) => console.log(e));
	};

	const addCardToFavourite = async (card) => {
		await uploadNewCard(card, 'favorite+chapter', 'favorite+chapter', card.id);
	};

	const onDeleteCard = (cardId, activeChapter) => {
		deleteCard(cardId, activeChapter).then(() => {
			const newCardList = cardList.filter((item) => cardId !== item.id);

			dispatch(cardListSuccess(newCardList));
		});
	};

	return {
		addCardToFavourite,
		uploadNewCard,
		onDeleteCard,
		updateCardList,
	};
}

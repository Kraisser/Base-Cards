import {useDispatch, useSelector} from 'react-redux';
import {useCallback} from 'react';

import useRequests from './useRequests';

import {cardListError, cardListSuccess, cardListLoading} from '../store/cardSlice.js';

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
				dispatch(cardListSuccess(res));
			})
			.catch((e) => {
				console.log(e);
				dispatch(cardListError());
			});
	}, []);

	const uploadNewCard = (newCard, programId, activeChapter, id) => {
		return postCard(newCard, programId)
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

	const onDeleteCard = (cardId, activeChapter) => {
		deleteCard(cardId, activeChapter).then(() => {
			const newCardListArr = cardList.data.filter((item) => cardId !== item.id);
			const newCardList = {description: cardList.description, data: newCardListArr};

			dispatch(cardListSuccess(newCardList));
		});
	};

	return {
		uploadNewCard,
		onDeleteCard,
		updateCardList,
	};
}

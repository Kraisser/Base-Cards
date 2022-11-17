import useRequests from './useRequests';
import useCards from './useCards';

export default function useFavorites() {
	const {postCard, deleteCard} = useRequests();
	const {addCardToFavourite, uploadNewCard} = useCards();

	const addFavorite = async (card, chapterId) => {
		const fromChapterId = chapterId === 'favorite+chapter' ? card.fromChapterId : chapterId;
		const additCard = {...card, fromChapterId, favorite: true};

		try {
			await addCardToFavourite(additCard);
			await postCard(additCard, fromChapterId);
		} catch (error) {
			console.log(error);
		}
	};

	const deleteFromFavorite = async (card, activeChapter) => {
		try {
			const additCard = {...card, favorite: false};

			await deleteCard(card.id, 'favorite+chapter');
			await uploadNewCard(additCard, card.fromChapterId, activeChapter, card.id);
		} catch (error) {
			console.log(error);
		}
	};

	return {addFavorite, deleteFromFavorite};
}

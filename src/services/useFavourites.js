import useRequests from './useRequests';
import useCards from './useCards';

export default function useFavourites() {
	const {postCard, deleteCard} = useRequests();
	const {addCardToFavourite, uploadNewCard} = useCards();

	const addFavourite = async (card, chapterId) => {
		const fromChapterId = chapterId === 'favourite+chapter' ? card.fromChapterId : chapterId;
		const additCard = {...card, fromChapterId, favourite: true};

		try {
			await addCardToFavourite(additCard);
			await postCard(additCard, fromChapterId);
		} catch (error) {
			console.log(error);
		}
	};

	const deleteFromFavourite = async (card, activeChapter) => {
		try {
			const additCard = {...card, favourite: false};

			await deleteCard(card.id, 'favourite+chapter');
			await uploadNewCard(additCard, card.fromChapterId, activeChapter, card.id);
		} catch (error) {
			console.log(error);
		}
	};

	return {addFavourite, deleteFromFavourite};
}

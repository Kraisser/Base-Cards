import {useDispatch, useSelector} from 'react-redux';

import useRequests from './useRequests';
import useUpdate from './useUpdate';

import {exListError, exListSuccess, exListLoading} from '../store/chapSlice.js';
import {programListSuccess, programListError, setActiveProgram} from '../store/programSlice';

export default function useUpload() {
	const cardList = useSelector((state) => state.chapList.chapList);

	const dispatch = useDispatch();
	const {postChapter, postCard, deleteProgramFromChapters, deleteCard} = useRequests();
	const {updateChapters, updateChapList} = useUpdate();

	const uploadNewChapter = (id, name, programs) => {
		postChapter(id, name)
			.then(() => dispatch(programListSuccess(programs)))
			.catch((e) => dispatch(programListError()));
	};

	const uploadNewCard = (newCard, programId, activeProgram) => {
		postCard(newCard, programId)
			.then(() => {
				if (programId === activeProgram) {
					const newCardListArr = [...cardList.data, newCard];
					const newCardList = {description: cardList.description, data: newCardListArr};

					dispatch(exListSuccess(newCardList));
				}
			})
			.catch((e) => console.log(e));
	};

	const deleteChapter = (id, nextPath) => {
		deleteProgramFromChapters(id)
			.then(() => updateChapters())
			.then(() => {
				if (nextPath === null) {
					dispatch(exListLoading());
				}
				console.log(nextPath);
				dispatch(setActiveProgram(nextPath));
			})
			.then(() => updateChapList(nextPath))
			.catch((e) => console.log(e));
	};

	const onDeleteCard = (cardId, activeProgram) => {
		deleteCard(cardId, activeProgram).then(() => {
			const newCardListArr = cardList.data.filter((item) => cardId !== item.id);
			const newCardList = {description: cardList.description, data: newCardListArr};

			dispatch(exListSuccess(newCardList));
		});
	};

	return {uploadNewChapter, uploadNewCard, deleteChapter, onDeleteCard};
}

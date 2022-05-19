import {useDispatch, useSelector} from 'react-redux';

import useRequests from './useRequests';
import useUpdate from './useUpdate';

import {exListError, exListSuccess, exListLoading} from '../store/chapSlice.js';
import {programListSuccess, programListError, setActiveProgram} from '../store/programSlice';

export default function useUpload() {
	const cardList = useSelector((state) => state.chapList.chapList);
	const programList = useSelector((state) => state.program.programList);

	const dispatch = useDispatch();
	const {postChapter, postCard, deleteProgramFromChapters, deleteCard, editChapter} = useRequests();
	const {updateChapters, updateChapList} = useUpdate();

	const uploadNewChapter = async (id, name) => {
		try {
			const chapters = [...programList, {id, name}];
			await postChapter(id, name);

			dispatch(programListSuccess(chapters));
		} catch (e) {
			dispatch(programListError());
		}
		// const chapters = [...programList, {id, name}];

		// postChapter(id, name)
		// 	.then(() => dispatch(programListSuccess(chapters)))
		// 	.catch((e) => dispatch(programListError()));
	};

	const uploadNewCard = (newCard, programId, activeProgram, id) => {
		postCard(newCard, programId)
			.then(() => {
				if (programId === activeProgram) {
					const prevData = cardList.data.filter((item) => item.id !== id);
					const newCardListArr = [...prevData, newCard];
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

	const updateChapterName = (id, name) => {
		editChapter(id, name);

		const newChapters = programList.map((item) => {
			if (item.id === id) {
				return {id, name: name};
			}
			return item;
		});
		dispatch(programListSuccess(newChapters));
	};

	return {uploadNewChapter, uploadNewCard, deleteChapter, onDeleteCard, updateChapterName};
}

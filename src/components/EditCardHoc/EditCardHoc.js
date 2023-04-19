import '../../css/common.css';
import '../../css/cardForm.css';

import {useSelector, useDispatch} from 'react-redux';
import {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';

import useChapter from '../../services/useChapter';
import useCards from '../../services/useCards';

import {v4 as uuid} from 'uuid';

import CardForm from '../CardForm/CardForm';

import {clearEdit} from '../../store/editSlice';
import {setActiveChapter} from '../../store/chapterSlice';

export default function CardAddForm() {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const {updateChapters} = useChapter();

	const {uploadNewCard, onDeleteCard} = useCards();

	const chapterListStatus = useSelector((state) => state.chapter.chapterListStatus);
	const activeChapter = useSelector((state) => state.chapter.activeChapter);
	const editCard = useSelector((state) => state.editSlice.card);

	const [errorEdit, setErrorEdit] = useState(null);

	useEffect(() => {
		if (chapterListStatus !== 'idle') {
			updateChapters();
		}

		return () => {
			if (editCard) {
				dispatch(clearEdit());
			}
		};
		// eslint-disable-next-line
	}, []);

	const compareCards = (oldCard, newCard) => {
		const props = ['name', 'link', 'description'];

		for (let i = 0; i < props.length; i++) {
			if (oldCard[props[i]] !== newCard[props[i]]) {
				return false;
			}
		}

		return true;
	};

	const onCardSubmit = async ({cardName, cardLink, cardDescription, chapter}, newChapData) => {
		const newCard = {
			id: editCard ? editCard.id : uuid(),
			name: cardName,
			link: cardLink,
			timeStamp: editCard ? editCard.timeStamp : Date.now(),
			description: cardDescription,
			favorite: editCard ? editCard.favorite : false,
			fromChapterId: editCard ? editCard.fromChapterId : chapter,
		};

		if (compareCards(editCard, newCard) && chapter === editCard.fromChapterId) {
			setErrorEdit('Редактирование не выполнено. Изменения отсутствуют.');
			return false;
		}
		console.log('cardSubmit');

		setErrorEdit(null);
		// dispatch(clearEdit());

		if (activeChapter === 'favorite+chapter') {
			console.log('from favorite chap');
			//from favorite chap
			if (newChapData) {
				const newChapCard = {...newCard, fromChapterId: newChapData.id};
				await onDeleteCard(editCard.id, editCard.fromChapterId); //delete from old chap
				await uploadNewCard(newChapCard, 'favorite+chapter', 'favorite+chapter'); //upload to favorite
				await uploadNewCard(newChapCard, newChapData.id, 'favorite+chapter'); //upload to newChap
			} else {
				if (chapter !== editCard.fromChapterId) {
					await onDeleteCard(newCard.id, editCard.fromChapterId); //delete from old chap
				}

				const anotherChapCard = {...newCard, fromChapterId: chapter};
				await uploadNewCard(anotherChapCard, activeChapter, activeChapter); //upload to favorite
				await uploadNewCard(anotherChapCard, chapter, activeChapter); //upload to parent chap
			}

			navigate('/');
			return true;
		}

		if (newCard.favorite && newChapData) {
			//from parent chap favoriteIn to new
			console.log('from parent chap favoriteIn to new');

			await onDeleteCard(editCard.id, editCard.fromChapterId); //delete from old chap

			const newChapCard = {...newCard, fromChapterId: newChapData.id};
			await uploadNewCard(newChapCard, 'favorite+chapter', activeChapter); //upload to favorite
			await uploadNewCard(newChapCard, newChapData.id, activeChapter); //upload to newChap

			dispatch(setActiveChapter(newChapData));

			navigate('/');
			return true;
		}

		if (newCard.favorite && !newChapData) {
			// from parent chap favoriteIn to old
			console.log('from parent chap favoriteIn to old: ');
			await uploadNewCard({...newCard, fromChapterId: chapter}, 'favorite+chapter', activeChapter); //upload to favorite
		} //+

		if (newChapData) {
			console.log('newChapData');
			await onDeleteCard(newCard.id, newCard.fromChapterId); //delete from old chap

			const newChapCard = {...newCard, fromChapterId: newChapData.id};
			await uploadNewCard(newChapCard, newChapData.id, activeChapter); //upload to newChap

			dispatch(setActiveChapter(newChapData));
			navigate('/');
			return true;
		} //+

		if (chapter !== editCard.fromChapterId) {
			console.log('chapter !== editCard.fromChapterId: ', chapter !== editCard.fromChapterId);
			await onDeleteCard(newCard.id, newCard.fromChapterId); //delete from old chap
		}

		await uploadNewCard({...newCard, fromChapterId: chapter}, chapter, activeChapter);

		navigate('/');
		return true;
	};

	return <CardForm onCardSubmit={onCardSubmit} baseVal={editCard} errorEdit={errorEdit} />;
}

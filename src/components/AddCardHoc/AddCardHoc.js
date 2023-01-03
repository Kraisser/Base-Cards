import '../../css/common.css';
import '../../css/cardForm.css';

import {useSelector, useDispatch} from 'react-redux';
import {useState, useEffect} from 'react';

import useChapter from '../../services/useChapter';
import useCards from '../../services/useCards';

import {v4 as uuid} from 'uuid';

import CardForm from '../CardForm/CardForm';

import {setActiveChapter} from '../../store/chapterSlice';

import Spinner from '../iconsComponents/Spinner/Spinner';

export default function AddCardHoc() {
	const dispatch = useDispatch();

	const {updateChapters} = useChapter();

	const {uploadNewCard} = useCards();

	const chapterListStatus = useSelector((state) => state.chapter.chapterListStatus);
	const activeChapter = useSelector((state) => state.chapter.activeChapter);
	
	const editCard = useSelector((state) => state.editSlice.card);

	useEffect(() => {
		if (chapterListStatus !== 'idle') {
			updateChapters();
		}
		// eslint-disable-next-line
	}, []);

	const [uploading, setUploading] = useState(false);

	const onCardSubmit = async ({cardName, cardLink, cardDescription, chapter}, newChapData) => {
		const newCard = {
			id: uuid(),
			name: cardName,
			link: cardLink,
			timeStamp: Date.now(),
			description: cardDescription,
			favorite: false,
			fromChapterId: chapter,
		};

		setUploading(true);

		if (newChapData) {
			const newChapCard = {...newCard, fromChapterId: newChapData.id};
			await uploadNewCard(newChapCard, newChapData.id, activeChapter);

			dispatch(setActiveChapter(newChapData));
		} else {
			await uploadNewCard(newCard, chapter, activeChapter);
		}

		setUploading(false);
		return;
	};

	if (uploading) {
		return (
			<div className='cardForm'>
				<Spinner />
			</div>
		);
	}

	return <CardForm onCardSubmit={onCardSubmit} baseVal={editCard} />;
}

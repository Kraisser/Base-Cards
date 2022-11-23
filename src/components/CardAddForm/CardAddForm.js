import '../../css/common.css';
import './cardAddForm.css';

import {useSelector, useDispatch} from 'react-redux';
import {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';

import useChapter from '../../services/useChapter';
import useCards from '../../services/useCards';
import useValidate from '../../services/useValidate';
import useDebounce from '../../services/useDebounce';

import {v4 as uuid} from 'uuid';

import ChapterInput from '../../components/ChapterInput/ChapterInput';

import {clearEdit} from '../../store/editSlice';
import {setActiveChapter} from '../../store/chapterSlice';

import Spinner from '../iconsComponents/Spinner/Spinner';

export default function CardAddForm() {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const {validateField} = useValidate();

	const {updateChapters, uploadNewChapter} = useChapter();

	const {uploadNewCard, onDeleteCard} = useCards();

	const chapterListStatus = useSelector((state) => state.chapter.chapterListStatus);
	const activeChapter = useSelector((state) => state.chapter.activeChapter);
	const editCard = useSelector((state) => state.editSlice.card);

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

	const [newChap, setNewChap] = useState(false);

	const [cardName, setCardName] = useState(editCard ? editCard.name : '');
	const [chapter, setChapter] = useState(
		editCard ? (activeChapter === 'favorite+chapter' ? editCard.fromChapterId : activeChapter) : ''
	);
	const [cardLink, setCardLink] = useState(editCard ? editCard.link : '');
	const [cardDescription, setCardDescription] = useState(editCard ? editCard.description : '');

	const [cardNameErr, setCardNameErr] = useState(null);
	const [chapterErr, setChapterErr] = useState(null);

	const [errorEdit, setErrorEdit] = useState(null);

	const [uploading, setUploading] = useState(false);

	const nameErrInpStyle = cardNameErr ? 'errorInput' : '';

	const validateFunc = {
		cardName: (value = cardName) => validateField(`cardName`, value, setCardNameErr),
		chapter: (value = chapter) => validateField(`chapter`, value, setChapterErr),
	};

	const validateAll = async () => {
		const resArr = [];

		for (const id in validateFunc) {
			if (id === 'chapter' && chapterErr) {
				resArr.push(false);
				continue;
			}
			if (Object.hasOwnProperty.call(validateFunc, id)) {
				const res = await validateFunc[id]();
				resArr.push(res);
			}
		}

		return resArr.includes(false);
	};

	const clearFields = () => {
		setCardName('');
		setChapter('');
		setCardLink('');
		setCardDescription('');
	};

	const compareCards = (oldCard, newCard) => {
		const props = ['name', 'link', 'description'];

		for (let i = 0; i < props.length; i++) {
			if (oldCard[props[i]] !== newCard[props[i]]) {
				return false;
			}
		}

		return true;
	};

	const createNewChapter = async () => {
		const id = uuid() + '+chapter';
		const name = (chapter.charAt(0).toUpperCase() + chapter.slice(1)).trim();

		return await uploadNewChapter(id, name);
	};

	const onCardSubmit = async (e) => {
		e.preventDefault();

		const validateRes = await validateAll();

		if (validateRes) {
			return;
		}

		const newCard = {
			id: editCard ? editCard.id : uuid(),
			name: cardName,
			link: cardLink,
			timeStamp: editCard ? editCard.timeStamp : Date.now(),
			description: cardDescription,
			favorite: editCard ? editCard.favorite : false,
			fromChapterId: editCard ? editCard.fromChapterId : chapter,
		};

		setUploading(true);

		const newChapObj = newChap ? await createNewChapter() : false;

		if (editCard) {
			if (compareCards(editCard, newCard) && chapter === editCard.fromChapterId) {
				setErrorEdit('Редактирование не выполнено. Изменения отсутствуют.');
				return;
			}

			setErrorEdit(null);
			dispatch(clearEdit());

			if (activeChapter === 'favorite+chapter') {
				//from favorite chap
				if (newChap) {
					const newChapCard = {...newCard, fromChapterId: newChapObj.id};
					await onDeleteCard(editCard.id, editCard.fromChapterId); //delete from old chap
					await uploadNewCard(newChapCard, 'favorite+chapter', 'favorite+chapter'); //upload to favorite
					await uploadNewCard(newChapCard, newChapObj.id, 'favorite+chapter'); //upload to newChap
				} else {
					if (chapter !== editCard.fromChapterId) {
						await onDeleteCard(newCard.id, editCard.fromChapterId); //delete from old chap
					}

					const anotherChapCard = {...newCard, fromChapterId: chapter};
					await uploadNewCard(anotherChapCard, activeChapter, activeChapter); //upload to favorite
					await uploadNewCard(anotherChapCard, chapter, activeChapter); //upload to parent chap
				}

				navigate('/');
				return;
			}

			if (newCard.favorite && newChap) {
				//from parent chap favoriteIn to new

				await onDeleteCard(editCard.id, editCard.fromChapterId); //delete from old chap

				const newChapCard = {...newCard, fromChapterId: newChapObj.id};
				await uploadNewCard(newChapCard, 'favorite+chapter', activeChapter); //upload to favorite
				await uploadNewCard(newChapCard, newChapObj.id, activeChapter); //upload to newChap

				dispatch(setActiveChapter(newChapObj));

				navigate('/');
				return;
			}

			if (newCard.favorite && !newChap) {
				// from parent chap favoriteIn to old
				await uploadNewCard(
					{...newCard, fromChapterId: chapter},
					'favorite+chapter',
					activeChapter
				); //upload to favorite
			} //+

			if (newChap) {
				await onDeleteCard(newCard.id, newCard.fromChapterId); //delete from old chap

				const newChapCard = {...newCard, fromChapterId: newChapObj.id};
				await uploadNewCard(newChapCard, newChapObj.id, activeChapter); //upload to newChap

				dispatch(setActiveChapter(newChapObj));
				navigate('/');
				return;
			} //+

			if (chapter !== editCard.fromChapterId) {
				await onDeleteCard(newCard.id, newCard.fromChapterId); //delete from old chap
			}

			await uploadNewCard({...newCard, fromChapterId: chapter}, chapter, activeChapter);

			navigate('/');
			return;
		} // endEditCard ++

		if (newChap) {
			const newChapCard = {...newCard, fromChapterId: newChapObj.id};
			await uploadNewCard(newChapCard, newChapObj.id, activeChapter);

			dispatch(setActiveChapter(newChapObj));
		} else {
			await uploadNewCard(newCard, chapter, activeChapter);
		}

		clearFields();
		setUploading(false);
		return;
	};

	const debounceValidate = useDebounce((id, value) => validateFunc[id](value), 300);

	const onChange = (e, setState, newChap) => {
		const value = e.target.value;
		const id = e.target.id;

		setState(value);

		if (newChap) {
			return;
		}

		debounceValidate(id, value);
	};

	const onChangeChapCondtition = (newChapCond) => {
		setNewChap(newChapCond);
		setChapterErr(null);
		setChapter('');
	};

	if (uploading) {
		return (
			<div className='cardForm'>
				<Spinner />
			</div>
		);
	}

	return (
		<form className='cardForm' onSubmit={onCardSubmit}>
			<h2 className='formHeader'>{editCard ? `Изменение карточки` : 'Добавление карточки'}</h2>
			<div className='fieldWrapper'>
				<label htmlFor='cardName' className='formInputLabel'>
					Название карточки*
				</label>
				{cardNameErr ? <div className='errorForm'>{cardNameErr}</div> : null}
				<input
					type='text'
					id='cardName'
					onChange={(e) => onChange(e, setCardName)}
					value={cardName}
					className={`formInput ${nameErrInpStyle}`}
				/>
			</div>

			<>
				<div className='fieldWrapper chapSelectButWrapper'>
					<button
						type='button'
						onClick={() => onChangeChapCondtition(false)}
						className={`but chapSelectBut ${!newChap ? 'chapSelectButActive' : ''}`}>
						Существующий раздел
					</button>
					<button
						type='button'
						onClick={() => onChangeChapCondtition(true)}
						className={`but chapSelectBut ${newChap ? 'chapSelectButActive' : ''}`}>
						Новый раздел
					</button>
				</div>
				<div className='fieldWrapper'>
					<ChapterInput
						newChap={newChap}
						chapState={{chapter, setChapter}}
						onChange={onChange}
						chapErrState={{chapterErr, setChapterErr}}
					/>
				</div>
			</>

			<div className='fieldWrapper'>
				<label htmlFor='cardLink' className='formInputLabel'>
					Укажите ссылку
				</label>
				<input
					type='text'
					id='cardLink'
					onChange={(e) => setCardLink(e.target.value)}
					value={cardLink}
					className={'formInput'}
				/>
			</div>

			<div className='fieldWrapper fieldDescriptionWrapper'>
				<label htmlFor='cardDescription' className='formInputLabel'>
					Дополнительное описание
				</label>
				<textarea
					name='cardDescription'
					id='cardDescription'
					onChange={(e) => setCardDescription(e.target.value)}
					value={cardDescription}
					className='descriptionInput'></textarea>
				{errorEdit ? <div className='errorForm'>{errorEdit}</div> : null}
			</div>
			<div className='formButWrapper'>
				<button type='submit' className='formBut but'>
					Отправить
				</button>
			</div>
		</form>
	);
}

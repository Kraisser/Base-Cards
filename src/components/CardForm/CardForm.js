import '../../css/cardForm.css';

import {useState} from 'react';

import {v4 as uuid} from 'uuid';

import useChapter from '../../services/useChapter';
import useValidate from '../../services/useValidate';

import ChapterInput from '../../components/ChapterInput/ChapterInput';

export default function CardForm({onCardSubmit, baseVal, errorEdit}) {
	const {uploadNewChapter} = useChapter();
	const {validateAll, validateField, debounceValidate} = useValidate();

	const {name, link, description, fromChapterId} = baseVal ? baseVal : {};

	const [newChap, setNewChap] = useState(false);

	const [cardName, setCardName] = useState(name ? name : '');
	const [chapter, setChapter] = useState(fromChapterId ? fromChapterId : '');
	const [cardLink, setCardLink] = useState(link ? link : '');
	const [cardDescription, setCardDescription] = useState(description ? description : '');

	const [cardNameErr, setCardNameErr] = useState(null);
	const [chapterErr, setChapterErr] = useState(null);

	const nameErrInpStyle = cardNameErr ? 'errorInput' : '';

	const createNewChapter = async () => {
		const id = uuid() + '+chapter';
		const name = (chapter.charAt(0).toUpperCase() + chapter.slice(1)).trim();

		return await uploadNewChapter(id, name);
	};

	const validateFunc = {
		cardName: (value = cardName) => validateField(`cardName`, value, setCardNameErr),
		chapter: (value = chapter) => validateField(`chapter`, value, setChapterErr),
	};

	const clearFields = () => {
		setCardName('');
		setChapter('');
		setCardLink('');
		setCardDescription('');
	};

	const onChange = (e, setState, setError) => {
		const value = e.target.value;
		const id = e.target.id;

		setState(value);

		setError(debounceValidate(validateFunc, id, value));
	};

	const onChangeChapCondtition = (newChapCond) => {
		setNewChap(newChapCond);
		setChapterErr(null);
		setChapter('');
	};

	const cardSubmit = async (e) => {
		e.preventDefault();

		const validateRes = await validateAll(validateFunc, chapterErr);

		if (validateRes) {
			return;
		}

		const newChapData = newChap ? await createNewChapter() : false;

		const cardData = {cardName, cardLink, cardDescription, chapter};

		const response = await onCardSubmit(cardData, newChapData);

		if (response) {
			clearFields();
		}
	};

	return (
		<form className='cardForm' onSubmit={cardSubmit}>
			<h2 className='formHeader'>Добавление карточки</h2>
			<div className='fieldWrapper'>
				<label htmlFor='cardName' className='formInputLabel'>
					Название карточки*
				</label>
				{cardNameErr ? <div className='errorForm'>{cardNameErr}</div> : null}
				<input
					type='text'
					id='cardName'
					onChange={(e) => onChange(e, setCardName, setCardNameErr)}
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

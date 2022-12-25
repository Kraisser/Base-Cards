import '../../css/cardForm.css';
import './fastCardAddForm.css';

import {useState} from 'react';
import {useSelector} from 'react-redux';

import {v4 as uuid} from 'uuid';

import useCards from '../../services/useCards';
import useValidate from '../../services/useValidate';
import useDebounce from '../../services/useDebounce';

import Spinner from '../iconsComponents/Spinner/Spinner';

import delIcon from '../../assets/icons/delete-icon.png';

export default function FastCardAddForm({onClose}) {
	const {uploadNewCard} = useCards();
	const {validateField} = useValidate();

	const activeChapter = useSelector((state) => state.chapter.activeChapter);

	const [cardName, setCardName] = useState('');
	const [cardLink, setCardLink] = useState('');
	const [cardDescription, setCardDescription] = useState('');

	const [cardNameErr, setCardNameErr] = useState(null);

	const [uploading, setUploading] = useState(false);

	const cardNameErrorInputClass = cardNameErr ? 'errorInput' : '';

	const onCardSubmit = async (e) => {
		e.preventDefault();

		const validateRes = await validateField(`cardName`, cardName, setCardNameErr);

		if (!validateRes) {
			return;
		}
		setUploading(true);

		const newCard = {
			id: uuid(),
			name: cardName,
			link: cardLink,
			timeStamp: Date.now(),
			description: cardDescription,
			favorite: false,
			fromChapterId: activeChapter,
		};

		await uploadNewCard(newCard, activeChapter, activeChapter);

		onClose();
	};

	const validateCardNameDebounce = useDebounce(
		(value) => validateField(`cardName`, value, setCardNameErr),
		300
	);

	const onChange = (e, setState) => {
		const value = e.target.value;

		setState(value);

		if (e.target.id === 'cardName') {
			validateCardNameDebounce(value);
		}
	};

	if (uploading) {
		return (
			<div className='cardFormModal'>
				<Spinner />
			</div>
		);
	}

	return (
		<form className='cardFormModal' onSubmit={(e) => onCardSubmit(e)}>
			<h2 className='formHeader'>Быстрая заметка</h2>
			<img src={delIcon} alt='Закрыть окно' className='modalCloseIcon' onClick={onClose} />
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
					className={`formInput ${cardNameErrorInputClass}`}
				/>
			</div>

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
			</div>
			<div className='formButWrapper'>
				<button type='submit' className='formBut but'>
					Отправить
				</button>
			</div>
		</form>
	);
}

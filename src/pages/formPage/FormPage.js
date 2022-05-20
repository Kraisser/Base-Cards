import './formPage.css';

import {useSelector, useDispatch} from 'react-redux';
import {useState, useEffect} from 'react';

import useUpdate from '../../services/useUpdate';
import useUpload from '../../services/useUpload';

import {v4 as uuid} from 'uuid';
import * as yup from 'yup';
import {Link} from 'react-router-dom';

import PageHeader from '../../components/PageHeader/PageHeader';
import ChapterInput from '../../components/ChapterInput/ChapterInput';

import {clearEdit} from '../../store/editSlice';

export default function FormPage() {
	const dispatch = useDispatch();

	const {updateChapters} = useUpdate();
	const {uploadNewCard, onDeleteCard, uploadNewChapter} = useUpload();

	const chapterListStatus = useSelector((state) => state.chapter.chapterListStatus);
	const activeChapter = useSelector((state) => state.chapter.activeChapter);
	const editCard = useSelector((state) => state.editSlice.card);

	useEffect(() => {
		if (chapterListStatus !== 'idle') {
			updateChapters();
		}
		// eslint-disable-next-line
	}, []);

	const validSchema = yup.object().shape({
		cardName: yup
			.string('Введите строку')
			.min(2, 'Минимум 2 символа')
			.max(55, 'Максимум 55 символов')
			.required('Обязательное поле*'),
		chapter: yup.string('Выберите раздел*').required('Обязательное поле*'),
		cardLink: yup.string('Укажите ссылку*').required('Обязательное поле*'),
	});

	const [newChap, setNewChap] = useState(false);

	const [cardName, setCardName] = useState(editCard ? editCard.name : '');
	const [chapter, setChapter] = useState(editCard ? activeChapter : '');
	const [cardLink, setCardLink] = useState(editCard ? editCard.link : '');
	const [cardDescription, setCardDescription] = useState(editCard ? editCard.description : '');

	const [cardNameErr, setCardNameErr] = useState(editCard ? true : null);
	const [chapterErr, setChapterErr] = useState(null);
	const [cardLinkErr, setCardLinkErr] = useState(editCard ? true : null);

	const nameErrInpStyle = cardNameErr === true || cardNameErr === null ? null : 'errorInput';
	const linkErrInpStyle = cardLinkErr === true || cardLinkErr === null ? null : 'errorInput';

	const validateField = (id, value, setErr) => {
		validSchema
			.pick([id])
			.validate({[id]: value})
			.then(() => setErr(true))
			.catch((err) => {
				setErr(err.message);
			});
	};

	const validateFunc = {
		cardName: (value = cardName) => validateField(`cardName`, value, setCardNameErr),
		chapter: (value = chapter) => validateField(`chapter`, value, setChapterErr),
		cardLink: (value = cardLink) => validateField(`cardLink`, value, setCardLinkErr),
	};

	const validateAll = () => {
		for (const id in validateFunc) {
			if (chapterErr === 'Такой раздел уже существует') {
				continue;
			}
			if (Object.hasOwnProperty.call(validateFunc, id)) {
				validateFunc[id]();
			}
		}
	};

	const clearFields = () => {
		setCardName('');
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
		await uploadNewChapter(id, chapter.charAt(0).toUpperCase() + chapter.slice(1));

		return id;
	};

	const onExSubmit = async (e, id) => {
		e.preventDefault();

		validateAll();

		if (cardNameErr !== true || chapterErr !== true || cardLinkErr !== true) {
			return;
		}

		const newCard = {
			id: id ? id : uuid(),
			name: cardName,
			link: cardLink,
			timeStamp: Date.now(),
			description: cardDescription,
		};

		clearFields();

		if (id) {
			dispatch(clearEdit());

			if (compareCards(editCard, newCard) && chapter === activeChapter) {
				return;
			}

			if (chapter !== activeChapter) {
				onDeleteCard(id, activeChapter);
			}
		}

		if (newChap) {
			const newChapId = await createNewChapter();

			uploadNewCard(newCard, newChapId, activeChapter, id);
			return;
		}

		uploadNewCard(newCard, chapter, activeChapter, id);
	};

	const onChange = (e, setState, chapErr) => {
		const value = e.target.value;
		const id = e.target.id;

		setState(value);

		if (chapErr) {
			setChapterErr(chapErr);
			return;
		}
		validateFunc[id](value);
	};

	const onChangeChapCondtition = (newChapCond) => {
		setNewChap(newChapCond);
		setChapterErr(null);
		setChapter('');
	};

	const showError = (errState) => {
		if (errState !== true) {
			return errState;
		}
	};

	return (
		<>
			<PageHeader />
			<main>
				<div className='formWrapper'>
					<form className='exForm' onSubmit={(e) => onExSubmit(e, editCard ? editCard.id : null)}>
						<h3>{editCard ? `Изменение карточки` : `Добавление карточки`}</h3>
						<div className='fieldWrapper'>
							<label htmlFor='cardName' className='formInputLabel'>
								Название карточки*
							</label>
							<div className='errorForm'>{showError(cardNameErr)}</div>
							<input
								type='text'
								id='cardName'
								onChange={(e) => onChange(e, setCardName)}
								value={cardName}
								className={`formInput ${nameErrInpStyle}`}
							/>
						</div>

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

						<div className='fieldWrapper'>
							<label htmlFor='cardLink' className='formInputLabel'>
								Укажите ссылку*
							</label>
							<div className='errorForm'>{showError(cardLinkErr)}</div>
							<input
								type='text'
								id='cardLink'
								onChange={(e) => onChange(e, setCardLink)}
								value={cardLink}
								className={`formInput ${linkErrInpStyle}`}
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
								className='exDescriptionInput'></textarea>
						</div>
						<div className='formButWrapper'>
							<button type='submit' className='formBut but'>
								Отправить
							</button>
						</div>
					</form>
					<div>
						<button className='onMainBut but'>
							<Link to='/'>на главную</Link>
						</button>
					</div>
				</div>
			</main>
		</>
	);
}

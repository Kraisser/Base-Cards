import './formPage.css';
import '../../css/common.css';

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
		if (editCard) {
			window.addEventListener('unload', () => {
				console.log('unload');
			});
		}

		// eslint-disable-next-line
	}, []);

	const validSchema = yup.object().shape({
		cardName: yup
			.string('Введите строку')
			.min(2, 'Минимум 2 символа')
			.max(55, 'Максимум 55 символов')
			.required('Обязательное поле*'),
		chapter: yup
			.string('Выберите раздел*')
			.min(2, 'Минимум 2 символа')
			.required('Обязательное поле*'),
		cardLink: yup.string('Укажите ссылку*').required('Обязательное поле*'),
	});

	const [newChap, setNewChap] = useState(false);

	const [cardName, setCardName] = useState(editCard ? editCard.name : '');
	const [chapter, setChapter] = useState(editCard ? activeChapter : '');
	const [cardLink, setCardLink] = useState(editCard ? editCard.link : '');
	const [cardDescription, setCardDescription] = useState(editCard ? editCard.description : '');

	const [cardNameErr, setCardNameErr] = useState(null);
	const [chapterErr, setChapterErr] = useState(null);
	const [cardLinkErr, setCardLinkErr] = useState(null);

	const nameErrInpStyle = cardNameErr ? 'errorInput' : null;
	const linkErrInpStyle = cardLinkErr ? 'errorInput' : null;

	const validateField = (id, value, setErr) => {
		return validSchema
			.pick([id])
			.validate({[id]: value})
			.then(() => {
				setErr(null);
				return true;
			})
			.catch((err) => {
				setErr(err.message);
				return false;
			});
	};

	const validateFunc = {
		cardName: (value = cardName) => validateField(`cardName`, value, setCardNameErr),
		chapter: (value = chapter) => validateField(`chapter`, value, setChapterErr),
		cardLink: (value = cardLink) => validateField(`cardLink`, value, setCardLinkErr),
	};

	const validateAll = async () => {
		const resArr = [];

		for (const id in validateFunc) {
			if (id === 'chapter' && chapterErr === 'Такой раздел уже существует') {
				resArr.push(false);
				continue;
			}
			if (Object.hasOwnProperty.call(validateFunc, id)) {
				const res = await validateFunc[id]();
				resArr.push(res);
			}
		}

		return resArr;
	};

	const clearFields = () => {
		setCardName('');
		setChapter('');
		setCardLink('');
		setCardDescription('');
	};

	const redirectClearEdit = () => {
		if (editCard) {
			dispatch(clearEdit());
		}
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
		const chapterName = (chapter.charAt(0).toUpperCase() + chapter.slice(1)).trim();

		await uploadNewChapter(id, chapterName);

		return id;
	};

	const onExSubmit = async (e, id) => {
		e.preventDefault();

		const validateArr = await validateAll();

		if (validateArr.includes(false)) {
			return;
		}

		const newCard = {
			id: id ? id : uuid(),
			name: cardName,
			link: cardLink,
			timeStamp: Date.now(),
			description: cardDescription,
		};

		if (id) {
			dispatch(clearEdit());

			if (compareCards(editCard, newCard) && chapter === activeChapter) {
				return;
			}

			if (chapter !== activeChapter) {
				onDeleteCard(id, activeChapter);
			}
		}

		clearFields();

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
			<PageHeader redirectClearEdit={editCard ? redirectClearEdit : null} />
			<main>
				<div className='formWrapper'>
					<form className='cardForm' onSubmit={(e) => onExSubmit(e, editCard ? editCard.id : null)}>
						<h3 className='formHeader'>
							{editCard ? `Изменение карточки` : `Добавление карточки`}
						</h3>
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
						<Link to='/'>
							<button className='onMainBut but' onClick={redirectClearEdit}>
								на главную
							</button>
						</Link>
					</div>
				</div>
			</main>
		</>
	);
}

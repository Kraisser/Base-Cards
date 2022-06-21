import './chapterItem.css';

import {useState} from 'react';
import {useDispatch} from 'react-redux';

import useChapter from '../../services/useChapter';

import {delModalOpen} from '../../store/modalSlice';
import {setActiveChapter, setMenuActive} from '../../store/chapterSlice';

import delIcon from '../../assets/icons/delete-icon.png';
import slideIcon from '../../assets/icons/menu-slide.png';
import editChapterIcon from '../../assets/icons/edit-30-icon.png';
import confirmIcon from '../../assets/icons/confirm-icon.png';

export default function ChapterItem({name, id}) {
	const dispatch = useDispatch();
	const {updateChapterName} = useChapter();

	const [menu, setMenu] = useState(false);
	const [edit, setEdit] = useState(false);
	const [chapName, setChapName] = useState(name);

	const nameOverflow = name.length > 30;
	const nameSlice = nameOverflow ? name.substr(0, 30) + ' . . .' : name;

	const clickDelegation = (e) => {
		const targetClassList = e.target.classList;

		if (targetClassList.contains('chapterDelIcon')) {
			dispatch(delModalOpen({target: 'chapter', id}));
		} else if (
			targetClassList.contains('chapterItemMenu') ||
			targetClassList.contains('chapterSlideIcon')
		) {
			onToggleMenu();
		} else if (targetClassList.contains('chapterEditIcon')) {
			onToggleEdit();
		} else if (targetClassList.contains('chapEditInput')) {
			return;
		} else if (targetClassList.contains('enterEditIcon')) {
			onEnterEdit();
		} else {
			chapterSelect();
		}
	};

	const chapterSelect = () => {
		dispatch(setActiveChapter(id));

		if (window.innerWidth < 750) {
			dispatch(setMenuActive(true));
		}
	};

	const onToggleMenu = () => {
		setMenu(!menu);
	};

	const onChangeName = (e) => {
		const value = e.target.value;

		setChapName(value);
	};

	const onToggleEdit = () => {
		setEdit(!edit);
		setMenu(false);
	};

	const onEnterEdit = () => {
		setEdit(false);

		if (name === chapName) {
			return;
		}

		updateChapterName(id, chapName.charAt(0).toUpperCase() + chapName.slice(1));
	};

	const openMenu = menu ? 'chapterMenuActive' : '';
	const content = edit ? (
		<div className='editChapterInputWrapper'>
			<input type='text' value={chapName} className='chapEditInput' onChange={onChangeName} />
			<img src={confirmIcon} alt='Подтвердить' className='enterEditIcon' />
		</div>
	) : (
		<span title={nameOverflow ? name : null}>{nameSlice}</span>
	);

	return (
		<div className='chapterItem' onClick={clickDelegation}>
			<div className={`chapterItemContent ${nameOverflow ? 'chapterContentOverflow' : ''}`}>
				{content}
			</div>

			<div className={`chapterItemMenu ${openMenu}`}>
				<img src={slideIcon} alt='chapter menu' className='chapterSlideIcon' />
				<img src={editChapterIcon} alt='edit chapter' className='chapterEditIcon' />
				<img src={delIcon} alt='name' className='chapterDelIcon' />
			</div>
		</div>
	);
}

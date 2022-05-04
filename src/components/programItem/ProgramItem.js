import './programItem.css';

import {useState} from 'react';

import delIcon from '../../assets/icons/delete-icon.png';
import slideIcon from '../../assets/icons/pngwing.com 1 (4).png';
import editChapterIcon from '../../assets/icons/edit-30-icon.png';
import addIcon from '../../assets/icons/add-icon.png';

export default function ProgramItem({name, onClick, onDelete}) {
	const [menu, setMenu] = useState(false);
	const [edit, setEdit] = useState(false);
	const [chapName, setChapName] = useState(name);

	const clickDelegation = (e) => {
		if (e.target.classList.contains('chapterDelIcon')) {
			onDelete();
		} else if (
			e.target.classList.contains('chapterItemMenu') ||
			e.target.classList.contains('chapterSlideIcon')
		) {
			onToggleMenu();
		} else if (e.target.classList.contains('chapterEditIcon')) {
			onEnterEdit();
		} else {
			onClick();
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
		// setEdit(!edit);
		setMenu(false);
	};

	const onEnterEdit = () => {
		// setEdit(false);
	};

	const openMenu = menu ? 'chapterMenuActive' : '';
	const content = edit ? (
		<div className='editChapterInputWrapper'>
			<input type='text' value={chapName} className='chapEditInput' onChange={onChangeName} />
			<img src={addIcon} alt='add' />
		</div>
	) : (
		<span>{name}</span>
	);

	return (
		<div className='programItem' onClick={clickDelegation}>
			<div className='programItemContent'>{content}</div>

			<div className={`chapterItemMenu ${openMenu}`}>
				<img src={slideIcon} alt='chapter menu' className='chapterSlideIcon' />
				<img
					src={editChapterIcon}
					alt='edit chapter'
					className='chapterEditIcon'
					onClick={onToggleEdit}
				/>
				<img src={delIcon} alt='name' className='chapterDelIcon' />
			</div>
		</div>
	);
}

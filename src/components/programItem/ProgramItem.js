import './programItem.css';

import {useState} from 'react';

import useUpload from '../../services/useUpload';

import delIcon from '../../assets/icons/delete-icon.png';
import slideIcon from '../../assets/icons/menu-slide.png';
import editChapterIcon from '../../assets/icons/edit-30-icon.png';
import addIcon from '../../assets/icons/add-icon.png';

export default function ProgramItem({name, id, onClick, onDelete}) {
	const {updateChapterName} = useUpload();

	const [menu, setMenu] = useState(false);
	const [edit, setEdit] = useState(false);
	const [chapName, setChapName] = useState(name);

	const clickDelegation = (e) => {
		const targetClassList = e.target.classList;

		if (targetClassList.contains('chapterDelIcon')) {
			onDelete();
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
		setEdit(!edit);
		setMenu(false);
	};

	const onEnterEdit = () => {
		setEdit(false);

		if (name === chapName) {
			return;
		}

		updateChapterName(id, chapName);
	};

	const openMenu = menu ? 'chapterMenuActive' : '';
	const content = edit ? (
		<div className='editChapterInputWrapper'>
			<input type='text' value={chapName} className='chapEditInput' onChange={onChangeName} />
			<img src={addIcon} alt='enter edit' className='enterEditIcon' />
		</div>
	) : (
		<span>{name}</span>
	);
	const nameWrapper =
		name.length > 30 ? (
			<>
				<div className='nameHoverWrapper'>
					<div className='nameHoverContainer'>{name}</div>
				</div>
			</>
		) : null;

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
			{nameWrapper}
		</div>
	);
}

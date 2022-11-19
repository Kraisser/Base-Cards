import './addChapter.css';
import '../../css/common.css';

import {useState} from 'react';
import {useSelector} from 'react-redux';

import {v4 as uuid} from 'uuid';

import useChapter from '../../services/useChapter';
import useString from '../../services/useString';

import addIcon from '../../assets/icons/add-icon.png';
import AddIcon from '../AddIcon/AddIcon';

export default function AddChapter() {
	const chapterList = useSelector((state) => state.chapter.chapterList);

	const {uploadNewChapter} = useChapter();
	const {compareChapters} = useString();

	const [newChapter, setNewChapter] = useState('');
	const [errorClass, setErrorClass] = useState('');

	const onChapterSubmit = () => {
		if (newChapter.length < 2) {
			setErrorClass('errorInput');
			return;
		}

		const valueString = newChapter.toLowerCase().trim();
		const validRes = compareChapters(chapterList, valueString);

		if (validRes) {
			setErrorClass('errorInput');
			return;
		}

		const id = `${uuid()}+chapter`;
		const name = (newChapter.charAt(0).toUpperCase() + newChapter.slice(1)).trim();

		uploadNewChapter(id, name);
		setNewChapter('');

		return true;
	};

	return (
		<>
			<div className='addChapterContainer'>
				<input
					type='text'
					id='addChapter'
					className={`addChapterInput ${errorClass}`}
					value={newChapter}
					onChange={(e) => {
						setNewChapter(e.target.value);
						setErrorClass('');
					}}
					placeholder='Новый раздел'
				/>
				<AddIcon onClick={onChapterSubmit} classNames='addChapterIcon' />
			</div>
		</>
	);
}

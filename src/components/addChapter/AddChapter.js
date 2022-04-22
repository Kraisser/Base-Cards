import './addChapter.css';

import {useState} from 'react';
import {useSelector} from 'react-redux';

import {v4 as uuid} from 'uuid';

import useUpload from '../../services/useUpload';

import addIcon from '../../assets/icons/add-icon.png';

export default function AddChapter() {
	const {uploadNewChapter} = useUpload();

	const programList = useSelector((state) => state.program.programList);

	const [newChapter, setNewChapter] = useState('');

	const onProgramSubmit = () => {
		if (newChapter.length < 2) {
			return;
		}

		const id = `${uuid()}+chapter`;

		const newChapterItem = {name: newChapter, id};
		const newChapters = [...programList, newChapterItem];

		const newObj = {
			[id]: {
				description: newChapter,
				chapContent: [],
			},
		};

		uploadNewChapter(newChapterItem, newChapters, newObj);
		setNewChapter('');
		// console.log(newChapterItem, newChapters, newObj);
	};

	return (
		<>
			<div className='addChapterContainer'>
				<input
					type='text'
					id='addChapter'
					className='addChapterInput'
					value={newChapter}
					onChange={(e) => setNewChapter(e.target.value)}
					placeholder='Новый раздел'
				/>
				<img src={addIcon} alt='add-icon' onClick={onProgramSubmit} className='addChapterIcon' />
			</div>
		</>
	);
}

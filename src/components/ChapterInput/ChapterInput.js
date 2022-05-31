import {useSelector} from 'react-redux';

import {v4 as uuid} from 'uuid';

export default function ChapterInput({newChap, chapState, onChange, chapErrState}) {
	const chapterList = useSelector((state) => state.chapter.chapterList);

	const {chapter, setChapter} = chapState;
	const {chapterErr, setChapterErr} = chapErrState;

	const chapErrStyle = chapterErr ? 'errorInput' : null;

	const validateChapterName = (value) => {
		const sameName = chapterList.find((item) => item.name.toLowerCase() === value.toLowerCase());

		if (sameName) {
			return 'Такой раздел уже существует';
		}

		setChapterErr(null);
		return false;
	};

	const setNewName = (e) => {
		const value = e.target.value;
		const err = validateChapterName(value);

		onChange(e, setChapter, err);
	};

	const content = newChap ? (
		<>
			<label htmlFor='chapter' className='formInputLabel'>
				Новый раздел*
			</label>
			<div className='errorForm'>{chapterErr ? chapterErr : null}</div>
			<input
				type='text'
				name='chapter'
				id='chapter'
				value={chapter}
				onChange={(e) => setNewName(e)}
				className={`formInput ${chapErrStyle}`}
			/>
		</>
	) : (
		<>
			<label htmlFor='chapter' className='formInputLabel'>
				Выберите раздел*
			</label>
			<div className='errorForm'>{chapterErr ? chapterErr : null}</div>
			<select
				name='chapter'
				id='chapter'
				value={chapter}
				className={`exSelectInput ${chapErrStyle}`}
				onChange={(e) => onChange(e, setChapter)}>
				<option value='' disabled>
					Из списка
				</option>
				{chapterList.map((item) => (
					<option value={item.id} key={uuid()}>
						{item.name}
					</option>
				))}
			</select>
		</>
	);
	return content;
}

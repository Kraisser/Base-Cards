import {useSelector} from 'react-redux';

import {v4 as uuid} from 'uuid';

export default function ChapterContent({newChap, chapState, onChange, chapErrState}) {
	const programList = useSelector((state) => state.program.programList);

	const {chapter, setChapter} = chapState;
	const {chapterErr, setChapterErr} = chapErrState;

	const chapErrStyle = chapterErr === true || chapterErr === null ? null : 'errorInput';

	const validateChapterName = (value) => {
		const sameName = programList.find((item) => item.name.toLowerCase() === value.toLowerCase());

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
				{programList.map((item) => (
					<option value={item.id} key={uuid()}>
						{item.name}
					</option>
				))}
			</select>
		</>
	);
	return content;
}

import '../../css/cardForm.css';

import {useSelector} from 'react-redux';

import {v4 as uuid} from 'uuid';
import useDebounce from '../../services/useDebounce';
import useString from '../../services/useString';
import useValidate from '../../services/useValidate';
import useSort from '../../services/useSort';

export default function ChapterInput({newChap, chapState, onChange, chapErrState}) {
	const chapterList = useSelector((state) => state.chapter.chapterList);

	const {compareChapters} = useString();
	const {validateField} = useValidate();
	const {sortChaptersByName} = useSort();
	const {debounce} = useDebounce();

	const {chapter, setChapter} = chapState;
	const {chapterErr, setChapterErr} = chapErrState;

	const chapErrStyle = chapterErr ? 'errorInput' : '';

	const validateChapterName = (value) => {
		const valueString = value.toLowerCase().trim();

		const compareResult = compareChapters(chapterList, valueString);

		if (!!compareResult) {
			setChapterErr('Такой раздел уже существует');
			return;
		}

		validateField(`chapter`, value, setChapterErr);
	};

	const setNewName = (e) => {
		const value = e.target.value;
		debounce(() => validateChapterName(value), 300);

		onChange(e, setChapter, setChapterErr);
	};

	const content = newChap ? (
		<>
			<label htmlFor='chapter' className='formInputLabel'>
				Новый раздел*
			</label>
			{chapterErr ? <div className='errorForm'>{chapterErr}</div> : null}
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
			{chapterErr ? <div className='errorForm'>{chapterErr}</div> : null}
			<select
				name='chapter'
				id='chapter'
				value={chapter}
				className={`exSelectInput ${chapErrStyle}`}
				onChange={(e) => onChange(e, setChapter, setChapterErr)}>
				<option value='' disabled>
					Из списка
				</option>
				{sortChaptersByName(chapterList)
					.filter((item) => item.id !== 'favorite+chapter')
					.map((item) => (
						<option value={item.id} key={uuid()}>
							{item.name}
						</option>
					))}
			</select>
		</>
	);
	return content;
}

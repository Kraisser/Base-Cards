import {useSelector} from 'react-redux';

import {v4 as uuid} from 'uuid';
import useDebounce from '../../services/useDebounce';
import useString from '../../services/useString';
import useValidate from '../../services/useValidate';

export default function ChapterInput({newChap, chapState, onChange, chapErrState}) {
	const chapterList = useSelector((state) => state.chapter.chapterList);

	const {compareChapters} = useString();
	const {validateField} = useValidate();

	const {chapter, setChapter} = chapState;
	const {chapterErr, setChapterErr} = chapErrState;

	const chapErrStyle = chapterErr ? 'errorInput' : '';

	const validateChapterName = useDebounce((value) => {
		const valueString = value.toLowerCase().trim();

		const compareResult = compareChapters(chapterList, valueString);

		if (!!compareResult) {
			setChapterErr('Такой раздел уже существует');
			return;
		}

		validateField(`chapter`, value, setChapterErr);
	}, 300);

	const setNewName = (e) => {
		const value = e.target.value;
		validateChapterName(value);

		onChange(e, setChapter, true);
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
				onChange={(e) => onChange(e, setChapter)}>
				<option value='' disabled>
					Из списка
				</option>
				{chapterList
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

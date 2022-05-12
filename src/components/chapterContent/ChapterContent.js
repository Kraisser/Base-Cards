import {useSelector} from 'react-redux';

import {v4 as uuid} from 'uuid';

export default function ChapterContent({newChap, chapState, onChange, chapError}) {
	const programList = useSelector((state) => state.program.programList);

	const {chapter, setChapter} = chapState;

	const chapErrInpStyle = chapError === true || chapError === null ? null : 'errorInput';

	const content = newChap ? (
		'В разработке'
	) : (
		<>
			<label htmlFor='chapter' className='formInputLabel'>
				Выберите раздел*
			</label>
			<div className='errorForm'>{chapError ? chapError : null}</div>
			<select
				name='chapter'
				id='chapter'
				value={chapter}
				className={`exSelectInput ${chapErrInpStyle}`}
				onChange={(e) => onChange(e, setChapter)}>
				<option value=''>Выберите раздел</option>
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

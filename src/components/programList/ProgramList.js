import './programList.css';

import useUpdate from '../../services/useUpdate';

import {useEffect} from 'react';
import {useSelector} from 'react-redux';

import {v4 as uuid} from 'uuid';

import ProgramItem from '../programItem/ProgramItem';
import setContent from '../../utils/setContent';
import useUpload from '../../services/useUpload';

export default function ProgramList() {
	const {updateChapters} = useUpdate();

	const programList = useSelector((state) => state.program.programList);
	const status = useSelector((state) => state.program.programListStatus);

	useEffect(() => {
		if (status !== 'idle') {
			updateChapters();
		}
		// eslint-disable-next-line
	}, []);

	return (
		<div className='programList'>
			<div className='programHeader'>
				<h2>Разделы</h2>
			</div>

			{setContent(status, View, programList)}
		</div>
	);
}

function View({data}) {
	const {updateChapList} = useUpdate();
	const {deleteChapter} = useUpload();

	const items = data.map((item, index) => {
		const prevPath =
			index === 0 ? (data[index + 1] ? data[index + 1].id : null) : data[index - 1].id;

		return (
			<ProgramItem
				name={item.name}
				path={item.path}
				onClick={() => updateChapList(item.id)}
				onDelete={() => deleteChapter(item.id, prevPath)}
				key={uuid()}
			/>
		);
	});

	return items;
}

import './programList.css';

import useUpdate from '../../services/useUpdate';

import {useEffect} from 'react';
import {useSelector} from 'react-redux';

import {v4 as uuid} from 'uuid';

import ProgramItem from '../programItem/ProgramItem';
import setContent from '../../utils/setContent';
import useUpload from '../../services/useUpload';

export default function ProgramList() {
	const {updatePrograms} = useUpdate();

	const programList = useSelector((state) => state.program.programList);
	const status = useSelector((state) => state.program.programListStatus);

	useEffect(() => {
		if (status !== 'idle') {
			updatePrograms();
		}
		// eslint-disable-next-line
	}, []);

	return (
		<div className='programList'>
			<div className='programHeader'>
				<h2>Список програм</h2>
			</div>

			{setContent(status, View, programList)}
		</div>
	);
}

function View({data}) {
	const {updateExercises} = useUpdate();
	const {deleteProgram} = useUpload();

	const items = data.map((item, index) => {
		const prevPath =
			index === 0 ? (data[index + 1] ? data[index + 1].path : null) : data[index - 1].path;

		return (
			<ProgramItem
				name={item.name}
				path={item.path}
				onClick={() => updateExercises(item.path)}
				onDelete={() => deleteProgram(item.id, item.path, prevPath)}
				key={uuid()}
			/>
		);
	});

	return items;
}

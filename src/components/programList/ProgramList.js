import './programList.css';

import useUpdate from '../../services/useUpdate';

import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {v4 as uuid} from 'uuid';

import ProgramItem from '../programItem/ProgramItem';
import SearchForm from '../searchForm/SearchForm';

import {setProgramFilter} from '../../store/programSlice';
import {delModalOpen, delModalSetPrevChapter} from '../../store/modalSlice';

import setContent from '../../utils/setContent';
import AddChapter from '../addChapter/AddChapter';

export default function ProgramList() {
	const {updateChapters} = useUpdate();
	const dispatch = useDispatch();

	const programList = useSelector((state) => state.program.programList);
	const filteredPrograms = useSelector((state) => state.program.programFiltered);
	const status = useSelector((state) => state.program.programListStatus);

	useEffect(() => {
		if (status !== 'idle') {
			updateChapters();
		}
		// eslint-disable-next-line
	}, []);

	const filterPrograms = (filter) => {
		const filtered = programList.filter((item) => item.name.includes(filter));
		dispatch(setProgramFilter(filtered));
	};

	return (
		<div className='programList'>
			<div className='programHeader'>
				<h2>Разделы</h2>
			</div>
			<div className='addChapterWrapper'>
				<AddChapter />
			</div>
			<div className='searchChapterWrapper'>
				<SearchForm filterPrograms={filterPrograms} />
			</div>
			{setContent(status, View, filteredPrograms)}
		</div>
	);
}

function View({data}) {
	const dispatch = useDispatch();

	const {updateChapList} = useUpdate();

	const onDeleteChapter = (id, prevChapter) => {
		dispatch(delModalOpen(id));
		dispatch(delModalSetPrevChapter(prevChapter));
	};

	if (data.length === 0) {
		return <div className='chapterNotFound'>Разделы не найдены</div>;
	}

	const items = data.map((item, index) => {
		const prevChapter =
			index === 0 ? (data[index + 1] ? data[index + 1].id : null) : data[index - 1].id;

		return (
			<ProgramItem
				name={item.name}
				onClick={() => updateChapList(item.id)}
				onDelete={() => onDeleteChapter(item.id, prevChapter)}
				key={uuid()}
			/>
		);
	});

	return items;
}

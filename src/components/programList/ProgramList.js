import './programList.css';

import useUpdate from '../../services/useUpdate';

import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {v4 as uuid} from 'uuid';

import ProgramItem from '../programItem/ProgramItem';
import SearchForm from '../searchForm/SearchForm';

import {setProgramFilter} from '../../store/programSlice';

import setContent from '../../utils/setContent';
import useUpload from '../../services/useUpload';
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
	const {updateChapList} = useUpdate();
	const {deleteChapter} = useUpload();

	if (data.length === 0) {
		return <div className='chapterNotFound'>Раздел не найден</div>;
	}

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

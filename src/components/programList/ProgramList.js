import './programList.css';

import useUpdate from '../../services/useUpdate';

import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {v4 as uuid} from 'uuid';

import ProgramItem from '../programItem/ProgramItem';
import SearchForm from '../searchForm/SearchForm';

import {delModalOpen} from '../../store/modalSlice';

import setContent from '../../utils/setContent';

export default function ProgramList() {
	const dispatch = useDispatch();

	const {updateChapters, updateChapList} = useUpdate();

	const onDeleteChapter = (id) => {
		dispatch(delModalOpen(id));
	};

	const filteredPrograms = useSelector((state) => state.program.programFiltered);
	const status = useSelector((state) => state.program.programListStatus);

	useEffect(() => {
		if (status !== 'idle') {
			updateChapters();
		}
		// eslint-disable-next-line
	}, []);

	const setChapList = () => {
		if (filteredPrograms.length > 0) {
			const arr = filteredPrograms.map((item) => (
				<ProgramItem
					name={item.name}
					id={item.id}
					onClick={() => updateChapList(item.id)}
					onDelete={() => onDeleteChapter(item.id)}
					key={uuid()}
				/>
			));
			return arr;
		}
		return null;
	};

	return (
		<div className='programList'>
			<div className='programHeader'>
				<h2>Разделы</h2>
			</div>

			<div className='searchChapterWrapper'>
				<SearchForm />
			</div>
			<div className='programListContent'>{setContent(status, View, setChapList())}</div>
		</div>
	);
}

function View({data}) {
	if (data.length === 0) {
		return <div className='chapterNotFound'>Разделы не найдены</div>;
	}

	return data;
}

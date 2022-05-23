import './chapterList.css';

import useUpdate from '../../services/useUpdate';

import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {v4 as uuid} from 'uuid';

import ProgramItem from '../ChapterItem/ChapterItem';
import SearchForm from '../SearchForm/SearchForm';

import {delModalOpen} from '../../store/modalSlice';

import setContent from '../../utils/setContent';

export default function ProgramList() {
	const dispatch = useDispatch();

	const {updateChapters, updateCardList} = useUpdate();

	const onDeleteChapter = (id) => {
		dispatch(delModalOpen(id));
	};

	const filteredPrograms = useSelector((state) => state.chapter.chapterFiltered);
	const status = useSelector((state) => state.chapter.chapterListStatus);

	useEffect(() => {
		if (status !== 'idle') {
			updateChapters();
		}
		// eslint-disable-next-line
	}, []);

	const setChapList = () => {
		if (filteredPrograms.length > 0) {
			const arr = [...filteredPrograms]
				.sort((prevItem, item) =>
					prevItem.name.localeCompare(item.name, 'ru', {ignorePunctuation: true})
				)
				.map((item) => (
					<ProgramItem
						name={item.name}
						id={item.id}
						onClick={() => updateCardList(item.id)}
						onDelete={() => onDeleteChapter(item.id)}
						key={uuid()}
					/>
				));
			return arr;
		}
		return null;
	};

	return (
		<div className='chapterList'>
			<div className='chapterHeader'>
				<h2>Разделы</h2>
			</div>

			<div className='searchChapterWrapper'>
				<SearchForm />
			</div>
			<div className='chapterListContent'>{setContent(status, View, setChapList())}</div>
		</div>
	);
}

function View({data}) {
	if (!data || data.length === 0) {
		return <div className='chapterNotFound'>Разделы не найдены</div>;
	}

	return data;
}

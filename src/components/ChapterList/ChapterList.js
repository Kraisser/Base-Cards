import './chapterList.css';

import {useEffect, useMemo} from 'react';
import {useSelector} from 'react-redux';

import {v4 as uuid} from 'uuid';

import ProgramItem from '../ChapterItem/ChapterItem';
import SearchForm from '../SearchForm/SearchForm';

import useChapter from '../../services/useChapter';

import setContent from '../../utils/setContent';

export default function ChapterList() {
	const {updateChapters} = useChapter();

	const chapterList = useSelector((state) => state.chapter.chapterList);
	const filteredChapters = useSelector((state) => state.chapter.chapterFiltered);
	const chapterStatus = useSelector((state) => state.chapter.chapterListStatus);

	useEffect(() => {
		if (chapterStatus !== 'idle') {
			updateChapters();
		}
		// eslint-disable-next-line
	}, []);

	const chapListContent = useMemo(() => {
		if (filteredChapters.length > 0) {
			const arr = [...filteredChapters]
				.sort((prevItem, item) =>
					prevItem.name.localeCompare(item.name, 'ru', {ignorePunctuation: true})
				)
				.map((item) => <ProgramItem name={item.name} id={item.id} key={uuid()} />);
			return arr;
		}
		return null;
	}, [filteredChapters]);

	return (
		<div className='chapterList'>
			<div className='chapterHeader'>
				<h2>Разделы</h2>
			</div>

			<div className='searchChapterWrapper'>
				<SearchForm
					searchList={chapterList}
					placeholder={'Поиск раздела'}
					searchTarget={'chapter'}
				/>
			</div>
			<div className='chapterListContent'>{setContent(chapterStatus, View, chapListContent)}</div>
		</div>
	);
}

function View({data}) {
	if (!data || data.length === 0) {
		return <div className='chapterNotFound'>Разделы не найдены</div>;
	}

	return data;
}

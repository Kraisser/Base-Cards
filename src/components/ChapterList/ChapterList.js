import './chapterList.css';

import {useEffect, useMemo} from 'react';
import {useSelector} from 'react-redux';
import {CSSTransition, TransitionGroup} from 'react-transition-group';

import ChapterItem from '../ChapterItem/ChapterItem';
import SearchForm from '../SearchForm/SearchForm';

import useChapter from '../../services/useChapter';
import useSort from '../../services/useSort';

import setContent from '../../utils/setContent';

export default function ChapterList() {
	const {updateChapters} = useChapter();
	const {sortChaptersByName} = useSort();

	const chapterList = useSelector((state) => state.chapter.chapterList);
	const filteredChapters = useSelector((state) => state.chapter.chapterFiltered);
	const chapterStatus = useSelector((state) => state.chapter.chapterListStatus);

	useEffect(() => {
		if (chapterStatus !== 'idle') {
			updateChapters();
		}
		// eslint-disable-next-line
	}, []);

	const content = useMemo(() => {
		const sorted = sortChaptersByName(filteredChapters);

		return setContent(chapterStatus, View, sorted);
		// eslint-disable-next-line
	}, [filteredChapters, chapterStatus]);

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
			<div className='chapterListContent'>{content}</div>
		</div>
	);
}

function View({data}) {
	if (!data || data.length === 0) {
		return (
			<div className='chapterNotFound'>
				<div>Разделы не найдены</div> Добавьте раздел в поле 'Новый раздел'
			</div>
		);
	}

	const content = data.map((item, index) => (
		<CSSTransition timeout={300 + index * 10} classNames='chap-item' key={item.id} appear={true}>
			<ChapterItem name={item.name} id={item.id} />
		</CSSTransition>
	));

	return <TransitionGroup component={null}>{content}</TransitionGroup>;
}

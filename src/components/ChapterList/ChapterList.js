import './chapterList.css';

import {useEffect, useMemo} from 'react';
import {useSelector} from 'react-redux';
import {CSSTransition, TransitionGroup} from 'react-transition-group';

import ChapterItem from '../ChapterItem/ChapterItem';
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
			const arr = filteredChapters.map((item) => (
				<CSSTransition timeout={300} classNames='chap-item' key={item.id} appear={true}>
					<ChapterItem name={item.name} id={item.id} />
				</CSSTransition>
			));
			return arr;
		}
		return null;
	}, [filteredChapters]);

	const content = setContent(chapterStatus, View, chapListContent);

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
		return <div className='chapterNotFound'>Разделы не найдены. Добавьте раздел в поле выше.</div>;
	}

	return <TransitionGroup component={null}>{data}</TransitionGroup>;
}

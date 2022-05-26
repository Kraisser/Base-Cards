import './chapterList.css';

import useUpdate from '../../services/useUpdate';

import {useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {v4 as uuid} from 'uuid';

import ProgramItem from '../ChapterItem/ChapterItem';
import SearchForm from '../SearchForm/SearchForm';

import {delModalOpen} from '../../store/modalSlice';

import debounce from '../../services/debounce';

import setContent from '../../utils/setContent';

export default function ProgramList() {
	const dispatch = useDispatch();

	const {updateChapters, updateCardList} = useUpdate();

	const chapWrapperRef = useRef();

	const filteredChapters = useSelector((state) => state.chapter.chapterFiltered);
	const chapterStatus = useSelector((state) => state.chapter.chapterListStatus);

	const [scrollClass, setScrollClass] = useState('');

	useEffect(() => {
		if (chapterStatus !== 'idle') {
			updateChapters();
		}
		// eslint-disable-next-line
	}, []);

	const onScrollWrapper = debounce((e) => {
		const scrollPos = e.target.scrollTop;
		const scrollHeight = e.target.scrollHeight;
		const curHeight = e.target.offsetHeight;

		if (scrollPos > 0 && scrollPos < scrollHeight - curHeight) {
			setScrollClass('topOverflow botOverflow');
		} else if (curHeight < scrollHeight && scrollPos !== scrollHeight - curHeight) {
			setScrollClass('botOverflow');
		} else if (scrollPos > 0) {
			setScrollClass('topOverflow');
		} else {
			setScrollClass('');
		}
	}, 50);

	const onDeleteChapter = (id) => {
		dispatch(delModalOpen(id));
	};

	const setChapList = () => {
		if (filteredChapters.length > 0) {
			const arr = [...filteredChapters]
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
			<div
				className={'chapterListContent ' + scrollClass}
				ref={chapWrapperRef}
				onScroll={onScrollWrapper}>
				{setContent(chapterStatus, View, setChapList())}
			</div>
		</div>
	);
}

function View({data}) {
	if (!data || data.length === 0) {
		return <div className='chapterNotFound'>Разделы не найдены</div>;
	}

	return data;
}

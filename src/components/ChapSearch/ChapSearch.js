import './chapSearch.css';

import {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';

import {setChapterFilter} from '../../store/chapterSlice';

import searchIcon from '../../assets/icons/search.png';

export default function SearchForm() {
	const dispatch = useDispatch();
	const [searchValue, setSearchValue] = useState('');

	const chapterList = useSelector((state) => state.chapter.chapterList);

	const onFilterChapter = (filter) => {
		setSearchValue(filter);

		const filtered = chapterList.filter((item) =>
			item.name.toLowerCase().includes(filter.toLowerCase())
		);
		dispatch(setChapterFilter(filtered));
	};

	return (
		<>
			<img src={searchIcon} alt='search' className='searchIcon' />
			<input
				type='text'
				className='searchForm'
				placeholder='Нажмите для поиска'
				value={searchValue}
				onChange={(e) => onFilterChapter(e.target.value)}
			/>
		</>
	);
}

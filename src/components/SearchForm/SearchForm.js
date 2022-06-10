import './searchForm.css';

import {useState} from 'react';
import {useDispatch} from 'react-redux';

import {setChapterFilter} from '../../store/chapterSlice';
import {setCardFilter} from '../../store/cardSlice';

import useDebounce from '../../services/useDebounce';

import searchIcon from '../../assets/icons/search.png';

export default function SearchForm({searchList, searchTarget, placeholder}) {
	const dispatch = useDispatch();

	const [searchValue, setSearchValue] = useState('');

	const debounceSearch = useDebounce(
		(filter) => (searchTarget === 'chapter' ? onFilterChapter(filter) : onFilterCard(filter)),
		300
	);

	const handleChange = (value) => {
		setSearchValue(value);
		debounceSearch(value);
	};

	const filterFunc = (filter) => {
		return searchList.filter((item) => item.name.toLowerCase().includes(filter.toLowerCase()));
	};

	const onFilterChapter = (filter) => {
		const filteredChapters = filterFunc(filter);

		dispatch(setChapterFilter(filteredChapters));
	};

	const onFilterCard = (filter) => {
		const filteredCards = filterFunc(filter);

		dispatch(setCardFilter(filteredCards));
	};

	return (
		<div className='searchWrapper'>
			<img src={searchIcon} alt='search' className='searchIcon' />
			<input
				type='text'
				className='searchForm'
				placeholder={placeholder}
				value={searchValue}
				onChange={(e) => handleChange(e.target.value)}
			/>
		</div>
	);
}

import './searchForm.css';

import {useState} from 'react';
import {useDispatch} from 'react-redux';

import {setChapterFilter} from '../../store/chapterSlice';
import {setCardFilter} from '../../store/cardSlice';

import searchIcon from '../../assets/icons/search.png';

export default function SearchForm({searchList, searchTarget, placeholder}) {
	const dispatch = useDispatch();
	const [searchValue, setSearchValue] = useState('');

	const onFilterChapter = (filter) => {
		setSearchValue(filter);

		const filteredChapters = searchList.filter((item) =>
			item.name.toLowerCase().includes(filter.toLowerCase())
		);

		dispatch(setChapterFilter(filteredChapters));
	};

	const onFilterCard = (filter) => {
		setSearchValue(filter);

		const filteredCards = searchList.data.filter((item) =>
			item.name.toLowerCase().includes(filter.toLowerCase())
		);

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
				onChange={(e) => {
					if (searchTarget === 'chapter') {
						onFilterChapter(e.target.value);
					} else if (searchTarget === 'card') {
						onFilterCard(e.target.value);
					}
				}}
			/>
		</div>
	);
}

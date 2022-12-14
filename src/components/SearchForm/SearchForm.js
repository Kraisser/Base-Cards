import './searchForm.css';

import {useState} from 'react';
import {useDispatch} from 'react-redux';

import {setChapterFilter} from '../../store/chapterSlice';
import {setCardFilter} from '../../store/cardSlice';

import useDebounce from '../../services/useDebounce';

import searchIcon from '../../assets/icons/search.png';

export default function SearchForm({searchList = false, searchTarget, placeholder}) {
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

	const filterFunc = (filter) =>
		searchList.filter((item) => item.name.toLowerCase().includes(filter.toLowerCase()));

	const onFilterChapter = (filter) => {
		const filteredChapters = filterFunc(filter);

		dispatch(setChapterFilter(filteredChapters));
	};

	const onFilterCard = (filter) => {
		if (filter) {
			const filteredCards = filterCardsByName(filter);

			dispatch(setCardFilter(filteredCards));
			return;
		}

		dispatch(setCardFilter(searchList));
	};

	const filterCardsByName = (searchWords) => {
		const wordsReg = searchWords.toLowerCase().trim().split(' ');

		const targetLength = wordsReg.length;

		const regTemplate = `(?:^|[^a-zA-Zа-яА-ЯёЁ])(?:${wordsReg.join('|')})`;
		const filterRegExp = new RegExp(regTemplate, 'gm');

		const filteredCards = searchList.filter((item) => {
			const name = item.name.toLowerCase();
			const matched = name.match(filterRegExp);

			if (!matched) {
				return false;
			}
			return matched.length >= targetLength ? true : false;
		});
		return filteredCards;
	};

	return (
		<div className='searchWrapper'>
			<input
				type='text'
				className='searchForm'
				placeholder={placeholder}
				value={searchValue}
				onChange={(e) => handleChange(e.target.value)}
			/>
			{searchValue ? null : <img src={searchIcon} alt='search' className='searchIcon' />}
		</div>
	);
}

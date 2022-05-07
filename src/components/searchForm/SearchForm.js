import './searchForm.css';

import {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';

import {setProgramFilter} from '../../store/programSlice';

import searchIcon from '../../assets/icons/search.png';

export default function SearchForm() {
	const dispatch = useDispatch();
	const [searchValue, setSearchValue] = useState('');

	const programList = useSelector((state) => state.program.programList);

	const onFilterPrograms = (filter) => {
		setSearchValue(filter);

		const filtered = programList.filter((item) =>
			item.name.toLowerCase().includes(filter.toLowerCase())
		);
		dispatch(setProgramFilter(filtered));
	};

	return (
		<>
			<img src={searchIcon} alt='search' className='searchIcon' />
			<input
				type='text'
				className='searchForm'
				placeholder='Нажмите для поиска'
				value={searchValue}
				onChange={(e) => onFilterPrograms(e.target.value)}
			/>
		</>
	);
}

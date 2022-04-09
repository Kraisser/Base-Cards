import './searchForm.css';

import {useState} from 'react';

import searchIcon from '../../assets/icons/search-icon.png';

export default function SearchForm({filterPrograms}) {
	const [searchValue, setSearchValue] = useState('');

	return (
		<>
			<img src={searchIcon} alt='search' className='searchIcon' />
			<input
				type='text'
				className='searchForm'
				placeholder='Нажмите для поиска'
				value={searchValue}
				onChange={(e) => {
					setSearchValue(e.target.value);
					filterPrograms(e.target.value);
				}}
			/>
		</>
	);
}

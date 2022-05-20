import './pageHeader.css';

import {Link} from 'react-router-dom';

import Clock from '../Clock/Clock';

export default function PageHeader() {
	return (
		<header className='header'>
			<Link to='/'>
				<div className='mainHeader'>
					<h1>Картотека</h1>
				</div>
			</Link>
			<div className='clockWrapper'>
				<Clock />
			</div>
		</header>
	);
}

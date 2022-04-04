import './pageHeader.css';

import {Link} from 'react-router-dom';

import Clock from '../../components/clock/Clock';

export default function PageHeader() {
	return (
		<header className='header'>
			<Link to='/'>
				<div className='mainHeader'>
					<h1>База Знаний</h1>
				</div>
			</Link>
			<div className='clockWrapper'>
				<Clock />
			</div>
		</header>
	);
}

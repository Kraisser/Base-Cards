import './pageHeader.css';

import {Link, useNavigate} from 'react-router-dom';

import Clock from '../Clock/Clock';

import userIcon from '../../assets/icons/user-icon.png';

export default function PageHeader({auth}) {
	const navigate = useNavigate();

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
			{auth === false ? null : (
				<div className='userAuthIconWrapper' onClick={() => navigate('/auth')}>
					<img src={userIcon} alt='user' />
				</div>
			)}
		</header>
	);
}

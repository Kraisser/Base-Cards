import './pageHeader.css';

import {Link, useNavigate} from 'react-router-dom';
import {useSelector} from 'react-redux';

import Clock from '../Clock/Clock';

import userIcon from '../../assets/icons/user-icon.png';

export default function PageHeader({auth, close, redirectClearEdit}) {
	const navigate = useNavigate();

	const {userName, userImage} = useSelector((state) => state.auth);

	const redirectCheck = () => {
		if (redirectClearEdit) {
			redirectClearEdit();
		}
	};

	return (
		<header className='header'>
			<Link to={close ? '' : '/'} onClick={redirectCheck}>
				<div className='mainHeader'>
					<h1>Base Cards</h1>
				</div>
			</Link>
			<div className='rightHeaderWrapper'>
				<Clock />
				{auth === false || close ? null : (
					<div
						className='userAuthIconWrapper'
						onClick={() => {
							redirectCheck();
							navigate('/userPage');
						}}>
						<img src={userImage ? userImage : userIcon} alt='user' />
						<div title={userName ? userName : null}>{userName}</div>
					</div>
				)}
			</div>
		</header>
	);
}

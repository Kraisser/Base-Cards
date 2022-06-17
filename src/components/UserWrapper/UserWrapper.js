import './userWrapper.css';

import {useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';

import userIcon from '../../assets/icons/user-icon.png';

export default function UserWrapper({redirectCheck}) {
	const navigate = useNavigate();

	const userName = useSelector((state) => state.auth.userName);
	const userImage = useSelector((state) => state.auth.userImage);

	return (
		<div
			className='userWrapper'
			onClick={() => {
				redirectCheck();
				navigate('/userPage');
			}}>
			<img src={userImage ? userImage : userIcon} alt='user' />
			<div title={userName ? userName : null}>{userName}</div>
		</div>
	);
}

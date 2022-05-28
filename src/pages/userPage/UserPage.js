import './userPage.css';
import '../../css/common.css';

import {useSelector} from 'react-redux';
import {Link, useNavigate} from 'react-router-dom';

import PageHeader from '../../components/PageHeader/PageHeader';

import userIcon from '../../assets/icons/user-icon.png';
import useAuth from '../../services/useAuth';

export default function UserPage() {
	const {signOutAuth} = useAuth();
	const navigate = useNavigate();

	const {userName, userImage} = useSelector((state) => state.auth);

	const onExit = () => {
		signOutAuth().then(() => {
			navigate('/auth');
		});
	};

	return (
		<>
			<PageHeader />
			<div className='pageContentWrapper'>
				<div className='pageContentContainer userPageContainer'>
					<h2>Личный кабинет</h2>
					<div className='userPageElement'>
						<img src={userImage ? userImage : userIcon} alt='userImage' />
					</div>
					<div className='userPageElement userPageName'>{userName}</div>
					<div className='userPageElement'>
						<button type='button' className='formBut but' onClick={onExit}>
							Выйти из учетной записи
						</button>
					</div>
				</div>
				<div className='onMainButWrapper'>
					<button className='onMainBut but'>
						<Link to='/auth'>На главную</Link>
					</button>
				</div>
			</div>
		</>
	);
}

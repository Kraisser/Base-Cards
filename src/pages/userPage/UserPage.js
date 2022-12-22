import './userPage.css';
import '../../css/common.css';

import {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Link, useNavigate} from 'react-router-dom';

import PageHeader from '../../components/PageHeader/PageHeader';

import userIcon from '../../assets/icons/user-icon.png';
import useAuth from '../../services/useAuth';

import {resetStore} from '../../store/serviceSlice';
import Spinner from '../../components/iconsComponents/Spinner/Spinner';

export default function UserPage({close}) {
	const dispatch = useDispatch();
	const {signOutAuth, verificateEmail} = useAuth();
	const navigate = useNavigate();

	const {userName, userImage, emailConfirmed} = useSelector((state) => state.auth);

	const [confirmCooldown, setConfirmCooldown] = useState(60);
	const [verificateAnswer, setVerificateAnswer] = useState(null);

	const [exitActive, setExitActive] = useState(false);

	useEffect(() => {
		if (emailConfirmed || confirmCooldown < 0) {
			return;
		}

		const timerIdValue = setTimeout(() => {
			setConfirmCooldown(confirmCooldown - 1);
		}, 1000);

		return () => clearTimeout(timerIdValue);
		// eslint-disable-next-line
	}, [confirmCooldown]);

	useEffect(() => {
		if (exitActive) {
			onExit();
		}
	}, [exitActive]);

	const onExit = () => {
		navigate('/auth', {
			state: 'loading',
		});
		dispatch(resetStore());
		signOutAuth();
	};

	// if (exitActive) {
	// 	return <Spinner />;
	// }

	return (
		<>
			<PageHeader burger={false} />
			<div className='pageContentWrapper'>
				<div className='pageContentContainer userPageContainer'>
					<h2>Личный кабинет</h2>
					<div className='userPageElement'>
						<img src={userImage ? userImage : userIcon} alt='userImage' />
					</div>
					<div className='userPageElement userPageName'>
						<h3>{userName}</h3>
					</div>
					<div className='userPageElement userPageName'>
						{emailConfirmed === true
							? 'Email подтверждён'
							: 'Email не потверждён. Для использования приложения проверьте почту и перейдите по ссылке'}
					</div>
					{emailConfirmed === true ? null : confirmCooldown > 0 ? (
						<div className='userPageElement userPageName'>
							{'Перед повторной попыткой проверьте папку спам. Повторная отправка подтверждения будет доступна через ' +
								confirmCooldown}
						</div>
					) : null}
					{verificateAnswer ? <div className='userPageElement'>{verificateAnswer}</div> : null}
					{emailConfirmed ? null : (
						<div className='userPageElement'>
							<button
								type='button'
								disabled={confirmCooldown > 0 ? true : false}
								className='formBut but'
								onClick={() => {
									verificateEmail(setVerificateAnswer);
									setConfirmCooldown(120);
								}}>
								Повторное подтверждение почты
							</button>
						</div>
					)}

					<div className='userPageElement'>
						<button type='button' className='formBut but' onClick={() => setExitActive(true)}>
							Выйти из учетной записи
						</button>
					</div>
				</div>
				{close ? null : (
					<div className='onMainButWrapper'>
						<Link to='/'>
							<button className='onMainBut but'>На главную</button>
						</Link>
					</div>
				)}
			</div>
		</>
	);
}

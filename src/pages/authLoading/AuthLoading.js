import '../../css/common.css';
import './authLoading.css';

import {Link, useNavigate} from 'react-router-dom';
import {useSelector} from 'react-redux';

import PageHeader from '../../components/PageHeader/PageHeader';
import Spinner from '../../components/iconsComponents/Spinner/Spinner';
import {useEffect} from 'react';

export default function AuthLoading() {
	const navigate = useNavigate();

	const uid = useSelector((state) => state.auth.uid);

	useEffect(() => {
		if (uid === false) {
			navigate('/auth');
		}
		// eslint-disable-next-line
	}, [uid]);

	return (
		<>
			<PageHeader close={false} />
			<div className='pageContentWrapper'>
				<h2>Вход в аккаунт</h2>
				<div className='spinnerAuthLoaderWrapper'>
					<Spinner />
				</div>
				<p className='authLoaderText'>
					Пожалуйста подождите. Вы будете автоматически перенаправлены. Если ничего не произошло
					нажмите кнопку ниже.
				</p>
				<div className='onMainButWrapper'>
					<button className='onMainBut but'>
						<Link to='/auth'>Войти</Link>
					</button>
				</div>
			</div>
		</>
	);
}

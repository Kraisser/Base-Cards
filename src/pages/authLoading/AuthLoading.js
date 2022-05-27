import './authLoading.css';

import {Link, useNavigate} from 'react-router-dom';
import {useSelector} from 'react-redux';

import PageHeader from '../../components/PageHeader/PageHeader';
import Spinner from '../../components/Spinner/Spinner';
import {useEffect} from 'react';

export default function AuthLoading() {
	const navigate = useNavigate();

	const uid = useSelector((state) => state.auth.uid);

	useEffect(() => {
		if (uid === false) {
			navigate('/auth');
		}
	}, [uid]);

	return (
		<>
			<PageHeader auth={false} />
			<div className='authLoaderWrapper'>
				<h2 className='authLoader'>Авторизация</h2>
				<div className='spinnerAuthLoaderWrapper'>
					<Spinner />
				</div>
				<p>
					Пожалуйста подождите. Происходит вход в аккаунт. Вы будете автоматически перенаправлены.
					Если ничего не произошло перейдите по кнопке ниже.{' '}
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

import './noAuth.css';
import PageHeader from '../../components/PageHeader/PageHeader';

import {useState, useEffect} from 'react';

import {Link, useNavigate} from 'react-router-dom';
import React from 'react';

export default function NoAuth() {
	const navigate = useNavigate();

	const [redirectTimer, setRedirectTimer] = useState(5);

	useEffect(() => {
		if (redirectTimer === 0) {
			navigate('/');
			return;
		}

		const timerIdValue = setTimeout(() => {
			setRedirectTimer(redirectTimer - 1);
		}, 1000);

		return () => clearTimeout(timerIdValue);
		// eslint-disable-next-line
	}, [redirectTimer]);

	return (
		<>
			<PageHeader />
			<div className='pageContentWrapper'>
				<div className='noAuthHeader'>
					<h2>Ошибка авторизации</h2>
				</div>
				<div className='noAuthMessage'>
					<p>Для возможности просмотра и редактирования контента необходимо авторизоваться.</p>
					<p>Вы будете перенаправлены на форму входа автоматически через {redirectTimer} сек.</p>
					<p>Если ничего не произошло нажмите на кпопку ниже.</p>
				</div>
				<div className='onMainButWrapper'>
					<button className='onMainBut but'>
						<Link to='/auth'>Войти</Link>
					</button>
				</div>
			</div>
		</>
	);
}

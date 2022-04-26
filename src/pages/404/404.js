import './404.css';
import PageHeader from '../../components/pageHeader/PageHeader';

import {useState, useEffect} from 'react';

import {useParams, Link, useNavigate} from 'react-router-dom';
import React from 'react';

export default function Page404() {
	const page = useParams()['*'];
	const navigate = useNavigate();

	const [redirectTimer, setRedirectTimer] = useState(5);

	useEffect(() => {
		if (redirectTimer === 0) {
			navigate('/');
			return;
		}
		setTimeout(() => {
			setRedirectTimer(redirectTimer - 1);
		}, 1000);
	}, [redirectTimer]);

	return (
		<>
			<PageHeader />
			<div className='main404'>
				<div className='header404'>
					<h2>Ошибка 404</h2>
				</div>
				<div className='message404'>{`Страница '${page}' не найдена. Вы будете автоматически перенаправлены на главную страницу через ${redirectTimer}`}</div>
				<div className='but404'>
					<button className='onMainBut but redBut'>
						<Link to='/'>на главную</Link>
					</button>
				</div>
			</div>
		</>
	);
}

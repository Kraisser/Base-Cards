import './404.css';
import '../../css/common.css';

import PageHeader from '../../components/PageHeader/PageHeader';

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

		const timerIdValue = setTimeout(() => {
			setRedirectTimer(redirectTimer - 1);
		}, 1000);

		return () => clearTimeout(timerIdValue);
		// eslint-disable-next-line
	}, [redirectTimer]);

	const messages = {
		page: `Страница '${page}' не найдена.`,
		data: `Карточка или раздел был удален или отсутствует.`,
	};

	const message = messages[page ? 'page' : 'data'];

	return (
		<>
			<PageHeader />
			<div className='main404'>
				<div className='header404'>
					<h2>Ошибка 404</h2>
				</div>
				<div className='message404'>
					{`${message} Вы будете автоматически перенаправлены на главную страницу. Если этого не произошло нажмите на кнопку ниже.`}
				</div>
				<div className='but404'>
					<button className='onMainBut but'>
						<Link to='/'>на главную</Link>
					</button>
				</div>
			</div>
		</>
	);
}

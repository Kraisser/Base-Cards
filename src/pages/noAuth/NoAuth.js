import './noAuth.css';
import PageHeader from '../../components/PageHeader/PageHeader';

import {useState, useEffect} from 'react';

import {useParams, Link, useNavigate} from 'react-router-dom';
import React from 'react';

export default function NoAuth() {
	// const page = useParams()['*'];
	// const navigate = useNavigate();

	return (
		<>
			<PageHeader />
			<div className='noAuthWrapper'>
				<div className='noAuthHeader'>
					<h2>Ошибка авторизации</h2>
				</div>
				<div className='noAuthMessage'>
					<p>Для возможности просмотра и редактирования контента необходимо ввести пароль.</p>
					<p>Вернитесь на страницу авторизации по кнопке ниже чтобы продолжить.</p>
				</div>
			</div>
		</>
	);
}

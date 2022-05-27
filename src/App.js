import './App.css';

import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import {getAuth, onAuthStateChanged} from 'firebase/auth';

import {authSuccess, authError} from './store/authSlice';

import MainPage from './pages/mainPage/MainPage';
import CardDescription from './pages/cardDescription/CardDescription';
import FormPage from './pages/formPage/FormPage';
import Page404 from './pages/404/404';

import Auth from './pages/auth/Auth';
import NoAuth from './pages/noAuth/NoAuth';

function App() {
	const dispatch = useDispatch();

	const auth = getAuth();

	const uid = useSelector((state) => state.auth.uid);

	onAuthStateChanged(auth, (user) => {
		if (user) {
			dispatch(authSuccess({uid: user.uid, userName: user.displayName}));
			// localStorage.setItem('userId', user.uid);
			// localStorage.setItem('userName', user.displayName || user.email);
		} else {
			dispatch(authError());
			// localStorage.setItem('userId', false);
			// localStorage.setItem('userName', false);
		}
	});

	if (!uid) {
		return (
			<div className='content'>
				<Router>
					<Routes>
						<Route path='/' element={<Auth />} />
						<Route path='/auth' element={<Auth />} />
						<Route path='*' element={<NoAuth />} />
					</Routes>
				</Router>
			</div>
		);
	}

	return (
		<div className='content'>
			<Router>
				<Routes>
					<Route path='/' element={<MainPage />} />
					<Route path='/auth' element={<Auth />} />
					<Route path='/editForm' element={<FormPage />} />
					<Route path='/cardDescription/:activeChapter/:id' element={<CardDescription />} />
					<Route path='*' element={<Page404 />} />
				</Routes>
			</Router>
		</div>
	);
}

export default App;

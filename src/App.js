import './App.css';

import React from 'react';
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
import AuthLoading from './pages/authLoading/AuthLoading';
import UserPage from './pages/userPage/UserPage';
import ResetPass from './pages/resetPass/ResetPass';

function App() {
	const dispatch = useDispatch();

	const auth = getAuth();

	const uid = useSelector((state) => state.auth.uid);
	const emailConfirmed = useSelector((state) => state.auth.emailConfirmed);

	onAuthStateChanged(auth, (user) => {
		if (user) {
			dispatch(
				authSuccess({
					uid: user.uid,
					userName: user.displayName ? user.displayName : user.email,
					userImage: user.photoURL,
					emailConfirmed: user.emailVerified,
				})
			);
		} else {
			dispatch(authError());
		}
	});

	if (!uid) {
		return (
			<Router>
				<Routes>
					<Route path='/' element={<AuthLoading close={true} />} />
					<Route path='/auth' element={<Auth close={true} />} />
					<Route path='/resetPass' element={<ResetPass close={true} />} />
					<Route path='*' element={<NoAuth close={true} />} />
				</Routes>
			</Router>
		);
	}

	if (uid && !emailConfirmed) {
		return (
			<Router>
				<Routes>
					<Route path='*' element={<UserPage disMain={true} close={true} />} />
				</Routes>
			</Router>
		);
	}

	return (
		<Router>
			<Routes>
				<Route path='/' element={<MainPage />} />
				<Route path='/userPage' element={<UserPage />} />
				<Route path='/editForm' element={<FormPage />} />
				<Route path='/cardDescription/:activeChapter/:id' element={<CardDescription />} />
				<Route path='*' element={<Page404 />} />
			</Routes>
		</Router>
	);
}

export default App;

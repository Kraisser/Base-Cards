import './App.css';

import React, {useState} from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import {getAuth, onAuthStateChanged} from 'firebase/auth';

import MainPage from './pages/mainPage/MainPage';
import CardDescription from './pages/cardDescription/CardDescription';
import FormPage from './pages/formPage/FormPage';
import Page404 from './pages/404/404';

import Auth from './pages/auth/Auth';
import NoAuth from './pages/noAuth/NoAuth';

function App() {
	const auth = getAuth();

	const [authState, setAuthState] = useState(false);

	onAuthStateChanged(auth, (user) => {
		if (user) {
			console.log(user);
			setAuthState(user.uid);
			localStorage.setItem('userId', user.uid);
			localStorage.setItem('userName', user.displayName || user.email);
		} else {
			setAuthState(false);
			localStorage.setItem('userId', false);
			localStorage.setItem('userName', false);
		}
	});

	if (!authState) {
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

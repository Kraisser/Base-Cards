import './App.css';

import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getAuth, onAuthStateChanged} from 'firebase/auth';
import {Routes, Route, useLocation} from 'react-router-dom';

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
	const location = useLocation();
	const dispatch = useDispatch();

	const [currLocation, setCurrLocation] = useState(location);
	const [transitionState, setTransitionState] = useState('FadeIn');

	const auth = getAuth();

	const uid = useSelector((state) => state.auth.uid);
	const emailConfirmed = useSelector((state) => state.auth.emailConfirmed);

	// const routerState = !uid ? 'noAuth' : uid && !emailConfirmed ? 'noEmail' : 'default';

	useEffect(() => {
		if (location !== currLocation) setTransitionState('FadeOut');
	}, [location, currLocation]);

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

	return (
		<div
			className={`page${transitionState}`}
			onAnimationEnd={() => {
				if (transitionState === 'FadeOut') {
					setTransitionState('FadeIn');
					setCurrLocation(location);
				}
			}}>
			<Routes location={currLocation}>
				{!uid ? (
					<>
						<Route path='/' element={<AuthLoading />} />
						<Route path='/auth' element={<Auth />} />
						<Route path='/resetPass' element={<ResetPass />} />
						<Route path='*' element={<NoAuth />} />
					</>
				) : uid && !emailConfirmed ? (
					<Route path='*' element={<UserPage close={true} />} />
				) : (
					<>
						<Route path='/' element={<MainPage />} />
						<Route path='/userPage' element={<UserPage />} />
						<Route path='/editForm' element={<FormPage />} />
						<Route path='/cardDescription/:activeChapter/:id' element={<CardDescription />} />
						<Route path='*' element={<Page404 />} />
					</>
				)}
			</Routes>
		</div>
	);
}

export default App;

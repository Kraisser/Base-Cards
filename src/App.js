import './App.css';

import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getAuth, onAuthStateChanged} from 'firebase/auth';
import {Routes, Route, useLocation} from 'react-router-dom';

import {authSuccess, authError} from './store/authSlice';
import {setSharedData} from './store/shareTargetSlice';

import MainPage from './pages/mainPage/MainPage';
import CardDescription from './pages/cardDescription/CardDescription';
import Page404 from './pages/404/404';
import LoadingPage from './pages/loadingPage/LoadingPage';
import AddCardPage from './pages/addCardPage/AddCardPage';
import EditCardPage from './pages/editCardPage/EditCardPage';
import HelpPage from './pages/helpPage/HelpPage';

import Auth from './pages/auth/Auth';
import NoAuth from './pages/noAuth/NoAuth';
import AuthLoading from './pages/authLoading/AuthLoading';
import UserPage from './pages/userPage/UserPage';
import ResetPass from './pages/resetPass/ResetPass';

function App() {
	const location = useLocation();
	const dispatch = useDispatch();

	const [firstLoad, setFirstLoad] = useState(true);
	const [currLocation, setCurrLocation] = useState(location);
	const [transitionState, setTransitionState] = useState('FadeIn');

	const auth = getAuth();

	const uid = useSelector((state) => state.auth.uid);
	const emailConfirmed = useSelector((state) => state.auth.emailConfirmed);

	const loadHandler = (message) => {
		dispatch(setSharedData(message.data));
	};

	useEffect(() => {
		navigator.serviceWorker.addEventListener('message', loadHandler);

		return () => {
			navigator.serviceWorker.removeEventListener('message', loadHandler);
		};
		// eslint-disable-next-line
	}, []);

	useEffect(() => {
		if (location.pathname !== currLocation.pathname) {
			if (firstLoad) {
				setFirstLoad(false);
			}
			setTransitionState('FadeOut');
		}
		// eslint-disable-next-line
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

	const handleAnimation = () => {
		if (transitionState === 'FadeOut') {
			setTransitionState('FadeIn');
			setCurrLocation(location);
		}
	};

	return (
		<div className={`page${transitionState}`} onAnimationEnd={handleAnimation}>
			<Routes location={currLocation}>
				{!uid ? (
					<>
						<Route path='/' element={<AuthLoading />} />
						<Route path='/auth' element={<Auth />} />
						<Route path='/resetPass' element={<ResetPass />} />
						<Route path='/userPage' element={<LoadingPage />} />
						{firstLoad ? (
							<Route path='*' element={<AuthLoading />} />
						) : (
							<Route path='*' element={<NoAuth />} />
						)}
					</>
				) : uid && !emailConfirmed ? (
					<Route path='*' element={<UserPage close={true} />} />
				) : (
					<>
						<Route path='/' element={<MainPage />} />
						<Route path='/auth' element={<LoadingPage />} />
						<Route path='/userPage' element={<UserPage />} />
						<Route path='/addCard' element={<AddCardPage />} />
						<Route path='/editCard' element={<EditCardPage />} />
						<Route path='/cardDescription/:activeChapter/:id' element={<CardDescription />} />
						<Route path='*' element={<Page404 />} />
					</>
				)}
				<Route path='/help' element={<HelpPage />} />
			</Routes>
		</div>
	);
}

export default App;

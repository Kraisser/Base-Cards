import {auth} from '../services/fireBase';
import {
	signInWithPopup,
	signOut,
	GoogleAuthProvider,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	sendEmailVerification,
} from 'firebase/auth';

import useRequests from '../services/useRequests';

export default function useAuth() {
	const actionCodeSettings = {
		url: window.location.hostname + '/userPage',
		// dynamicLinkDomain: window.location.hostname,
	};

	const {setBaseDoc} = useRequests();

	const providerGoogle = new GoogleAuthProvider();

	const signInGoogle = () => {
		return signInWithPopup(auth, providerGoogle).then((userCredential) => {
			const uid = userCredential.user.uid;

			setBaseDoc(uid);
		});
	};

	const signInEmail = (email, pass) => {
		return signInWithEmailAndPassword(auth, email, pass).then((userCredential) => {
			const uid = userCredential.user.uid;
			setBaseDoc(uid);
		});
	};

	const registerEmail = (email, pass) => {
		return createUserWithEmailAndPassword(auth, email, pass).then((userCredential) => {
			const uid = userCredential.user.uid;
			setBaseDoc(uid);
			verificateEmail();
		});
	};

	const verificateEmail = (setState) => {
		console.log('verificate');
		sendEmailVerification(auth.currentUser, actionCodeSettings)
			.then((res) => {
				console.log(res);
				if (setState) {
					setState('Подтверждение отправлено');
				}
			})
			.catch((e) => {
				console.log(e);
				console.log(window.location.hostname);
				if (setState) {
					setState('Произошла ошибка, попробуйте позже');
				}
			});
	};

	const signOutAuth = () => {
		return signOut(auth);
	};

	return {signInGoogle, signInEmail, registerEmail, signOutAuth, verificateEmail};
}

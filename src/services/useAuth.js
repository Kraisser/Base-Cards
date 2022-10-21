import {auth} from '../services/fireBase';
import {
	signInWithPopup,
	signOut,
	GoogleAuthProvider,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	sendEmailVerification,
	sendPasswordResetEmail,
} from 'firebase/auth';

import useRequests from '../services/useRequests';

export default function useAuth() {
	const {setBaseDoc} = useRequests();

	const providerGoogle = new GoogleAuthProvider();

	const signInGoogle = () => {
		return signInWithPopup(auth, providerGoogle).then((userCredential) => {
			const uid = userCredential.user.uid;

			setBaseDoc(uid);
		});
	};

	const signInEmail = (email, pass, test) => {
		if (test) {
			return signInWithEmailAndPassword(auth, 'preview-app-user@mail.ru', '137234QWErty').then(
				(userCredential) => {
					const uid = userCredential.user.uid;
					setBaseDoc(uid);
				}
			);
		}
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
		sendEmailVerification(auth.currentUser)
			.then(() => {
				if (setState) {
					setState('Подтверждение отправлено');
				}
			})
			.catch((e) => {
				if (setState) {
					setState('Произошла ошибка, попробуйте позже');
				}
			});
	};

	const resetPass = (email) => {
		return sendPasswordResetEmail(auth, email).catch((e) => {
			throw e;
		});
	};

	const signOutAuth = () => {
		return signOut(auth);
	};

	return {signInGoogle, signInEmail, registerEmail, signOutAuth, verificateEmail, resetPass};
}

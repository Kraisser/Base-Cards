import {initializeApp} from 'firebase/app';
import {getFirestore} from 'firebase/firestore';
import {getAuth} from 'firebase/auth';

const firebaseConfig = {
	apiKey: 'AIzaSyAUNZN_Mb-d8sydfZHAa_U57qKbidteuno',
	authDomain: 'base-app-d40ed.firebaseapp.com',
	projectId: 'base-app-d40ed',
	storageBucket: 'base-app-d40ed.appspot.com',
	messagingSenderId: '523989480018',
	appId: '1:523989480018:web:77224bce98afd0c5c4658b',
	measurementId: 'G-B8R1YEQT5Q',
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const auth = getAuth(app);

export default db;
export {auth};

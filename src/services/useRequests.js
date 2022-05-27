import db from './fireBase';
import {
	collection,
	doc,
	getDoc,
	updateDoc,
	getDocs,
	setDoc,
	deleteDoc,
	deleteField,
} from 'firebase/firestore';
import {useSelector} from 'react-redux';

export default function useRequests() {
	const uid = useSelector((state) => state.auth.uid);

	// const uid = localStorage.getItem('userId');
	// console.log('uid: ', uid);
	// const baseDoc = collection(db, uid);
	// const baseDoc = doc(db, baseCollection, 'data');

	const chaptersListDocsRef = collection(db, uid + '/data/chaptersList');

	const setBaseDoc = async (uid) => {
		try {
			console.log(uid);
			await setDoc(doc(db, uid, 'data'), {}, {merge: true});
		} catch (error) {
			console.log(error);
		}
	};

	const getCardList = async (id) => {
		const res = (await getDoc(doc(db, uid + '/data/cardList', id))).data();

		const keys = Object.keys(res).filter((item) => item !== 'name');

		const data = keys
			.map((item) => res[item])
			.sort((prevItem, item) => item.timeStamp - prevItem.timeStamp);

		return {
			description: res.name,
			data,
		};
	};

	const getChapters = async () => {
		const chapSnap = await getDocs(chaptersListDocsRef);
		const chapters = chapSnap.docs.map((doc) => ({id: doc.id, name: doc.data().name}));

		return chapters;
	};

	const postChapter = async (id, name) => {
		await setDoc(doc(db, uid + '/data/chaptersList', id), {
			name,
		});

		await setDoc(doc(db, uid + '/data/cardList', id), {
			name: name,
		});
	};

	const postCard = async (newCard, chapterId) => {
		await updateDoc(doc(db, uid + '/data/cardList', chapterId), {
			[newCard.id]: newCard,
		});
	};

	const deleteCard = async (id, activeProgram) => {
		const docRef = doc(db, uid + '/data/cardList', activeProgram);

		await updateDoc(docRef, {
			[id]: deleteField(),
		});
	};

	const deleteChapter = async (id) => {
		await deleteDoc(doc(db, uid + '/data/cardList', id));
		await deleteDoc(doc(db, uid + '/data/chaptersList', id));
	};

	const editChapter = async (id, name) => {
		await updateDoc(doc(db, uid + '/data/chaptersList', id), {
			name,
		});
		await updateDoc(doc(db, uid + '/data/cardList', id), {
			name,
		});
	};

	return {
		getCardList,
		getChapters,
		postChapter,
		postCard,
		deleteCard,
		deleteChapter,
		editChapter,
		setBaseDoc,
	};
}

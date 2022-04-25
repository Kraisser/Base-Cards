import useHttp from '../hooks/useHttp';

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

export default function useRequests() {
	const chaptersListDocsRef = collection(db, 'chaptersList');

	const getCardList = async (id) => {
		const res = (await getDoc(doc(db, 'cardList', id))).data();

		const keys = Object.keys(res).filter((item) => item !== 'name');

		const data = keys.map((item) => res[item]);

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
		await setDoc(doc(db, 'chaptersList', id), {
			name,
		});

		await setDoc(doc(db, 'cardList', id), {
			name: name,
		});
	};

	const postCard = async (newCard, chapterId) => {
		await updateDoc(doc(db, 'cardList', chapterId), {
			[newCard.id]: newCard,
		});
	};

	const deleteCard = async (id, activeProgram) => {
		const docRef = doc(db, 'cardList', activeProgram);

		await updateDoc(docRef, {
			[id]: deleteField(),
		});
	};

	const deleteProgramFromChapters = async (id) => {
		await deleteDoc(doc(db, 'cardList', id));
		await deleteDoc(doc(db, 'chaptersList', id));
	};

	return {
		getCardList,
		getChapters,
		postChapter,
		postCard,
		deleteCard,
		deleteProgramFromChapters,
	};
}

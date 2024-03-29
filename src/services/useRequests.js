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
import {useCallback, useMemo} from 'react';

export default function useRequests() {
	const uid = useSelector((state) => state.auth.uid);

	const chaptersRef = useMemo(() => collection(db, uid + '/data/chaptersList'), [uid]);

	const setBaseDoc = async (uid) => {
		try {
			await setDoc(doc(db, uid, 'data'), {}, {merge: true});
		} catch (error) {
			console.log(error);
		}
	};

	const initFavorite = async () => {
		await postChapter('favorite+chapter', 'Избранное');
	};

	const getAllCards = useCallback(async () => {
		const allDocs = await getDocs(collection(db, uid + '/data/cardList'));
		allDocs.forEach((doc) => console.log(doc.data()));
	}, [uid]);

	const getCardList = useCallback(
		async (chapterId) => {
			try {
				const res = (await getDoc(doc(db, uid + '/data/cardList', chapterId))).data();

				const keys = Object.keys(res).filter((item) => item !== 'name');

				const data = keys.map((item) => res[item]);

				return {
					chapterId,
					data,
				};
			} catch (error) {
				return [];
			}
		},
		[uid]
	);

	const getChapters = async () => {
		const chapSnap = await getDocs(chaptersRef);
		const chapters = chapSnap.docs.map((doc) => ({id: doc.id, name: doc.data().name}));

		return chapters;
	};

	const postChapter = useCallback(
		async (id, name) => {
			await setDoc(doc(db, uid + '/data/chaptersList', id), {
				name,
			});

			await setDoc(doc(db, uid + '/data/cardList', id), {
				name: name,
			});
		},
		[uid]
	);

	const postCard = useCallback(
		async (newCard, chapterId) => {
			await updateDoc(doc(db, uid + '/data/cardList', chapterId), {
				[newCard.id]: newCard,
			});
		},
		[uid]
	);

	const deleteCard = useCallback(
		async (id, chapterId) => {
			const docRef = doc(db, uid + '/data/cardList', chapterId);

			await updateDoc(docRef, {
				[id]: deleteField(),
			});
		},
		[uid]
	);

	const deleteChapter = useCallback(
		async (id) => {
			await deleteDoc(doc(db, uid + '/data/cardList', id));
			await deleteDoc(doc(db, uid + '/data/chaptersList', id));
		},
		[uid]
	);

	const editChapter = useCallback(
		async (id, name) => {
			await updateDoc(doc(db, uid + '/data/chaptersList', id), {
				name,
			});
			await updateDoc(doc(db, uid + '/data/cardList', id), {
				name,
			});
		},
		[uid]
	);

	return {
		getAllCards,
		getCardList,
		getChapters,
		postChapter,
		postCard,
		deleteCard,
		deleteChapter,
		editChapter,
		setBaseDoc,
		initFavorite,
	};
}

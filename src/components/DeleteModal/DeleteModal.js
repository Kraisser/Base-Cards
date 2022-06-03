import './deleteModal.css';

import {useSelector, useDispatch} from 'react-redux';

import {delModalClose} from '../../store/modalSlice';
import useUpload from '../../services/useUpload';
import {useNavigate} from 'react-router-dom';

export default function DeleteModal() {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const {onDeleteCard, deleteChapterFromList} = useUpload();

	const delModalStatus = useSelector((state) => state.modal.delModalStatus);
	const activeChapter = useSelector((state) => state.chapter.activeChapter);
	const chapterList = useSelector((state) => state.chapter.chapterList);

	const targetChapter = delModalStatus.split('+')[1] === 'chapter';

	const descrText = targetChapter ? (
		<>
			<p>Вы действительно хотите удалить этот раздел?</p>
			<p>
				Это действие необратимо. Удаление раздела также приведет к потере всей информации
				находящейся внутри него.
			</p>
		</>
	) : (
		`Вы действительно хотите удалить эту карточку? Это действие необратимо.`
	);

	const onDeleteCardItem = () => {
		onDeleteCard(delModalStatus, activeChapter);
		dispatch(delModalClose());
		navigate('/');
	};

	const onDeleteChapter = () => {
		const chapIndex = chapterList.findIndex((item) => delModalStatus === item.id);

		const chapterOrder = {
			prev: chapterList[chapIndex - 1],
			next: chapterList[chapIndex + 1],
		};

		const prevChapter = chapterOrder.prev
			? chapterOrder.prev.id
			: chapterOrder.next
			? chapterOrder.next.id
			: null;

		deleteChapterFromList(delModalStatus, prevChapter);
		dispatch(delModalClose());
	};

	return (
		<>
			<div className='modalOverlay'>
				<div className='modalWrapper'>
					<div className='modalDescription'>{descrText}</div>
					<div className='modalButWrapper'>
						<button
							className='modalBut modalGreenBut greenBut but'
							onClick={targetChapter ? onDeleteChapter : onDeleteCardItem}>
							Да
						</button>
						<button
							className='modalBut modalRedBut redBut but'
							onClick={() => dispatch(delModalClose())}>
							Нет
						</button>
					</div>
				</div>
			</div>
		</>
	);
}

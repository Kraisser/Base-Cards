import './deleteModal.css';

import {useSelector, useDispatch} from 'react-redux';

import {delModalClose} from '../../store/modalSlice';
import {useNavigate} from 'react-router-dom';

import useCards from '../../services/useCards';
import useChapter from '../../services/useChapter';
import useRequests from '../../services/useRequests';

export default function DeleteModal() {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const {onDeleteCard} = useCards();
	const {deleteCard} = useRequests();
	const {deleteChapterFromList} = useChapter();

	const delModalTarget = useSelector((state) => state.modal.delModalTarget);
	const delModalTargetId = useSelector((state) => state.modal.delModalTargetId);

	if (!delModalTarget) {
		return (
			<div className='modalOverlay'>
				<div className='modalWrapper'></div>
			</div>
		);
	}

	const targetIsChapter = delModalTarget === 'chapter';
	const targetId = delModalTargetId.id;

	const descriptionTexts = {
		chapter: (
			<>
				<p>Вы действительно хотите удалить этот раздел?</p>
				<p>
					Это действие необратимо. Удаление раздела также приведет к потере всей информации
					связанной с ним.
				</p>
			</>
		),
		card: `Вы действительно хотите удалить эту карточку? Это действие необратимо.`,
	};

	const onDeleteCardItem = () => {
		if (delModalTargetId.favorite) {
			onDeleteCard(targetId, delModalTargetId.chapId);
			deleteCard(targetId, 'favorite+chapter');
		} else {
			onDeleteCard(targetId, delModalTargetId.chapId);
		}

		dispatch(delModalClose());
		navigate('/');
	};

	const onDeleteChapter = () => {
		dispatch(delModalClose());

		deleteChapterFromList(targetId);
	};

	return (
		<>
			<div className='modalOverlay'>
				<div className='modalWrapper'>
					<div className='modalDescription'>{descriptionTexts[delModalTarget]}</div>
					<div className='modalButWrapper'>
						<button
							className='modalBut modalGreenBut greenBut but'
							onClick={targetIsChapter ? onDeleteChapter : onDeleteCardItem}>
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

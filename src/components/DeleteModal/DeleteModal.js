import './deleteModal.css';

import {useSelector, useDispatch} from 'react-redux';

import {delModalClose} from '../../store/modalSlice';
import useUpload from '../../services/useUpload';

export default function DeleteModal() {
	const dispatch = useDispatch();
	const {deleteChapItem, deleteChapter} = useUpload();

	const delModalStatus = useSelector((state) => state.modal.delModalStatus);
	const prevChapter = useSelector((state) => state.modal.prevChapter);
	const activeProgram = useSelector((state) => state.program.activeProgram);

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
		`Вы действительно хотите удалить этот пункт? Это действие необратимо.`
	);

	const onDeleteChapItem = () => {
		deleteChapItem(delModalStatus, activeProgram);
		dispatch(delModalClose());
	};

	const onDeleteChapter = () => {
		deleteChapter(delModalStatus, prevChapter);
		dispatch(delModalClose());
	};

	return (
		<>
			<div className='modalOverlay'>
				<div className='modalWrapper'>
					<div className='modalDescription'>{descrText}</div>
					<div className='modalButWrapper'>
						<button
							className='modalBut greenBut but'
							onClick={targetChapter ? onDeleteChapter : onDeleteChapItem}>
							Да
						</button>
						<button className='modalBut redBut but' onClick={() => dispatch(delModalClose())}>
							Нет
						</button>
					</div>
				</div>
			</div>
		</>
	);
}

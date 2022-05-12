import './deleteModal.css';

import {useSelector, useDispatch} from 'react-redux';

import {delModalClose} from '../../store/modalSlice';
import useUpload from '../../services/useUpload';

export default function DeleteModal() {
	const dispatch = useDispatch();
	const {onDeleteCard, deleteChapter} = useUpload();

	const delModalStatus = useSelector((state) => state.modal.delModalStatus);
	const activeProgram = useSelector((state) => state.program.activeProgram);
	const programList = useSelector((state) => state.program.programList);

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
		onDeleteCard(delModalStatus, activeProgram);
		dispatch(delModalClose());
	};

	const onDeleteChapter = () => {
		const chapIndex = programList.findIndex((item) => delModalStatus === item.id);

		const chapterOrder = {
			first: programList[chapIndex - 1],
			second: programList[chapIndex + 1],
		};

		const prevChapter = chapterOrder.first
			? chapterOrder.first.id
			: chapterOrder.second
			? chapterOrder.second.id
			: null;

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

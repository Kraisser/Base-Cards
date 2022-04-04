import './deleteModal.css';

import {useSelector, useDispatch} from 'react-redux';

import {delModalClose} from '../../store/modalSlice';
import useUpload from '../../services/useUpload';

export default function DeleteModal() {
	const dispatch = useDispatch();
	const {deleteChapItem} = useUpload();

	const delModalStatus = useSelector((state) => state.modal.delModalStatus);
	const activeProgram = useSelector((state) => state.program.activeProgram);

	const onDeleteEx = () => {
		deleteChapItem(delModalStatus, activeProgram);
		dispatch(delModalClose());
	};

	return (
		<>
			<div className='modalOverlay'>
				<div className='modalWrapper'>
					<div className='modalDescription'>Вы действительно хотите удалить этот пункт</div>
					<div className='modalButWrapper'>
						<button className='modalBut greenBut but' onClick={onDeleteEx}>
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

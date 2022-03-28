import '../../index.css';
import './exerciseItem.css';

import {Link} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import {delModalOpen} from '../../store/modalSlice';

export default function ExerciseItem({exercise}) {
	const dispatch = useDispatch();

	const activeProgram = useSelector((state) => state.program.activeProgram);

	const {img, name, muscles, id} = exercise;

	const onDeleteEx = () => {
		dispatch(delModalOpen(id));
	};

	return (
		<div className='exerciseItemWrapper'>
			<div className='exerciseItemImgWrapper'>
				<img src={img} alt={name} className='exerciseItemImg' />
			</div>
			<div className='exerciseItemDescriptionWrapper'>
				<h3 className='exerciseItemHeader'>{name}</h3>
				<p className=''>{muscles}</p>
				<div className='exButWrapper'>
					<Link to={`/exerciseDescription/${activeProgram}/${id}`}>
						<button className='descriptionBut but'>Подробнее</button>
					</Link>
					<button className='redBut but' onClick={onDeleteEx}>
						Удалить
					</button>
				</div>
			</div>
		</div>
	);
}

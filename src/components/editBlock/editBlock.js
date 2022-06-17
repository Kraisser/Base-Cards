import './editBlock.css';

import {Link} from 'react-router-dom';

import AddChapter from '../AddChapter/AddChapter';

export default function EditBlock() {
	return (
		<div className='editWrapper'>
			<div className='editHeader'>
				<h2>Редактирование</h2>
			</div>
			<div className='editContainer'>
				<div className='addChapterWrapper'>
					<AddChapter />
				</div>
				<div className='formLinkButWrapper'>
					<button className='formLinkBut but'>
						<Link to='/editForm'>Добавить карточку</Link>
					</button>
				</div>
			</div>
		</div>
	);
}

import './programItem.css';

import delIcon from './delete-icon.png';

export default function ProgramItem({name, onClick, onDelete}) {
	const clickDelegation = (e) => {
		if (e.target.classList.contains('delIcon')) {
			onDelete();
		} else {
			onClick();
		}
	};

	return (
		<div className='programItem' onClick={clickDelegation}>
			{name}
			<img src={delIcon} alt='name' className='delIcon' />
		</div>
	);
}

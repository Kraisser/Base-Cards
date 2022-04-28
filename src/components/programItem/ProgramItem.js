import './programItem.css';

import delIcon from '../../assets/icons/delete-icon.png';

export default function ProgramItem({name, onClick, onDelete}) {
	const clickDelegation = (e) => {
		if (e.target.classList.contains('chapterDelIcon')) {
			onDelete();
		} else {
			onClick();
		}
	};

	return (
		<div className='programItem' onClick={clickDelegation}>
			{name}
			<img src={delIcon} alt='name' className='chapterDelIcon' />
		</div>
	);
}

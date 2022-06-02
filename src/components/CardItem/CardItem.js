import '../../index.css';
import './cardItem.css';

import {Link, useNavigate} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
// import {delModalOpen} from '../../store/modalSlice';

// import delIcon from '../../assets/icons/delete-icon.png';
// import browserIcon from '../../assets/icons/browser.png';
// import infoIcon from '../../assets/icons/info.png';

export default function CardItem({content}) {
	// const dispatch = useDispatch();
	const navigate = useNavigate();

	const activeChapter = useSelector((state) => state.chapter.activeChapter);

	const {name, description, link, id} = content;

	// const onDeleteEx = () => {
	// 	dispatch(delModalOpen(id));
	// };

	const delegateLink = (e) => {
		if (e.target.classList.contains('cardItemLink')) {
			return;
		}
		setTimeout(() => {
			navigate(`/cardDescription/${activeChapter}/${id}`);
		}, 100);
	};

	return (
		<div className='cardItemWrapper' onClick={delegateLink}>
			<div className='cardItemDescriptionWrapper'>
				<div className='cardItemContainer'>
					<h3 className='cardItemHeader'>{name}</h3>
				</div>
				<div className='cardItemContainer'>
					<a
						href={link}
						title={link}
						target='_blank'
						rel='noopener noreferrer'
						className='cardItemLink'>
						{link}
					</a>
				</div>
				<div className='cardItemContainer'>
					<p className='cardItemDescription'>
						{description ? description : 'Описание отсутствует'}
					</p>
				</div>
			</div>

			{/* <div className='controlWrapper'>
				<div className='controlContainer'>
					<img src={delIcon} alt='Del' onClick={onDeleteEx} className='delIcon delIcon-chapItem' />
				</div>
				<div className='controlContainer'>
					<a href={link} target='_blank' title={link} rel='noopener noreferrer'>
						<img className='browserIcon' src={browserIcon} alt='browserIcon' />
					</a>
				</div>
				<div className='controlContainer'>
					<Link to={`/cardDescription/${activeChapter}/${id}`}>
						<img src={infoIcon} className='infoIcon' alt='info' />
					</Link>
				</div>
			</div> */}
		</div>
	);
}

import '../../index.css';
import './cardItem.css';

import {useNavigate} from 'react-router-dom';
import {useSelector} from 'react-redux';

export default function CardItem({content}) {
	const navigate = useNavigate();

	const activeChapter = useSelector((state) => state.chapter.activeChapter);

	const {name, description, link, id} = content;

	const linkAvailableClass = link
		? 'cardItemDescriptionLinkWrapper'
		: 'cardItemDescriptionNoLinkWrapper';

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
			<div className={linkAvailableClass}>
				<div className='cardItemContainer'>
					<h4 className='cardItemHeader'>{name}</h4>
				</div>
				{link ? (
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
				) : null}
				<div className='cardItemContainer'>
					<p className='cardItemDescription'>
						{description ? description : 'Описание отсутствует'}
					</p>
				</div>
			</div>
		</div>
	);
}

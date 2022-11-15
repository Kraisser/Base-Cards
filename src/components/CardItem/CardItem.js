import '../../index.css';
import './cardItem.css';

import {useNavigate} from 'react-router-dom';
import {useSelector} from 'react-redux';

import useFavourites from '../../services/useFavourites';

import FavouriteIcon from '../FavouriteIcon/FavouriteIcon';

export default function CardItem({content}) {
	const navigate = useNavigate();
	const {addFavourite, deleteFromFavourite} = useFavourites();

	const activeChapter = useSelector((state) => state.chapter.activeChapter);

	const {name, description, link, id, favourite} = content;

	const linkAvailableClass = link
		? 'cardItemDescriptionLinkWrapper'
		: 'cardItemDescriptionNoLinkWrapper';

	const delegateLink = (e) => {
		if (e.target.classList.contains('cardItemLink')) {
			return;
		}
		if (e.target.classList.contains('favouriteStar')) {
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
					<FavouriteIcon
						favourite={favourite}
						onAdd={() => addFavourite(content, activeChapter)}
						onDelete={() => deleteFromFavourite(content, activeChapter)}
					/>
					<p className='cardItemDescription'>
						{description ? description : 'Описание отсутствует'}
					</p>
				</div>
			</div>
		</div>
	);
}

import '../../index.css';
import './cardItem.css';

import {useNavigate} from 'react-router-dom';

import useFavorites from '../../services/useFavorites';

import FavoriteIcon from '../iconsComponents/FavouriteIcon/FavoriteIcon';

export default function CardItem({content, activeChapter}) {
	const navigate = useNavigate();
	const {addFavorite, deleteFromFavorite} = useFavorites();

	const {name, description, link, id, favorite, fromChapterId} = content;

	const linkAvailableClass = link
		? 'cardItemDescriptionLinkWrapper'
		: 'cardItemDescriptionNoLinkWrapper';

	const delegateLink = (e) => {
		if (e.target.classList.contains('cardItemLink')) {
			return;
		}
		if (e.target.classList.contains('favoriteStar')) {
			return;
		}
		setTimeout(() => {
			navigate(`/cardDescription/${fromChapterId || activeChapter}/${id}`);
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
				<FavoriteIcon
					favorite={favorite}
					onAdd={() => addFavorite(content, activeChapter)}
					onDelete={() => deleteFromFavorite(content, activeChapter)}
				/>
			</div>
		</div>
	);
}

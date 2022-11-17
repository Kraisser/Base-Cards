import '../../index.css';
import './cardItem.css';

import {useNavigate} from 'react-router-dom';
import {useSelector} from 'react-redux';

import useFavorites from '../../services/useFavorites';

import FavoriteIcon from '../FavouriteIcon/FavoriteIcon';

export default function CardItem({content}) {
	const navigate = useNavigate();
	const {addFavourite, deleteFromFavourite} = useFavorites();

	const activeChapter = useSelector((state) => state.chapter.activeChapter);

	const {name, description, link, id, favorite} = content;

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
			navigate(`/cardDescription/${content.fromChapterId || activeChapter}/${id}`);
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
					<FavoriteIcon
						favorite={favorite}
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

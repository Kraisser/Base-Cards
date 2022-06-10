import './cardList.css';

import {useMemo} from 'react';
import {useSelector} from 'react-redux';
import {v4 as uuid} from 'uuid';

import CardListItem from '../CardItem/CardItem';

import setContent from '../../utils/setContent';
import SearchForm from '../SearchForm/SearchForm';

export default function CardList() {
	const cardList = useSelector((state) => state.cardList.cardList);
	const filteredCardList = useSelector((state) => state.cardList.filteredCardList);
	const cardListStatus = useSelector((state) => state.cardList.cardListStatus);

	const chapHeader = cardList.description ? cardList.description : 'Выберите раздел';

	const content = useMemo(
		() => setContent(cardListStatus, View, filteredCardList),
		[filteredCardList, cardListStatus]
	);

	return (
		<div className='cardListWrapper'>
			<div className='cardListHeader'>
				<h2 title={chapHeader}>{chapHeader}</h2>
				<div className='cardSearchWrapper'>
					<SearchForm searchList={cardList} searchTarget={'card'} placeholder={'Поиск карточек'} />
				</div>
				{/* <div className='formLinkButWrapper'></div> */}
			</div>

			{content}
		</div>
	);
}

function View({data}) {
	const content = data.map((item) => <CardListItem content={item} key={uuid()} />);
	const emptyContent = (
		<div className='emptyCardList'>
			<h3>В этом разделе пока пусто</h3>
		</div>
	);
	return (
		<>{content.length === 0 ? emptyContent : <div className='cardListContainer'>{content}</div>}</>
	);
}

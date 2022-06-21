import './cardList.css';

import {useMemo, useEffect} from 'react';
import {useSelector} from 'react-redux';
import {v4 as uuid} from 'uuid';

import useCards from '../../services/useCards';

import CardListItem from '../CardItem/CardItem';

import setContent from '../../utils/setContent';
import SearchForm from '../SearchForm/SearchForm';

export default function CardList() {
	const {updateCardList} = useCards();

	const cardList = useSelector((state) => state.cardList.cardList);
	const filteredCardList = useSelector((state) => state.cardList.filteredCardList);
	const cardListStatus = useSelector((state) => state.cardList.cardListStatus);
	const activeChapter = useSelector((state) => state.chapter.activeChapter);

	useEffect(() => {
		if (cardList.chapterId !== activeChapter) {
			updateCardList(activeChapter);
		}
	}, [activeChapter]);

	const chapHeader = cardList.description
		? cardList.description
		: cardListStatus === 'firstLoad'
		? 'Выберите раздел'
		: 'Пожалуйста подождите';

	const content = useMemo(
		() => setContent(cardListStatus, View, filteredCardList),
		[filteredCardList, cardListStatus]
	);

	const searchAvailable = cardList.data && cardList.data.length !== 0;

	return (
		<div className='cardListWrapper'>
			<div className='cardListHeader'>
				<h3 title={chapHeader}>{chapHeader}</h3>
				{searchAvailable ? (
					<div className='cardSearchWrapper'>
						<SearchForm
							searchList={cardList.data ? cardList.data : false}
							searchTarget={'card'}
							placeholder={'Поиск карточек'}
						/>
					</div>
				) : null}
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

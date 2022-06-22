import './cardList.css';

import {useMemo, useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {CSSTransition, TransitionGroup} from 'react-transition-group';

import useCards from '../../services/useCards';

import CardListItem from '../CardItem/CardItem';

import setContent from '../../utils/setContent';
import SearchForm from '../SearchForm/SearchForm';
import CardAddForm from '../CardAddForm/CardAddForm';

export default function CardList() {
	const {updateCardList} = useCards();

	const [fastAdd, setFastAdd] = useState(false);

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

	const openFastAdd = () => {
		setFastAdd(true);
	};
	const closeFastAdd = (e) => {
		if (
			e.target.classList.contains('modalOverlay') ||
			e.target.classList.contains('modalCloseIcon')
		) {
			setFastAdd(false);
		}
	};

	const searchAvailable = cardList.data && cardList.data.length !== 0;

	return (
		<>
			<div className='cardListWrapper'>
				<div className='cardListHeader'>
					<h3 title={chapHeader}>{chapHeader}</h3>
					{activeChapter ? (
						<div className='cardListFastAddButWrapper'>
							<button className='but fastAddBut' onClick={openFastAdd}>
								Быстрая заметка
							</button>
						</div>
					) : null}

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

			<CSSTransition classNames='add-modal' timeout={200} in={fastAdd} unmountOnExit mountOnEnter>
				<div className='modalOverlay fastAddOverlay' onClick={closeFastAdd}>
					<CardAddForm modalClose={setFastAdd} />
				</div>
			</CSSTransition>

			{activeChapter ? (
				<button className='fastAddIcon but' onClick={openFastAdd}>
					+
				</button>
			) : null}
		</>
	);
}

function View({data}) {
	const content = data.map((item, index) => (
		<CSSTransition classNames='card-item' timeout={300 + index * 50} key={item.id} appear={true}>
			<CardListItem content={item} />
		</CSSTransition>
	));

	const emptyContent = (
		<div className='emptyCardList'>
			<h3>В этом разделе пока пусто</h3>
		</div>
	);

	return content.length === 0 ? (
		emptyContent
	) : (
		<TransitionGroup className='cardListContainer'>{content}</TransitionGroup>
	);
}

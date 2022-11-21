import './cardList.css';

import {useMemo, useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {CSSTransition, TransitionGroup} from 'react-transition-group';

import useCards from '../../services/useCards';
import useSort from '../../services/useSort';

import CardItem from '../CardItem/CardItem';

import setContent from '../../utils/setContent';
import SearchForm from '../SearchForm/SearchForm';
import CardAddForm from '../CardAddForm/CardAddForm';

import fastAddIcon from '../../assets/icons/fast-add.png';

export default function CardList() {
	const {updateCardList} = useCards();
	const {sortCardsByTime} = useSort();

	const [fastAdd, setFastAdd] = useState(false);

	const cardList = useSelector((state) => state.cardList.cardList);
	const cardListChapterId = useSelector((state) => state.cardList.cardListChapter);
	const filteredCardList = useSelector((state) => state.cardList.filteredCardList);
	const cardListStatus = useSelector((state) => state.cardList.cardListStatus);
	const activeChapter = useSelector((state) => state.chapter.activeChapter);
	const activeChapterName = useSelector((state) => state.chapter.activeChapterName);

	useEffect(() => {
		if (cardListChapterId !== activeChapter) {
			updateCardList(activeChapter);
		}
		// eslint-disable-next-line
	}, [activeChapter]);

	const chapHeader = activeChapterName
		? activeChapterName
		: cardListStatus === 'firstLoad'
		? 'Раздел не выбран'
		: cardListStatus === 'error'
		? 'Раздел не найден'
		: 'Пожалуйста подождите';

	const content = useMemo(() => {
		const data = sortCardsByTime(filteredCardList);

		return setContent(cardListStatus, View, data, {activeChapter});
		// eslint-disable-next-line
	}, [filteredCardList, cardListStatus]);

	const openFastAdd = () => {
		setFastAdd(true);
	};
	const closeFastAdd = (e, forceClose) => {
		if (forceClose) {
			setFastAdd(false);
			return;
		}

		if (
			e.target.classList.contains('modalOverlay') ||
			e.target.classList.contains('modalCloseIcon')
		) {
			setFastAdd(false);
		}
	};

	const searchAvailable = cardList && cardList.length > 0;

	return (
		<>
			<div className='cardListWrapper'>
				<div className='cardListHeader'>
					<h3 title={chapHeader}>{chapHeader}</h3>
					{activeChapter && activeChapter !== 'favorite+chapter' ? (
						<div className='cardListFastAddButWrapper'>
							<button className='but fastAddBut' onClick={openFastAdd}>
								Быстрая заметка
							</button>
						</div>
					) : null}

					{searchAvailable ? (
						<div className='cardSearchWrapper'>
							<SearchForm
								searchList={cardList ? cardList : false}
								searchTarget={'card'}
								placeholder={'Поиск карточек'}
							/>
						</div>
					) : null}
				</div>

				{cardListStatus === 'firstLoad' ? (
					<p className='firstLoadWrapper'>
						Для начала работы выберите раздел или нажмите 'Добавить карточку'
					</p>
				) : cardListStatus === 'idle' &&
				  cardList.length === 0 &&
				  activeChapter === 'favorite+chapter' ? (
					<div className='emptyCardList'>
						<h4>Вы еще ничего не добавили в избранное</h4>
						<p>
							Чтобы добавить карточку в этот раздел перейдите в любой раздел и нажмите на иконку
							добавить в избранное
						</p>
					</div>
				) : (
					content
				)}
			</div>

			<CSSTransition classNames='add-modal' timeout={200} in={fastAdd} unmountOnExit mountOnEnter>
				<div className='modalOverlay fastAddOverlay' onClick={closeFastAdd}>
					<CardAddForm modalClose={closeFastAdd} />
				</div>
			</CSSTransition>

			{activeChapter && activeChapter !== 'favorite+chapter' ? (
				<button className='fastAddIcon but' onClick={openFastAdd}>
					<img src={fastAddIcon} alt='Добавить в раздел' />
				</button>
			) : null}
		</>
	);
}

function View({data, activeChapter}) {
	console.log('activeChapter: ', activeChapter);
	const content = data.map((item, index) => (
		<CSSTransition classNames='card-item' timeout={300 + index * 50} key={item.id} appear={true}>
			<CardItem content={item} activeChapter={activeChapter} />
		</CSSTransition>
	));

	const emptyContent = (
		<div className='emptyCardList'>
			<h4>В этом разделе пока пусто</h4>
			<p>
				Чтобы добавить карточку в этот раздел нажмите
				{window.innerWidth > 750 ? ' "Быстрая заметка"' : ' на иконку + в правом нижнем углу'}
			</p>
		</div>
	);

	return content.length === 0 ? (
		emptyContent
	) : (
		<TransitionGroup className='cardListContainer'>{content}</TransitionGroup>
	);
}

import './cardDescription.css';
import '../../css/common.css';

import {useEffect} from 'react';
import {useParams, Link, useNavigate} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import {CSSTransition} from 'react-transition-group';

import setContent from '../../utils/setContent';
import useCards from '../../services/useCards';
import useChapter from '../../services/useChapter';
import useClock from '../../services/useClock';

import PageHeader from '../../components/PageHeader/PageHeader';
import DeleteModal from '../../components/DeleteModal/DeleteModal';

import Page404 from '../404/404';

import {setCard} from '../../store/editSlice';
import {delModalOpen} from '../../store/modalSlice';
import {setActiveChapter} from '../../store/chapterSlice';

export default function CardDescription() {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const {updateChapters} = useChapter();
	const {updateCardList} = useCards();
	const {getFullDate} = useClock();

	const {id, activeChapter} = useParams();

	const cardList = useSelector((state) => state.cardList.cardList);
	const cardListStatus = useSelector((state) => state.cardList.cardListStatus);
	const activeChapterState = useSelector((state) => state.chapter.activeChapter);
	const chapterList = useSelector((state) => state.chapter.chapterList);
	const delModalTarget = useSelector((state) => state.modal.delModalTarget);

	useEffect(() => {
		if (cardListStatus !== 'idle' && activeChapter && id) {
			updateCardList(activeChapter);
		}
		if (chapterList.length === 0) {
			updateChapters();
		}
		// eslint-disable-next-line
	}, []);

	useEffect(() => {
		if (!activeChapterState && chapterList.length > 0) {
			const item = chapterList.find((item) => item.id === activeChapter);

			if (item) {
				dispatch(setActiveChapter({id: item.id, name: item.name}));
			}
		}
		// eslint-disable-next-line
	}, [chapterList]);

	if (!cardList) {
		return <></>;
	}

	const currentCard = cardList.find((item) => item.id === id);

	if (!currentCard) {
		return <Page404 />;
	}

	const onEditCard = () => {
		dispatch(setCard({activeChapter, currentCard}));
		navigate('/editForm');
	};

	const onDeleteCard = () => {
		dispatch(
			delModalOpen({
				target: 'card',
				id,
				chapId: activeChapter,
				fromChapterId: currentCard.fromChapterId,
				favorite: currentCard.favorite,
			})
		);
	};

	const timeData = getFullDate(currentCard.timeStamp);

	return (
		<>
			<PageHeader burger={false} />

			<div className='cardDescriptionWrapper pageContentWrapper '>
				<div className='cardDescrWrapper pageContentContainer'>
					{setContent(cardListStatus, View, currentCard, {onEditCard, onDeleteCard, timeData})}
				</div>
				<div className='cardDescButWrapper'>
					<Link to='/'>
						<button className='onMainBut but'>на главную</button>
					</Link>
				</div>
			</div>
			<CSSTransition
				classNames='add-modal'
				timeout={200}
				in={!!delModalTarget}
				unmountOnExit
				mountOnEnter>
				<DeleteModal />
			</CSSTransition>
		</>
	);
}

function View({data, onEditCard, onDeleteCard, timeData}) {
	const {name, link, description} = data;
	const {hour, min, dayInMonth, month, year} = timeData;

	const time = `${hour}:${min}`;
	const curDate = `${dayInMonth}.${month}.${year}`;

	return (
		<>
			<div className='cardDescriptionHeaderWrapper'>
				<div className='descriptionDateWrapper'>
					<div className='dateDescr'>Дата создания</div>
					<div className='descrTimeWrapper'>{time}</div>
					<div className='descrDateWrapper'>{curDate}</div>
				</div>
				<h2 className='cardDescriptionHeader'>{name}</h2>
			</div>
			{link ? (
				<div className='cardDescriptionContainer'>
					<h4 className='cardDescriptionContainerHeader'>Ссылка:</h4>
					<a href={link} target='_blank' rel='noopener noreferrer' className='cardDescriptionLink'>
						{link}
					</a>
				</div>
			) : null}

			<div className='cardDescriptionContainer'>
				<h4 className='cardDescriptionContainerHeader'>Описание:</h4>
				<p className='cardDescription'>{description ? description : 'Описание отсутствует'}</p>
			</div>
			<div className='cardDescButWrapper'>
				<button className='but cardDescBut' onClick={onEditCard}>
					Редактировать
				</button>
				<button className='but cardDescBut' onClick={onDeleteCard}>
					Удалить
				</button>
			</div>
		</>
	);
}

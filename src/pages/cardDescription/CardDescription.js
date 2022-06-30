import './cardDescription.css';
import '../../css/common.css';

import {useEffect} from 'react';
import {useParams, Link, useNavigate} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';

import setContent from '../../utils/setContent';
import useCards from '../../services/useCards';

import PageHeader from '../../components/PageHeader/PageHeader';
import DeleteModal from '../../components/DeleteModal/DeleteModal';

import Page404 from '../404/404';

import {setCard} from '../../store/editSlice';
import {delModalOpen} from '../../store/modalSlice';

export default function CardDescription() {
	console.log('cardDescrRender');
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const {updateCardList} = useCards();

	const {id, activeChapter} = useParams();

	const cardList = useSelector((state) => state.cardList.cardList);
	const cardListStatus = useSelector((state) => state.cardList.cardListStatus);

	useEffect(() => {
		if (cardListStatus !== 'idle' && activeChapter && id) {
			updateCardList(activeChapter);
		}
		// eslint-disable-next-line
	}, []);

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
			})
		);
	};

	return (
		<>
			<PageHeader burger={false} />

			<div className='cardDescriptionWrapper pageContentWrapper '>
				<div className='cardDescrWrapper pageContentContainer'>
					{setContent(cardListStatus, View, currentCard, {onEditCard, onDeleteCard})}
				</div>
				<div className='cardDescButWrapper'>
					<Link to='/'>
						<button className='onMainBut but'>на главную</button>
					</Link>
				</div>
			</div>
			<DeleteModal />
		</>
	);
}

function View({data, onEditCard, onDeleteCard}) {
	const {name, link, timeStamp, description} = data;
	const date = new Date(timeStamp);

	const hour = date.getHours();
	const minute = date.getMinutes();
	const day = date.getDate();
	const month = date.getMonth() + 1;

	const curHour = hour < 10 ? `0${hour}` : hour;
	const curMinute = minute < 10 ? `0${minute}` : minute;
	const curDay = day < 10 ? `0${day}` : day;
	const curMonth = month < 10 ? `0${month}` : month;
	const curYear = date.getFullYear();

	const time = `${curHour}:${curMinute}`;
	const curDate = `${curDay}.${curMonth}.${curYear}`;

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

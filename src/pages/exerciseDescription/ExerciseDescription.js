import './exerciseDescription.css';
import '../../css/common.css';

import {useEffect} from 'react';
import {useParams, Link, useNavigate} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';

import setContent from '../../utils/setContent';
import useUpdate from '../../services/useUpdate';

import PageHeader from '../../components/pageHeader/PageHeader';
import Page404 from '../404/404';

import {setCard} from '../../store/editSlice';

import editIcon from '../../assets/icons/edit-icon.png';

export default function ExerciseDescription() {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const {updateChapList} = useUpdate();

	const {id, activeProgram} = useParams();

	const chapList = useSelector((state) => state.chapList.chapList);
	const chapListStatus = useSelector((state) => state.chapList.chapListStatus);

	useEffect(() => {
		if (chapListStatus !== 'idle' && activeProgram && id) {
			updateChapList(activeProgram);
		}
		// eslint-disable-next-line
	}, []);

	if (!chapList.data) {
		return <></>;
	}
	const currentCard = chapList.data.find((item) => item.id === id);
	if (!currentCard) {
		return <Page404 />;
	}

	const onEditCard = () => {
		dispatch(setCard({activeProgram, currentCard}));
		navigate('/editForm');
	};

	return (
		<>
			<PageHeader />

			<div className='exerciseDescriptionWrapper'>
				<div className='cardDescrWrapper'>
					<img src={editIcon} alt='Edit icon' className='editIcon' onClick={onEditCard} />
					{setContent(chapListStatus, View, currentCard, {id})}
				</div>
				<div className='exDescButWrapper'>
					<button className='onMainBut but'>
						<Link to='/'>на главную</Link>
					</button>
				</div>
			</div>
		</>
	);
}

function View({data}) {
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
			<div className='exerciseDescriptionHeaderWrapper'>
				<div className='descriptionDateWrapper'>
					<div className='dateDescr'>Дата создания</div>
					<div className='descrTimeWrapper'>{time}</div>
					<div className='descrDateWrapper'>{curDate}</div>
				</div>
				<h1 className='exerciseDescriptionHeader'>{name}</h1>
			</div>
			<h3 className=''>Ссылка:</h3>
			<a href={link} target='_blank' rel='noopener noreferrer'>
				{link}
			</a>
			<h3>Описание:</h3>
			<p className='exerciseDescription'>{description ? description : 'Описание отсутствует'}</p>
		</>
	);
}

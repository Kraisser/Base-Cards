import './exerciseDescription.css';

import {useEffect} from 'react';
import {useParams, Link} from 'react-router-dom';
import {useSelector} from 'react-redux';

import setContent from '../../utils/setContent';
import useUpdate from '../../services/useUpdate';

import PageHeader from '../../components/pageHeader/PageHeader';

export default function ExerciseDescription() {
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

	return (
		<>
			<PageHeader />
			{setContent(chapListStatus, View, chapList, {id})}
			<div className='exDescButWrapper'>
				<button className='onMainBut but redBut'>
					<Link to='/'>на главную</Link>
				</button>
			</div>
		</>
	);
}

function View({data, id}) {
	const content = data.data.find((item) => item.id === id);
	const {name, link, timeStamp, description} = content;
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
		<div className='exerciseDescriptionWrapper'>
			<div className='exerciseDescriptionHeaderWrapper'>
				<div className='descriptionDateWrapper'>
					<div className='dateDescr'>Дата создания</div>
					<div className='descrTimeWrapper'>{time}</div>
					<div className='descrDateWrapper'>{curDate}</div>
				</div>
				<h1 className='exerciseDescriptionHeader'>{name}</h1>
			</div>
			<h3 className=''>Ссылка:</h3>
			<p>{link}</p>
			<h3>Описание:</h3>
			<p className='exerciseDescription'>{description ? description : 'Описание отсутствует'}</p>
		</div>
	);
}

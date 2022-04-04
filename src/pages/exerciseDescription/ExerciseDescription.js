import './exerciseDescription.css';

import {useEffect} from 'react';
import {useParams, Link} from 'react-router-dom';
import {useSelector} from 'react-redux';

import setContent from '../../utils/setContent';
import useUpdate from '../../services/useUpdate';

import PageHeader from '../../components/pageHeader/PageHeader';

export default function ExerciseDescription() {
	const {updateChapList} = useUpdate();

	const id = useParams().id;

	const chapList = useSelector((state) => state.chapList.chapList);
	const chapListStatus = useSelector((state) => state.chapList.chapListStatus);

	useEffect(() => {
		if (chapList !== 'idle') {
			updateChapList();
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
	const content = data.chapContent.find((item) => item.id === id);
	const {name, link, description} = content;

	return (
		<div className='exerciseDescriptionWrapper'>
			<h1 className='exerciseDescriptionHeader'>{name}</h1>
			<h3 className=''>Ссылка</h3>
			<p>{link}</p>
			<h3>Описание:</h3>
			<p className='exerciseDescription'>{description ? description : 'Описание отсутствует'}</p>
		</div>
	);
}

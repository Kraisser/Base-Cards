import './exerciseDescription.css';

import {useEffect} from 'react';
import {useParams, Link} from 'react-router-dom';
import {useSelector} from 'react-redux';

import setContent from '../../utils/setContent';
import useUpdate from '../../services/useUpdate';

import PageHeader from '../../components/pageHeader/PageHeader';

export default function ExerciseDescription() {
	const {updateExercises} = useUpdate();

	const id = useParams().id;

	const exList = useSelector((state) => state.exercise.exerciseList);
	const exListStatus = useSelector((state) => state.exercise.exerciseListStatus);

	useEffect(() => {
		if (exListStatus !== 'idle') {
			updateExercises();
		}
		// eslint-disable-next-line
	}, []);

	return (
		<>
			<PageHeader />
			{setContent(exListStatus, View, exList, {id})}
			<div className='exDescButWrapper'>
				<button className='onMainBut but redBut'>
					<Link to='/'>на главную</Link>
				</button>
			</div>
		</>
	);
}

function View({data, id}) {
	const exercise = data.exerciseList.find((item) => item.id === id);
	const {name, muscles, img} = exercise;

	return (
		<div className='exerciseDescriptionWrapper'>
			<img src={img} alt={name} className='exerciseDescriptionImg' />
			<h1 className='exerciseDescriptionHeader'>{name}</h1>
			<h3 className=''>Целевые мышцы:</h3>
			<p>{muscles}</p>
			<h3>Техника выполнения:</h3>
			<p className='exerciseDescription'>
				Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nemo, similique doloremque animi
				rerum obcaecati officiis rem harum laborum optio iure dolorem quam vel voluptatibus nam, quo
				enim porro? Temporibus, nam. Lorem ipsum dolor sit amet, consectetur adipisicing elit.
				Soluta, provident distinctio nam repellat eius porro obcaecati. Culpa earum itaque
				perspiciatis tempore ea, expedita dolore, magni, maxime animi illum deleniti fuga.
			</p>
		</div>
	);
}

import './exerciseList.css';

import {useSelector} from 'react-redux';
import {useEffect} from 'react';
import {v4 as uuid} from 'uuid';

import ExerciseItem from '../exerciseItem/ExerciseItem';

import useUpdate from '../../services/useUpdate';
import setContent from '../../utils/setContent';

export default function ExerciseList() {
	const {updateExercises} = useUpdate();

	const exerciseList = useSelector((state) => state.exercise.exerciseList);
	const exerciseListStatus = useSelector((state) => state.exercise.exerciseListStatus);

	useEffect(() => {
		if (exerciseListStatus !== 'idle') {
			updateExercises();
		}
		// eslint-disable-next-line
	}, []);

	return (
		<div className='exerciseListWrapper'>
			<div className='exerciseListHeader'>
				<h2>{exerciseList.description ? exerciseList.description : 'Выберите программу'}</h2>
			</div>

			{setContent(exerciseListStatus, View, exerciseList)}
		</div>
	);
}

function View({data}) {
	return (
		<div className='exerciseListContainer'>
			{data.exerciseList.map((item) => (
				<ExerciseItem exercise={item} key={uuid()} />
			))}
		</div>
	);
}

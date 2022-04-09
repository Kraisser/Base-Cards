import './chapList.css';

import {useSelector} from 'react-redux';
import {useEffect} from 'react';
import {v4 as uuid} from 'uuid';

import ChapListItem from '../chapListItem/ChapListItem';

import useUpdate from '../../services/useUpdate';
import setContent from '../../utils/setContent';

export default function ChapList() {
	const {updateChapList} = useUpdate();

	const chapList = useSelector((state) => state.chapList.chapList);
	const chapListStatus = useSelector((state) => state.chapList.chapListStatus);

	useEffect(() => {
		if (chapListStatus !== 'idle') {
			updateChapList();
		}
		// eslint-disable-next-line
	}, []);

	return (
		<div className='exerciseListWrapper'>
			<div className='exerciseListHeader'>
				<h2>{chapList.description ? chapList.description : 'Выберите раздел'}</h2>
			</div>
			
			{setContent(chapListStatus, View, chapList)}
		</div>
	);
}

function View({data}) {
	return (
		<div className='exerciseListContainer'>
			{data.chapContent.map((item) => (
				<ChapListItem content={item} key={uuid()} />
			))}
		</div>
	);
}

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
				<h2>{chapList.description ? `Раздел: "${chapList.description}"` : 'Выберите раздел'}</h2>
				<div className='formLinkButWrapper'></div>
			</div>

			{setContent(chapListStatus, View, chapList)}
		</div>
	);
}

function View({data}) {
	const content = data.data.map((item) => <ChapListItem content={item} key={uuid()} />);
	const emptyContent = (
		<div className='emptyChapList'>
			<h3>В этом разделе пока пусто.</h3>
		</div>
	);
	return (
		<>
			{content.length === 0 ? emptyContent : <div className='exerciseListContainer'>{content}</div>}
		</>
	);
}

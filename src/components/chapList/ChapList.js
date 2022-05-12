import './chapList.css';

import {useSelector} from 'react-redux';
import {v4 as uuid} from 'uuid';

import ChapListItem from '../chapListItem/ChapListItem';

import setContent from '../../utils/setContent';

export default function ChapList() {
	const chapList = useSelector((state) => state.chapList.chapList);
	const chapListStatus = useSelector((state) => state.chapList.chapListStatus);

	const chapHeader = chapList.description ? chapList.description : 'Выберите раздел';

	return (
		<div className='exerciseListWrapper'>
			<div className='exerciseListHeader'>
				<h2 title={chapHeader}>{chapHeader}</h2>
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

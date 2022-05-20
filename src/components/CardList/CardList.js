import './cardList.css';

import {useSelector} from 'react-redux';
import {v4 as uuid} from 'uuid';

import CardListItem from '../CardItem/CardItem';

import setContent from '../../utils/setContent';

export default function ChapList() {
	const cardList = useSelector((state) => state.cardList.cardList);
	const cardListStatus = useSelector((state) => state.cardList.cardListStatus);

	const chapHeader = cardList.description ? cardList.description : 'Выберите раздел';

	return (
		<div className='cardListWrapper'>
			<div className='cardListHeader'>
				<h2 title={chapHeader}>{chapHeader}</h2>
				<div className='formLinkButWrapper'></div>
			</div>

			{setContent(cardListStatus, View, cardList)}
		</div>
	);
}

function View({data}) {
	const content = data.data.map((item) => <CardListItem content={item} key={uuid()} />);
	const emptyContent = (
		<div className='emptyChapList'>
			<h3>В этом разделе пока пусто.</h3>
		</div>
	);
	return (
		<>{content.length === 0 ? emptyContent : <div className='cardListContainer'>{content}</div>}</>
	);
}

import './cardList.css';

import {useSelector} from 'react-redux';
import {v4 as uuid} from 'uuid';

import CardListItem from '../CardItem/CardItem';

import setContent from '../../utils/setContent';
import SearchForm from '../SearchForm/SearchForm';

export default function ChapList() {
	const cardList = useSelector((state) => state.cardList.cardList);
	const filteredCardList = useSelector((state) => state.cardList.filteredCardList);
	const cardListStatus = useSelector((state) => state.cardList.cardListStatus);

	const chapHeader = cardList.description ? cardList.description : 'Выберите раздел';

	return (
		<div className='cardListWrapper'>
			<div className='cardListHeader'>
				<h2 title={chapHeader}>{chapHeader}</h2>
				<div className='cardSearchWrapper'>
					<SearchForm searchList={cardList} searchTarget={'card'} placeholder={'Поиск карточек'} />
				</div>
				{/* <div className='formLinkButWrapper'></div> */}
			</div>

			{setContent(cardListStatus, View, filteredCardList)}
		</div>
	);
}

function View({data}) {
	const content = data.data.map((item) => <CardListItem content={item} key={uuid()} />);
	const emptyContent = (
		<div className='emptyCardList'>
			<h3>В этом разделе пока пусто</h3>
		</div>
	);
	return (
		<>{content.length === 0 ? emptyContent : <div className='cardListContainer'>{content}</div>}</>
	);
}

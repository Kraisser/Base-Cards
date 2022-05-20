import './mainPage.css';

import {useSelector} from 'react-redux';

import ChapterList from '../../components/ChapterList/ChapterList';
import EditBlock from '../../components/EditBlock/EditBlock';
import CardList from '../../components/CardList/CardList';
import PageHeader from '../../components/PageHeader/PageHeader';
import DeleteModal from '../../components/DeleteModal/DeleteModal';

export default function MainPage() {
	const delModalStatus = useSelector((state) => state.modal.delModalStatus);

	const delModal = delModalStatus ? <DeleteModal /> : null;

	return (
		<>
			<PageHeader />
			<main className='mainWrapper'>
				<div className='leftContent'>
					<CardList />
				</div>
				<div className='rightContent'>
					<EditBlock />
					<ChapterList />
				</div>
			</main>
			{delModal}
		</>
	);
}

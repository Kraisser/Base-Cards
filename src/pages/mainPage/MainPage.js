import './mainPage.css';

import {useSelector} from 'react-redux';

import DeleteModal from '../../components/DeleteModal/DeleteModal';

import ChapterList from '../../components/ChapterList/ChapterList';
import EditBlock from '../../components/EditBlock/EditBlock';
import CardList from '../../components/CardList/CardList';
import PageHeader from '../../components/PageHeader/PageHeader';
import RightContentWrapper from '../../components/RightContentWrapper/RightContentWrapper';

export default function MainPage() {
	const delModalTarget = useSelector((state) => state.modal.delModalTarget);

	const delModal = delModalTarget ? <DeleteModal /> : null;

	return (
		<>
			<PageHeader />
			<main className='mainWrapper'>
				<div className='leftContent'>
					<CardList />
				</div>
				<RightContentWrapper>
					<EditBlock />
					<ChapterList />
				</RightContentWrapper>
			</main>
			{delModal}
		</>
	);
}

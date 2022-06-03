import './mainPage.css';

import ChapterList from '../../components/ChapterList/ChapterList';
import EditBlock from '../../components/EditBlock/EditBlock';
import CardList from '../../components/CardList/CardList';
import PageHeader from '../../components/PageHeader/PageHeader';

export default function MainPage() {
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
		</>
	);
}

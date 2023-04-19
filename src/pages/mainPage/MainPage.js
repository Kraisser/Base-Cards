import './mainPage.css';

import {useSelector} from 'react-redux';
import {CSSTransition} from 'react-transition-group';

import DeleteModal from '../../components/DeleteModal/DeleteModal';
import ChapterList from '../../components/ChapterList/ChapterList';
import EditBlock from '../../components/EditBlock/EditBlock';
import CardList from '../../components/CardList/CardList';
import PageHeader from '../../components/PageHeader/PageHeader';
import RightContentWrapper from '../../components/RightContentWrapper/RightContentWrapper';

// import IntroSteps from '../../components/IntroSteps/IntroSteps';

export default function MainPage() {
	const delModalTarget = useSelector((state) => state.modal.delModalTarget);

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
				{/* <IntroSteps /> */}
			</main>
			<CSSTransition
				classNames='add-modal'
				timeout={200}
				in={!!delModalTarget}
				unmountOnExit
				mountOnEnter>
				<DeleteModal />
			</CSSTransition>
		</>
	);
}

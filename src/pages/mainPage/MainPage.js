import './mainPage.css';

import {useSelector} from 'react-redux';

import ProgramList from '../../components/programList/ProgramList';

import EditBlock from '../../components/editBlock/editBlock';
import ChapList from '../../components/chapList/ChapList';
import PageHeader from '../../components/pageHeader/PageHeader';
import DeleteModal from '../../components/DeleteModal/DeleteModal';

export default function MainPage() {
	const delModalStatus = useSelector((state) => state.modal.delModalStatus);

	const delModal = delModalStatus ? <DeleteModal /> : null;

	return (
		<>
			<PageHeader />
			<main className='mainWrapper'>
				<div className='leftContent'>
					<ChapList />
				</div>
				<div className='rightContent'>
					<EditBlock />
					<ProgramList />
				</div>
			</main>
			{delModal}
		</>
	);
}

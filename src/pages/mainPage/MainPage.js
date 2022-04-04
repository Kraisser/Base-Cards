import './mainPage.css';

import {useSelector} from 'react-redux';
import {Link} from 'react-router-dom';

import ProgramList from '../../components/programList/ProgramList';
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
					<ProgramList />
					<div className='formLinkButWrapper'>
						<button className='formLinkBut but redBut'>
							<Link to='/addForm'>Добавить</Link>
						</button>
					</div>
				</div>
			</main>
			{delModal}
		</>
	);
}

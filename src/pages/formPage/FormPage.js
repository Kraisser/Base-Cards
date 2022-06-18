import './formPage.css';
import '../../css/common.css';

import {Link} from 'react-router-dom';

import PageHeader from '../../components/PageHeader/PageHeader';
import CardAddForm from '../../components/CardAddForm/CardAddForm';

export default function FormPage() {
	return (
		<>
			<PageHeader burger={false} />
			<main>
				<div className='formWrapper'>
					<CardAddForm />
					<div>
						<Link to='/'>
							<button className='onMainBut but'>на главную</button>
						</Link>
					</div>
				</div>
			</main>
		</>
	);
}

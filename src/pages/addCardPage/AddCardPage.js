import '../../css/formPage.css';
import '../../css/common.css';

import {Link} from 'react-router-dom';

import PageHeader from '../../components/PageHeader/PageHeader';
import AddCardHoc from '../../components/AddCardHoc/AddCardHoc';

export default function AddCardPage() {
	return (
		<>
			<PageHeader burger={false} />
			<main>
				<div className='formWrapper'>
					<AddCardHoc />
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

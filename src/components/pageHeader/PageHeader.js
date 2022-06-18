import './pageHeader.css';

import {Link} from 'react-router-dom';

import Clock from '../Clock/Clock';
import UserWrapper from '../UserWrapper/UserWrapper';
import BurgerMenu from '../BurgerMenu/BurgerMenu';

export default function PageHeader({auth, burger, close, redirectClearEdit}) {
	const redirectCheck = () => {
		if (redirectClearEdit) {
			redirectClearEdit();
		}
	};
	console.log('auth, burger, close: ', auth, burger, close);

	return (
		<header className='header'>
			<Link to={close ? '' : '/'} onClick={redirectCheck}>
				<div className='mainHeader'>
					<h1>Base Cards</h1>
				</div>
			</Link>
			<div className='headerClockWrapper'>
				<Clock />
			</div>
			{auth === false || close === false ? null : (
				<>
					{burger === false ? null : <BurgerMenu />}

					<UserWrapper redirectCheck={redirectCheck} />
				</>
			)}
		</header>
	);
}

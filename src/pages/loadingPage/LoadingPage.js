import './loadingPage.css';

import Spinner from '../../components/iconsComponents/Spinner/Spinner';

export default function LoadingPage() {
	return (
		<div className='loadingPageWrapper pageContentWrapper'>
			<h2>Пожалуйста подождите</h2>
			<div className='pageContentContainer'>
				<Spinner />
			</div>
		</div>
	);
}

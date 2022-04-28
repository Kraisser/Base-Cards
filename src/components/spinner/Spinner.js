import './spinner.css';

export default function Spinner() {
	return (
		<div className='spinnerWrapper'>
			<div className='cssload-loader'>
				<div className='cssload-inner cssload-one'></div>
				<div className='cssload-inner cssload-two'></div>
				<div className='cssload-inner cssload-three'></div>
			</div>
		</div>
	);
}

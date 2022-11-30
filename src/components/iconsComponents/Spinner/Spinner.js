import './spinner.css';

export default function Spinner({width, height, padding}) {
	return (
		<div className='spinnerWrapper' style={{padding}}>
			<div className='cssload-loader' style={{width, height, padding}}>
				<div className='cssload-inner cssload-one'></div>
				<div className='cssload-inner cssload-two'></div>
				<div className='cssload-inner cssload-three'></div>
			</div>
		</div>
	);
}

import './clock.css';

import {useState, useEffect} from 'react';
import useClock from '../../services/useClock';

export default function Clock() {
	const {getFullDate} = useClock();

	const [time, setTime] = useState(null);

	useEffect(() => {
		const timer = setInterval(() => {
			const date = getFullDate();
			setTime(date);
		}, 500);
		return () => clearInterval(timer);
	}, [time, getFullDate]);

	if (!time) {
		return <></>;
	}
	const {hour, min, sec, dayInMonth, month, year, dayName} = time;

	return (
		<div className='dateWrapper'>
			<div className='timeWrapper'>{`${hour}:${min}:${sec}`}</div>
			<div className='date'>
				<div>{`${dayInMonth}.${month}.${year}`}</div>
				<div>{dayName}</div>
			</div>
		</div>
	);
}

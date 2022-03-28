import './clock.css';

import {useState, useEffect} from 'react';

export default function Clock() {
	const newDate = new Date();
	const [time, setTime] = useState(newDate.toLocaleString('ru').split(', ')[1]);

	const daysArr = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];
	const day = newDate.getDay();

	useEffect(() => {
		const timer = setInterval(() => {
			setTime(new Date().toLocaleString('ru').split(', ')[1]);
		}, 500);
		return () => clearInterval(timer);
	}, [time]);

	return (
		<div className='dateWrapper'>
			<div className='date'>
				<div>{newDate.toLocaleString('ru').split(', ')[0]}</div>
				<div>{time}</div>
			</div>
			<div className='day'>
				<div>{daysArr[day]}</div>
			</div>
		</div>
	);
}

import './favoriteIcon.css';

import {useRef, useState} from 'react';
import anime from 'animejs/lib/anime.es.js';

export default function FavouriteIcon({favorite, onAdd, onDelete}) {
	const [selected, setSelected] = useState(favorite || false);
	const svg = useRef(null);

	const favoriteOn = () => {
		anime({
			targets: svg.current,
			points: [
				{
					value:
						'15 1 19.845 9.465 29 11.694 22.84 19.154 23.652 28.996 15 25.143 6.348 28.996 7.16 19.154 1 11.694 10.155 9.465 15 1',
				},
				{
					value:
						'15 1 21.922 6.459 29 11.693 26.2 20.301 23.652 28.995 15 28.855 6.348 28.995 3.8 20.301 1 11.693 8.078 6.459 15 1',
				},
				{
					value:
						'15 1 19.845 9.465 29 11.694 22.84 19.154 23.652 28.996 15 25.143 6.348 28.996 7.16 19.154 1 11.694 10.155 9.465 15 1',
				},
			],
			fill: ['rgba(216, 216, 216, 0)', '#ff9501'],
			easing: 'easeOutQuad',
			duration: 300,
		});
	};

	const favoriteOff = () => {
		anime({
			targets: svg.current,
			points: [
				{
					value:
						'15 1 19.845 9.465 29 11.694 22.84 19.154 23.652 28.996 15 25.143 6.348 28.996 7.16 19.154 1 11.694 10.155 9.465 15 1',
				},
				{
					value:
						'15 1 21.922 6.459 29 11.693 26.2 20.301 23.652 28.995 15 28.855 6.348 28.995 3.8 20.301 1 11.693 8.078 6.459 15 1',
				},
				{
					value:
						'15 1 19.845 9.465 29 11.694 22.84 19.154 23.652 28.996 15 25.143 6.348 28.996 7.16 19.154 1 11.694 10.155 9.465 15 1',
				},
			],
			fill: ['#ff9501', 'rgba(216, 216, 216, 0)'],
			easing: 'easeOutQuad',
			duration: 300,
		});
	};

	const onStarClick = (e) => {
		e.stopPropagation();
		if (selected) {
			favoriteOff();
			onDelete();
		} else {
			favoriteOn();
			onAdd();
		}
		setSelected(!selected);
	};

	return (
		<svg
			width='30'
			height='30'
			xmlns='http://www.w3.org/2000/svg'
			onClick={onStarClick}
			className='favoriteIconCardItem'>
			<polygon
				className={`favoriteStar ${favorite ? 'favoriteStarActive' : ''}`}
				ref={svg}
				points='15 1, 19.845 9.465, 29 11.694, 22.84 19.154, 23.652 28.996, 15 25.143, 6.348 28.996, 7.16 19.154, 1 11.694, 10.155 9.465, 15 1'></polygon>
		</svg>
	);
}

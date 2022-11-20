import {useRef, useState} from 'react';
import anime from 'animejs';

export default function AddIcon({onClick, classNames}) {
	const [activeAnimation, setActiveAnimation] = useState(false);
	const svg = useRef(null);

	const enterAnim = () => {
		anime({
			targets: svg.current,
			points: [
				{
					value:
						'12.5 1, 17.5 1, 17.5 12.5, 29 12.5, 29 17.5,17.5 17.5, 17.5 29, 12.5 29, 12.5 17.5,1 17.5, 1 12.5, 12.5 12.5,12.5 1',
				},
				{
					value:
						'14 23 , 15 23 , 16 23 , 18 23 , 18 27 , 15 29 , 14 29 , 13 29 , 10 27 , 10 26 , 10 23 , 12 23 , 13 23',
				},
				{
					value:
						'15 23 , 24 6 , 26 6 , 27 6 , 28 8 , 18 27 , 16 29 , 14 29 , 13 28 , 7 20 , 8 18 , 11 18 , 15 23',
				},
				{
					value:
						'14 23 , 15 23 , 16 23 , 18 23 , 18 27 , 15 29 , 14 29 , 13 29 , 10 27 , 10 26 , 10 23 , 12 23 , 13 23',
				},
				{
					value:
						'12.5 1, 17.5 1, 17.5 12.5, 29 12.5, 29 17.5,17.5 17.5, 17.5 29, 12.5 29, 12.5 17.5,1 17.5, 1 12.5, 12.5 12.5,12.5 1',
				},
			],
			easing: 'easeOutQuint',
			duration: 2000,
			complete: () => setActiveAnimation(false),
		});
	};

	return (
		<svg
			width='30'
			height='30'
			viewBox='0 0 30 30'
			xmlns='http://www.w3.org/2000/svg'
			onClick={() => {
				if (activeAnimation) {
					return;
				}
				const validPassed = onClick();
				if (!validPassed) {
					return;
				}
				setActiveAnimation(true);
				enterAnim();
			}}
			className={classNames}>
			<polygon
				points='12.5 1, 17.5 1, 17.5 12.5, 29 12.5, 29 17.5,17.5 17.5, 17.5 29, 12.5 29, 12.5 17.5,1 17.5, 1 12.5, 12.5 12.5,12.5 1'
				style={{
					fill: 'rgb(57, 226, 77)',
					fillRule: 'nonzero',
					strokeLinejoin: 'round',
					stroke: 'rgb(57, 226, 77)',
				}}
				ref={svg}></polygon>
		</svg>
	);
}

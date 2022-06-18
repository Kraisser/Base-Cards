import './burgerMenu.css';

import {useDispatch, useSelector} from 'react-redux';
import {setMenuActive} from '../../store/chapterSlice';

export default function BurgerMenu() {
	const dispatch = useDispatch();
	const menuActive = useSelector((state) => state.chapter.menuHidden);

	console.log('window.innerWidth: ', window.innerWidth);
	if (window.innerWidth > 450) {
		console.log('burger width');
		return null;
	}

	console.log('render burgerMenu');

	return (
		<div
			className={`burgerMenu ${menuActive ? 'burgerMenuClose' : 'burgerMenuActive'}`}
			onClick={() => dispatch(setMenuActive(!menuActive))}>
			<span className='burgerItem'></span>
			<span className='burgerItem'></span>
			<span className='burgerItem'></span>
		</div>
	);
}

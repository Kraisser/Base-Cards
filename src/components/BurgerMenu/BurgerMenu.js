import './burgerMenu.css';

import {useDispatch, useSelector} from 'react-redux';
import {setMenuActive} from '../../store/chapterSlice';

export default function BurgerMenu() {
	const dispatch = useDispatch();
	const menuActive = useSelector((state) => state.chapter.menuHidden);
	const clientWidth = useSelector((state) => state.chapter.clientWidth);

	if (clientWidth > 450) {
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

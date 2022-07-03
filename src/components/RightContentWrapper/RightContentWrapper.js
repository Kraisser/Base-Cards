import './rightContentWrapper.css';

import {useDispatch, useSelector} from 'react-redux';
import {useEffect} from 'react';

import useDebounce from '../../services/useDebounce';
import {setClientWidth, setMenuActive} from '../../store/chapterSlice';

import rightMenuIcon from '../../assets/icons/right-menu-slide.png';

export default function RightContentWrapper({children}) {
	const dispatch = useDispatch();

	const menuHidden = useSelector((state) => state.chapter.menuHidden);
	const clientWidth = useSelector((state) => state.chapter.clientWidth);

	useEffect(() => {
		window.addEventListener('resize', openMenu);

		return () => {
			window.removeEventListener('resize', openMenu);
		};
	}, [clientWidth]);

	const openMenu = useDebounce(() => {
		if (clientWidth === window.innerWidth) {
			return;
		}

		dispatch(setMenuActive(false));
		dispatch(setClientWidth(window.innerWidth));
	}, 1000);

	const rightMenuToggle = (
		<div
			className={`rightMenuToggle ${menuHidden ? '' : 'rightMenuToggleActive'}`}
			onClick={() => dispatch(setMenuActive(!menuHidden))}>
			<img src={rightMenuIcon} alt='Боковое меню' />
		</div>
	);

	return (
		<>
			{rightMenuToggle}
			<div className={`rightContent ${menuHidden ? 'rightContentHidden' : ''}`}>{children}</div>
		</>
	);
}

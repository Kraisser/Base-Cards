import './rightContentWrapper.css';

import {useDispatch, useSelector} from 'react-redux';
import {useEffect, useState} from 'react';

import useDebounce from '../../services/useDebounce';
import {setMenuActive} from '../../store/chapterSlice';

export default function RightContentWrapper({children}) {
	const dispatch = useDispatch();
	const menuHidden = useSelector((state) => state.chapter.menuHidden);
	const [clientWidth, setClientWidth] = useState(window.innerWidth);

	const openMenu = useDebounce(() => {
		const newWidth = window.innerWidth;

		if (newWidth !== clientWidth) {
			setClientWidth(newWidth);
			dispatch(setMenuActive(false));
		}
	}, 1000);

	useEffect(() => {
		window.addEventListener('resize', openMenu);

		return () => {
			window.removeEventListener('resize', openMenu);
		};
	}, []);

	const rightMenuToggle = (
		<div
			className={`rightMenuToggle ${menuHidden ? '' : 'rightMenuToggleActive'}`}
			onClick={() => dispatch(setMenuActive(!menuHidden))}></div>
	);

	return (
		<>
			{rightMenuToggle}
			{/* <UserWrapper /> */}
			<div className={`rightContent ${menuHidden ? 'rightContentHidden' : ''}`}>{children}</div>
		</>
	);
}

import '../../index.css';
import './chapListItem.css';

import {Link} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import {delModalOpen} from '../../store/modalSlice';

import delIcon from '../../assets/icons/delete-icon.png';
import browserIcon from '../../assets/icons/browser.png';
import infoIcon from '../../assets/icons/info.png';

export default function ChapListItem({content}) {
	const dispatch = useDispatch();

	const activeProgram = useSelector((state) => state.program.activeProgram);

	const {name, description, link, id} = content;

	const onDeleteEx = () => {
		dispatch(delModalOpen(id));
	};

	return (
		<div className='exerciseItemWrapper'>
			<div className='exerciseItemDescriptionWrapper'>
				<h3 className='exerciseItemHeader'>{name}</h3>
				<p className=''>{description}</p>
			</div>

			<div className='controlWrapper'>
				<div className='controlContainer'>
					<img src={delIcon} alt='Del' onClick={onDeleteEx} className='delIcon delIcon-chapItem' />
				</div>
				<div className='controlContainer'>
					<a href={`http://${link}`} target='_blank' title={link} rel='noopener noreferrer'>
						<img className='browserIcon' src={browserIcon} alt='browserIcon' />
					</a>
				</div>
				<div className='controlContainer'>
					<Link to={`/exerciseDescription/${activeProgram}/${id}`}>
						<img src={infoIcon} alt='info' />
					</Link>
				</div>
			</div>
		</div>
	);
}

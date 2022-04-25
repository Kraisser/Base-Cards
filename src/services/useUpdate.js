import {useDispatch} from 'react-redux';

import useRequests from './useRequests';
import {exListError, exListSuccess, exListLoading} from '../store/chapSlice.js';
import {programListSuccess, programListError, setActiveProgram} from '../store/programSlice';

export default function useUpdate() {
	const dispatch = useDispatch();
	const {getCardList, getChapters} = useRequests();

	const updateChapList = (id) => {
		dispatch(exListLoading());
		dispatch(setActiveProgram(id));

		if (id) {
			getCardList(id)
				.then((res) => {
					dispatch(exListSuccess(res));
				})
				.catch((e) => dispatch(exListError()));
		}
	};

	const updateChapters = () => {
		getChapters()
			.then((res) => dispatch(programListSuccess(res)))
			.catch((e) => dispatch(programListError()));
	};

	return {updateChapList, updateChapters};
}

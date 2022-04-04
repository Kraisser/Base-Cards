import {useDispatch, useSelector} from 'react-redux';

import useRequests from './useRequests';
import {exListError, exListSuccess, exListLoading} from '../store/chapSlice.js';
import {programListSuccess, programListError, setActiveProgram} from '../store/programSlice';

export default function useUpdate() {
	const dispatch = useDispatch();
	const {getChapList, getChapters} = useRequests();

	const activeProgram = useSelector((state) => state.program.activeProgram);

	const updateChapList = (id = activeProgram) => {
		console.log(id);
		dispatch(exListLoading());
		dispatch(setActiveProgram(id));

		getChapList()
			.then((res) => {
				if (!res[id]) {
					return;
				}
				dispatch(exListSuccess(res[id]));
			})
			.catch((e) => dispatch(exListError()));
	};

	const updateChapters = () => {
		getChapters()
			.then((res) => dispatch(programListSuccess(res)))
			.catch((e) => dispatch(programListError()));
	};

	return {updateChapList, updateChapters};
}

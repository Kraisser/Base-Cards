import {useDispatch} from 'react-redux';

import useRequests from './useRequests';
import useUpdate from './useUpdate';

import {exListError, exListSuccess, exListLoading} from '../store/chapSlice.js';
import {programListSuccess, programListError, setActiveProgram} from '../store/programSlice';

export default function useUpload() {
	const dispatch = useDispatch();
	const {getChapList, postChapters, postInChapList, deleteProgramFromChapters} = useRequests();
	const {updateChapters, updateChapList} = useUpdate();

	const uploadNewChapter = (programItem, programs, programsNamed) => {
		postChapters(programItem)
			.then(() => dispatch(programListSuccess(programs)))
			.catch((e) => dispatch(programListError()));

		getChapList()
			.then((res) => {
				const newObj = {
					...programsNamed,
					...res,
				};

				postInChapList(newObj).catch((e) => console.log(e));
			})
			.catch((e) => console.log(e));
	};

	const uploadNewChapItem = (newExercise, programValue, activeProgram) => {
		getChapList()
			.then((res) => {
				const newExList = res[programValue];
				newExList.chapContent.push(newExercise);

				if (programValue === activeProgram) {
					dispatch(exListSuccess(newExList));
				}

				const newData = {
					[programValue]: newExList,
					...res,
				};

				postInChapList(newData).catch((e) => console.log(e));
			})
			.catch((e) => console.log(e));
	};

	const deleteChapter = (id, nextPath) => {
		deleteProgramFromChapters(id)
			.then(() => updateChapters())
			.then(async () => {
				const data = await getChapList();
				delete data[id];
				postInChapList(data);
			})
			.then(() => dispatch(setActiveProgram(nextPath)))
			.then(() => updateChapList(nextPath))
			.catch((e) => console.log(e));
	};

	const deleteChapItem = (delModalStatus, activeProgram) => {
		getChapList()
			.then((res) => {
				const newObj = res;

				const filteredExList = res[activeProgram].chapContent.filter(
					(item) => item.id !== delModalStatus
				);

				newObj[activeProgram].chapContent = filteredExList;

				postInChapList(newObj)
					.then(() => dispatch(exListSuccess(newObj[activeProgram])))
					.catch((e) => console.log(e));
			})
			.catch((e) => console.log(e));
	};

	return {uploadNewChapter, uploadNewChapItem, deleteChapter, deleteChapItem};
}

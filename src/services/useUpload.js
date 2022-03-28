import {useDispatch} from 'react-redux';

import useRequests from './useRequests';
import useUpdate from './useUpdate';

import {exListError, exListSuccess, exListLoading} from '../store/exerciseSlice.js';
import {programListSuccess, programListError, setActiveProgram} from '../store/programSlice';

export default function useUpload() {
	const dispatch = useDispatch();
	const {getExercises, postProgramList, postProgramInExNamedList, deleteProgramFromProgramList} =
		useRequests();
	const {updatePrograms, updateExercises} = useUpdate();

	const uploadNewPrograms = (programItem, programs, programsNamed) => {
		postProgramList(programItem)
			.then(() => dispatch(programListSuccess(programs)))
			.catch((e) => dispatch(programListError()));

		getExercises()
			.then((res) => {
				const newObj = {
					...programsNamed,
					...res,
				};

				postProgramInExNamedList(newObj).catch((e) => console.log(e));
			})
			.catch((e) => console.log(e));
	};

	const uploadNewExercise = (newExercise, programValue, activeProgram) => {
		getExercises()
			.then((res) => {
				const newExList = res[programValue];
				newExList.exerciseList.push(newExercise);

				if (programValue === activeProgram) {
					dispatch(exListSuccess(newExList));
				}

				const newData = {
					[programValue]: newExList,
					...res,
				};

				postProgramInExNamedList(newData).catch((e) => console.log(e));
			})
			.catch((e) => console.log(e));
	};

	const deleteProgram = (id, path, nextPath) => {
		deleteProgramFromProgramList(id)
			.then(() => updatePrograms())
			.then(async () => {
				const data = await getExercises();
				delete data[path];
				postProgramInExNamedList(data);
			})
			.then(() => dispatch(setActiveProgram(nextPath)))
			.then(() => updateExercises(nextPath))
			.catch((e) => console.log(e));
	};

	const deleteExercise = (delModalStatus, activeProgram) => {
		getExercises()
			.then((res) => {
				const newObj = res;

				const filteredExList = res[activeProgram].exerciseList.filter(
					(item) => item.id !== delModalStatus
				);

				newObj[activeProgram].exerciseList = filteredExList;

				postProgramInExNamedList(newObj)
					.then(() => dispatch(exListSuccess(newObj[activeProgram])))
					.catch((e) => console.log(e));
			})
			.catch((e) => console.log(e));
	};

	return {uploadNewPrograms, uploadNewExercise, deleteProgram, deleteExercise};
}

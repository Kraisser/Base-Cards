import useHttp from '../hooks/useHttp';

export default function useRequests() {
	const base = 'http://localhost:3001/';

	const request = useHttp();

	const getExercises = async () => {
		const data = await request(`${base}exerciseNamedList`);

		return data;
	};

	const getProgramList = async () => {
		const data = await request(`${base}programList`);

		return data;
	};

	const postProgramList = async (newProgram) => {
		const data = request(`${base}programList`, 'POST', JSON.stringify(newProgram));

		return data;
	};

	const postProgramInExNamedList = async (newData) => {
		const data = request(`${base}exerciseNamedList`, 'POST', JSON.stringify(newData));

		return data;
	};

	const deleteProgramFromProgramList = async (id) => {
		const data = request(`${base}programList/${id}`, 'DELETE');

		return data;
	};

	return {
		getExercises,
		getProgramList,
		postProgramList,
		postProgramInExNamedList,
		deleteProgramFromProgramList,
	};
}

import useHttp from '../hooks/useHttp';

export default function useRequests() {
	const base = 'http://localhost:3001/';

	const request = useHttp();

	const getChapList = async () => {
		const data = await request(`${base}chapList`);

		return data;
	};

	const getChapters = async () => {
		const data = await request(`${base}chapters`);

		return data;
	};

	const postChapters = async (newChap) => {
		const data = request(`${base}chapters`, 'POST', JSON.stringify(newChap));

		return data;
	};

	const postInChapList = async (newData) => {
		const data = request(`${base}chapList`, 'POST', JSON.stringify(newData));

		return data;
	};

	const deleteProgramFromChapters = async (id) => {
		const data = request(`${base}chapters/${id}`, 'DELETE');

		return data;
	};

	return {
		getChapList,
		getChapters,
		postChapters,
		postInChapList,
		deleteProgramFromChapters,
	};
}

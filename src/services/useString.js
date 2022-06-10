import {useCallback} from 'react';

export default function useString() {
	const compareChapters = useCallback((chapterList, valueString) => {
		return chapterList.find((item) => item.name.toLowerCase() === valueString);
	}, []);

	return {compareChapters};
}

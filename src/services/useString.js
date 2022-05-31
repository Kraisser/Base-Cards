export default function useString() {
	const compareChapters = (chapterList, valueString) => {
		return chapterList.find((item) => item.name.toLowerCase() === valueString);
	};

	return {compareChapters};
}

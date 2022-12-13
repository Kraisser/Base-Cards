export default function useSort() {
	const sortChaptersByName = (chapArr) => {
		if (chapArr) {
			return [...chapArr].sort((prevItem, item) => {
				if (prevItem.id === 'favorite+chapter') {
					return -1;
				}
				if (item.id === 'favorite+chapter') {
					return 1;
				}
				return prevItem.name.localeCompare(item.name, 'ru', {ignorePunctuation: true});
			});
		}
		return [];
	};

	const sortCardsByTime = (cardArr) => {
		if (cardArr) {
			return [...cardArr].sort((prevItem, item) => item.timeStamp - prevItem.timeStamp);
		}
		return [];
	};

	return {sortChaptersByName, sortCardsByTime};
}

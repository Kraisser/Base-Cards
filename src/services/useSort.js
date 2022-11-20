export default function useSort() {
	const sortChaptersByName = (chapArr) => {
		if (chapArr) {
			return [...chapArr].sort((prevItem, item) =>
				prevItem.id === 'favorite+chapter'
					? -1
					: prevItem.name.localeCompare(item.name, 'ru', {ignorePunctuation: true})
			);
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

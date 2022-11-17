export default function useSort() {
	const sortChaptersByName = (chapArr) => {
		return [...chapArr].sort((prevItem, item) =>
			prevItem.id === 'favorite+chapter'
				? -1
				: prevItem.name.localeCompare(item.name, 'ru', {ignorePunctuation: true})
		);
	};

	const sortCardsByTime = (cardArr) => {
		return [...cardArr].sort((prevItem, item) => item.timeStamp - prevItem.timeStamp);
	};

	return {sortChaptersByName, sortCardsByTime};
}

export default function useClock() {
	const getFullDate = (timeStamp) => {
		const date = timeStamp ? new Date(timeStamp) : new Date();

		const currentHour = date.getHours();
		const currentMinute = date.getMinutes();
		const currentSecond = date.getSeconds();
		const currentDay = date.getDate();
		const currentMonth = date.getMonth() + 1;

		const daysArr = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];
		const dayInWeek = date.getDay();

		const hour = currentHour < 10 ? `0${currentHour}` : currentHour;
		const min = currentMinute < 10 ? `0${currentMinute}` : currentMinute;
		const sec = currentSecond < 10 ? `0${currentSecond}` : currentSecond;
		const dayInMonth = currentDay < 10 ? `0${currentDay}` : currentDay;
		const dayName = daysArr[dayInWeek];
		const month = currentMonth < 10 ? `0${currentMonth}` : currentMonth;
		const year = date.getFullYear();

		return {
			hour,
			min,
			sec,
			dayInMonth,
			dayName,
			month,
			year,
		};
	};

	return {
		getFullDate,
	};
}

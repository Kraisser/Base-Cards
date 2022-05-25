export default function debounce(func, ms) {
	let timeout;

	return function () {
		const fnCall = () => {
			func.apply(this, arguments);
		};
		clearTimeout(timeout);
		timeout = setTimeout(fnCall, ms);
	};
}

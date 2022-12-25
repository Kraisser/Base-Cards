import {useRef} from 'react';

export default function useDebounce() {
	const ref = useRef(null);

	const debounce = (func, delay, ...args) => {
		clearTimeout(ref.current);
		ref.current = setTimeout(() => func(...args), delay);
	};

	return {
		debounce,
	};
}

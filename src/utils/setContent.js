import Spinner from '../components/spinner/Spinner';
import Error from '../components/Error/Error';

export default function setContent(process, Component, data, additData) {
	switch (process) {
		case 'loading':
			return <Spinner />;
		case 'error':
			return <Error />;
		case 'idle':
			return <Component data={data} {...additData} />;
		default:
			throw new Error('Unexpected process state');
	}
}

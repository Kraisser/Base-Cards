import 'normalize.css';
import './index.css';

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {Provider} from 'react-redux';
import {BrowserRouter as Router} from 'react-router-dom';

import store from './store/index';

ReactDOM.render(
	<React.StrictMode>
		<Provider store={store}>
			<div className='content'>
				<Router>
					<App />
				</Router>
			</div>
		</Provider>
	</React.StrictMode>,
	document.getElementById('root')
);

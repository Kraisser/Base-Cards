import './App.css';

import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

import MainPage from './pages/mainPage/MainPage';
import ExerciseDescription from './pages/exerciseDescription/ExerciseDescription';
import FormPage from './pages/formPage/FormPage';
import Page404 from './pages/404/404';

function App() {
	return (
		<div className='content'>
			<Router>
				<Routes>
					<Route path='/' element={<MainPage />} />
					<Route path='/editForm' element={<FormPage />} />
					<Route path='/exerciseDescription/:activeProgram/:id' element={<ExerciseDescription />} />
					<Route path='*' element={<Page404 />} />
				</Routes>
			</Router>
		</div>
	);
}

export default App;

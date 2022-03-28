import './App.css';

import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

import MainPage from './pages/mainPage/MainPage';
import ExerciseDescription from './pages/exerciseDescription/ExerciseDescription';
import FormPage from './pages/formPage/FormPage';

function App() {
	return (
		<div className='content'>
			<Router>
				<Routes>
					<Route path='/' element={<MainPage />} />
					<Route path='/addForm' element={<FormPage />} />
					<Route path='/exerciseDescription/:activeProgram/:id' element={<ExerciseDescription />} />
				</Routes>
			</Router>
		</div>
	);
}

export default App;

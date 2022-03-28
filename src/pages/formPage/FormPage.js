import './formPage.css';

import {useSelector} from 'react-redux';
import {useState, useEffect} from 'react';

import useUpdate from '../../services/useUpdate';
import useUpload from '../../services/useUpload';

import {v4 as uuid} from 'uuid';
import * as yup from 'yup';

import PageHeader from '../../components/pageHeader/PageHeader';

export default function FormPage() {
	const {updatePrograms} = useUpdate();
	const {uploadNewPrograms, uploadNewExercise} = useUpload();

	const status = useSelector((state) => state.program.programListStatus);
	const programList = useSelector((state) => state.program.programList);
	const activeProgram = useSelector((state) => state.program.activeProgram);

	const validSchema = yup.object().shape({
		programName: yup.string('Введите строку').required('Обязательное поле*'),
		programPath: yup.string('Введите строку').required('Обязательное поле*'),
		exName: yup.string('Введите строку').required('Обязательное поле*'),
		exProgram: yup.string('Выберите программу*').required('Обязательное поле*'),
		exMuscles: yup.string('Укажите целевые мышцы*').required('Обязательное поле*'),
	});

	useEffect(() => {
		if (status !== 'idle') {
			updatePrograms();
		}
		// eslint-disable-next-line
	}, []);

	const [programName, setProgramName] = useState('');
	const [programNameErr, setProgramNameErr] = useState(null);
	const [programPath, setProgramPath] = useState('');
	const [programPathErr, setProgramPathErr] = useState(null);

	const [exName, setExName] = useState('');
	const [exNameErr, setExNameErr] = useState(null);
	const [exProgram, setExProgram] = useState('');
	const [exProgramErr, setExProgramErr] = useState(null);
	const [exMuscles, setExMuscles] = useState('');
	const [exMusclesErr, setExMusclesErr] = useState(null);
	const [exImg, setExImg] = useState('');
	const [exDescription, setExDescription] = useState('');

	const onProgramSubmit = (e) => {
		e.preventDefault();

		if (programNameErr !== true || programPathErr !== true) {
			return;
		}

		const newProgramItem = {name: programName, path: programPath, id: uuid()};
		const newPrograms = [...programList, newProgramItem];

		const newObj = {
			[programPath]: {
				description: programName,
				exerciseList: [],
			},
		};

		uploadNewPrograms(newProgramItem, newPrograms, newObj);
	};

	const onExSubmit = (e) => {
		e.preventDefault();

		if (exNameErr !== true || exProgramErr !== true || exMusclesErr !== true) {
			return;
		}

		const newExercise = {
			id: uuid(),
			name: exName,
			muscles: exMuscles,
			img: exImg,
			description: exDescription,
		};

		uploadNewExercise(newExercise, exProgram, activeProgram);
	};

	const onChange = (e, setState, setErr) => {
		const value = e.target.value;
		const id = e.target.id;

		setState(value);

		validateField(id, value, setErr);
	};

	const validateField = (id, value, setErr) => {
		validSchema
			.pick([id])
			.validate({[id]: value})
			.then(() => setErr(true))
			.then(() => (id === 'programPath' ? checkUniqPath(value) : null))
			.catch((err) => {
				setErr(err.message);
			});
	};

	const checkUniqPath = (path) => {
		const res = programList.find((item) => item.path === path);

		if (res) {
			throw new Error('Идентификатор не является уникальным');
		}
	};

	const showError = (errState) => {
		if (errState !== true) {
			return errState;
		}
	};

	return (
		<>
			<PageHeader />
			<main>
				<div className='formHeader'>
					<h2>Форма редактирования</h2>
				</div>
				<div className='formWrapper'>
					<form onSubmit={onProgramSubmit} className='programForm'>
						<h3>Добавление программы</h3>

						<label htmlFor='programName' className='formInputLabel'>
							Название программы*
						</label>
						<div className='errorForm'>{showError(programNameErr)}</div>
						<input
							type='text'
							id='programName'
							onChange={(e) => onChange(e, setProgramName, setProgramNameErr)}
							value={programName}
							className='formInput'
						/>

						<label htmlFor='programPath' className='formInputLabel'>
							Уникальный путь программы*
						</label>
						<div className='errorForm'>{showError(programPathErr)}</div>
						<input
							type='text'
							id='programPath'
							onChange={(e) => onChange(e, setProgramPath, setProgramPathErr)}
							value={programPath}
							className='formInput'
						/>

						<button type='submit'>Отправить</button>
					</form>
				</div>

				<div className='formWrapper'>
					<form className='exForm' onSubmit={onExSubmit}>
						<h3>Добавление упражнения</h3>

						<label htmlFor='exName' className='formInputLabel'>
							Название упражнения*
						</label>
						<div className='errorForm'>{showError(exNameErr)}</div>
						<input
							type='text'
							id='exName'
							onChange={(e) => onChange(e, setExName, setExNameErr)}
							value={exName}
							className='formInput'
						/>

						<label htmlFor='exProgram' className='formInputLabel'>
							Выберите программу*
						</label>
						<div className='errorForm'>{showError(exProgramErr)}</div>
						<select
							name='exProgram'
							id='exProgram'
							value={exProgram}
							className='formInputLabel'
							onChange={(e) => onChange(e, setExProgram, setExProgramErr)}>
							<option value=''>Выберите программу</option>
							{programList.map((item) => (
								<option value={item.path} key={uuid()}>
									{item.name}
								</option>
							))}
						</select>

						<label htmlFor='exImg' className='formInputLabel'>
							Картинка*
						</label>
						<input
							type='text'
							id='exImg'
							onChange={(e) => setExImg(e.target.value)}
							value={exImg}
							className='formInput'
						/>

						<label htmlFor='exMuscles' className='formInputLabel'>
							Целевые мышцы*
						</label>
						<div className='errorForm'>{showError(exMusclesErr)}</div>
						<input
							type='text'
							id='exMuscles'
							onChange={(e) => onChange(e, setExMuscles, setExMusclesErr)}
							value={exMuscles}
							className='formInput'
						/>

						<label htmlFor='exDescription' className='formInputLabel'>
							Техника выполнения
						</label>
						<textarea
							name='exDescription'
							id='exDescription'
							onChange={(e) => setExDescription(e.target.value)}
							value={exDescription}
							className='exDescriptionInput'></textarea>
						<button type='submit'>Отправить</button>
					</form>
				</div>
			</main>
		</>
	);
}

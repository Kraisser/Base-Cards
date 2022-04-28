import './formPage.css';

import {useSelector} from 'react-redux';
import {useState, useEffect} from 'react';

import useUpdate from '../../services/useUpdate';
import useUpload from '../../services/useUpload';

import {v4 as uuid} from 'uuid';
import * as yup from 'yup';

import PageHeader from '../../components/pageHeader/PageHeader';

export default function FormPage() {
	const {updateChapters} = useUpdate();
	const {uploadNewCard} = useUpload();

	const status = useSelector((state) => state.program.programListStatus);
	const programList = useSelector((state) => state.program.programList);
	const activeProgram = useSelector((state) => state.program.activeProgram);

	const validSchema = yup.object().shape({
		programName: yup.string('Введите строку').required('Обязательное поле*'),
		programPath: yup.string('Введите строку').required('Обязательное поле*'),
		exName: yup
			.string('Введите строку')
			.max(55, 'Максимум 55 символов')
			.required('Обязательное поле*'),
		exProgram: yup.string('Выберите программу*').required('Обязательное поле*'),
		exLink: yup.string('Укажите ссылку*').required('Обязательное поле*'),
	});

	useEffect(() => {
		if (status !== 'idle') {
			updateChapters();
		}
		// eslint-disable-next-line
	}, []);

	const [exName, setExName] = useState('');
	const [exNameErr, setExNameErr] = useState(null);
	const [exProgramId, setExProgramId] = useState('');
	const [exProgramErr, setExProgramErr] = useState(null);
	const [exLink, setExLink] = useState('');
	const [exLinkErr, setExLinkErr] = useState(null);
	const [exDescription, setExDescription] = useState('');

	const onExSubmit = (e) => {
		e.preventDefault();

		if (exNameErr !== true || exProgramErr !== true || exLinkErr !== true) {
			return;
		}

		const newExercise = {
			id: uuid(),
			name: exName,
			link: exLink,
			timeStamp: Date.now(),
			description: exDescription,
		};

		uploadNewCard(newExercise, exProgramId, activeProgram);
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
			.catch((err) => {
				setErr(err.message);
			});
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
				{/* <div className='formHeader'>
					<h2>Форма редактирования</h2>
				</div> */}

				<div className='formWrapper'>
					<form className='exForm' onSubmit={onExSubmit}>
						<h3>Добавление пункта</h3>

						<label htmlFor='exName' className='formInputLabel'>
							Название пункта*
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
							Выберите раздел*
						</label>
						<div className='errorForm'>{showError(exProgramErr)}</div>
						<select
							name='exProgram'
							id='exProgram'
							value={exProgramId}
							className='exSelectInput'
							onChange={(e) => onChange(e, setExProgramId, setExProgramErr)}>
							<option value=''>Выберите программу</option>
							{programList.map((item) => (
								<option value={item.id} key={uuid()}>
									{item.name}
								</option>
							))}
						</select>

						<label htmlFor='exLink' className='formInputLabel'>
							Укажите ссылку*
						</label>
						<div className='errorForm'>{showError(exLinkErr)}</div>
						<input
							type='text'
							id='exLink'
							onChange={(e) => onChange(e, setExLink, setExLinkErr)}
							value={exLink}
							className='formInput'
						/>

						<label htmlFor='exDescription' className='formInputLabel'>
							Дополнительное описание
						</label>
						<textarea
							name='exDescription'
							id='exDescription'
							onChange={(e) => setExDescription(e.target.value)}
							value={exDescription}
							className='exDescriptionInput'></textarea>
						<div className='formButWrapper'>
							<button type='submit' className='formBut but'>
								Отправить
							</button>
						</div>
					</form>
				</div>
			</main>
		</>
	);
}

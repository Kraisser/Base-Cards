import './auth.css';

import {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import * as yup from 'yup';

import {
	signInWithPopup,
	signOut,
	GoogleAuthProvider,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
} from 'firebase/auth';
import {auth} from '../../services/fireBase';

import PageHeader from '../../components/PageHeader/PageHeader';

import googleIcon from '../../assets/icons/google-icon.png';

export default function Auth() {
	const navigate = useNavigate();

	const providerGoogle = new GoogleAuthProvider();

	const [email, setEmail] = useState('');
	const [pass, setPass] = useState('');
	const [emailError, setEmailError] = useState(null);
	const [passError, setPassError] = useState(null);
	const [errorAuth, setErrorAuth] = useState(null);
	const [successAuth, setSuccessAuth] = useState(null);

	const emailErrInpStyle = emailError === true || emailError === null ? null : 'errorInput';
	const passErrInpStyle = passError === true || passError === null ? null : 'errorInput';

	const validSchema = yup.object().shape({
		email: yup
			.string('Введите строку')
			.email('Введите правильный Email')
			.required('Обязательное поле*'),
		pass: yup
			.string('Введите строку')
			.min(6, 'Минимум 6 символов')
			.matches(/(?=.*[0-9])(?=.*[a-zA-Z])/g, 'Пароль должен состоять из цифр и букв')
			.required('Обязательное поле*'),
	});

	const validateField = (id, value, setErr) => {
		validSchema
			.pick([id])
			.validate({[id]: value})
			.then(() => {
				setErr(true);
			})
			.catch((err) => {
				console.log('setState');
				setErr(err.message);
			});
	};

	const validateAll = () => {
		validateField('email', email, setEmailError);
		validateField('pass', pass, setPassError);
	};

	const onChange = (e, setState) => {
		setState(e.target.value);
	};

	const clearFields = () => {
		setEmail('');
		setPass('');
	};

	const clearErrors = () => {
		setEmailError(null);
		setPassError(null);
		setErrorAuth(null);
	};

	const errorCustom = (error) => {
		const code = error.code;
		console.log('code: ', code);

		switch (code) {
			case 'auth/email-already-in-use':
				setEmailError('Email уже используется');
				break;
			case 'auth/invalid-email':
				setEmailError('Неправильный Email');
				break;

			default:
				setErrorAuth(`${code}: ${error.message}`);
				break;
		}
	};

	const redirectToMain = () => {
		navigate('/');
	};

	const onGoogle = () => {
		signInWithPopup(auth, providerGoogle)
			.then((res) => {
				clearErrors();
				redirectToMain();
			})
			.catch((error) => {
				errorCustom(error);
				setErrorAuth(error.code, error.message);
			});
	};

	const onSignIn = (e) => {
		e.preventDefault();

		validateAll();

		signInWithEmailAndPassword(auth, email, pass)
			.then((userCredential) => {
				clearErrors();
				clearFields();
				setSuccessAuth('Авторизация прошла успешно. Перенаправление...');
				redirectToMain();
			})
			.catch((error) => {
				errorCustom(error);
			});
	};
	const onRegister = async (e) => {
		e.preventDefault();

		await validateAll();

		if (emailError !== true || passError !== true) {
			return;
		}

		createUserWithEmailAndPassword(auth, email, pass)
			.then((userCredential) => {
				clearFields();
				setSuccessAuth('Аккаунт успешно создан. Вы уже авторизованы.');
				clearErrors();
				redirectToMain();
			})
			.catch((error) => {
				console.log('request');
				errorCustom(error);
			});
	};

	const onExit = (e) => {
		e.preventDefault();
		signOut(auth)
			.then(() => {
				clearFields();
				setSuccessAuth('Вы успешно вышли. Чтобы продолжить необходимо войти в аккаунт.');
				clearErrors();
			})
			.catch((error) => {
				errorCustom(error);
			});
	};

	return (
		<>
			<PageHeader />
			<div className='authWrapper'>
				<form action='' className='authForm'>
					<h3 className='formHeader'>Войти с помощью Email</h3>

					<div className='fieldWrapper'>
						<label htmlFor='login' className='formInputLabel'>
							Введите электронную почту*
						</label>
						{emailError ? <div className='authInfo authError'>{emailError}</div> : null}
						<input
							type='text'
							id='login'
							value={email}
							onChange={(e) => onChange(e, setEmail)}
							className={`formInput ${emailErrInpStyle}`}
						/>
					</div>
					<div className='fieldWrapper'>
						<label htmlFor='pass' className='formInputLabel'>
							Введите пароль*
						</label>
						{passError ? <div className='authInfo authError'>{passError}</div> : null}
						<input
							type='password'
							autoComplete='current-password'
							id='pass'
							value={pass}
							onChange={(e) => onChange(e, setPass)}
							className={`formInput ${passErrInpStyle}`}
						/>
					</div>
					{errorAuth ? <div className='authInfo authError'>{errorAuth}</div> : null}
					{successAuth ? <div className='authInfo authSuccess'>{successAuth}</div> : null}
					<div className='formButWrapper authButsWrapper'>
						<button type='button' className='formBut but' onClick={onSignIn}>
							Войти
						</button>
						<button type='button' className='formBut but' onClick={onRegister}>
							Зарегистрироваться
						</button>
					</div>
					<div className='authIconsWrapper'>
						<div className='authIconsContainer' onClick={onGoogle}>
							<img src={googleIcon} alt='Зайти с помощью Google' />
						</div>
					</div>
					<div className='formButWrapper'>
						<button type='button' className='formBut but' onClick={onExit}>
							Выйти из учетной записи
						</button>
					</div>
				</form>
			</div>
		</>
	);
}

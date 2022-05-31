import './auth.css';
import '../../css/common.css';

import {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import * as yup from 'yup';

import useAuth from '../../services/useAuth';

import PageHeader from '../../components/PageHeader/PageHeader';

import googleIcon from '../../assets/icons/google-icon.png';

export default function Auth({close}) {
	const {signInGoogle, signInEmail, registerEmail} = useAuth();

	const navigate = useNavigate();

	const [email, setEmail] = useState('');
	const [pass, setPass] = useState('');
	const [emailError, setEmailError] = useState(null);
	const [passError, setPassError] = useState(null);
	const [errorAuth, setErrorAuth] = useState(null);

	const emailErrInpStyle = emailError === null ? '' : 'errorInput';
	const passErrInpStyle = passError === null ? '' : 'errorInput';

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
		return validSchema
			.pick([id])
			.validate({[id]: value})
			.then(() => {
				setErr(null);
				return true;
			})
			.catch((err) => {
				setErr(err.message);
				return false;
			});
	};

	const validateAll = async () => {
		return [
			await validateField('email', email, setEmailError),
			await validateField('pass', pass, setPassError),
		];
	};

	const onChange = (e, setState) => {
		setState(e.target.value);
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
			case 'auth/wrong-password':
				setErrorAuth('Неправильный Email или пароль');
				break;
			case 'auth/user-not-found':
				setErrorAuth('Пользователь не найден');
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
		signInGoogle()
			.then(() => {
				redirectToMain();
			})
			.catch((error) => errorCustom(error));
	};

	const onSignIn = (e) => {
		e.preventDefault();

		signInEmail(email, pass)
			.then(() => {
				redirectToMain();
			})
			.catch((error) => {
				errorCustom(error);
			});
	};
	const onRegister = async (e) => {
		e.preventDefault();

		const validArr = await validateAll();

		if (validArr.includes(false)) {
			return;
		}

		registerEmail(email, pass)
			.then(() => {
				navigate('/userPage');
			})
			.catch((error) => {
				errorCustom(error);
			});
	};

	return (
		<>
			<PageHeader close={close} />
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
				</form>
			</div>
		</>
	);
}

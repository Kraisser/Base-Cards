import './auth.css';
import '../../css/common.css';

import {useState} from 'react';
import {useNavigate} from 'react-router-dom';

import useAuth from '../../services/useAuth';
import useValidate from '../../services/useValidate';

import PageHeader from '../../components/PageHeader/PageHeader';

import googleIcon from '../../assets/icons/google-icon.png';

export default function Auth() {
	const {signInGoogle, signInEmail, registerEmail} = useAuth();
	const {validateField} = useValidate();

	const navigate = useNavigate();

	const [email, setEmail] = useState('');
	const [pass, setPass] = useState('');
	const [emailError, setEmailError] = useState(null);
	const [passError, setPassError] = useState(null);
	const [errorAuth, setErrorAuth] = useState(null);

	const emailErrInpStyle = emailError === null ? '' : 'errorInput';
	const passErrInpStyle = passError === null ? '' : 'errorInput';

	const validateAll = async () => {
		const validRes = [
			await validateField('email', email, setEmailError),
			await validateField('pass', pass, setPassError),
		];

		return validRes.includes(false);
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
				setEmailError('Неверный Email');
				break;
			case 'auth/wrong-password':
				setErrorAuth('Неверный Email или пароль');
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

	const onSignIn = async (e) => {
		e.preventDefault();

		const validRes = await validateField('email', email, setEmailError);

		if (!validRes) {
			return;
		}

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

		const validRes = await validateAll();

		if (validRes) {
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
			<PageHeader close={false} />
			<div className='pageContentWrapper'>
				<form action='' className='authForm'>
					<h2 className='formHeader'>Войти с помощью Email</h2>

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
					<div className='fieldWrapper authButsWrapper'>
						<button type='button' className='but authBut' onClick={onSignIn}>
							Войти
						</button>
						<button type='button' className='but authBut' onClick={() => navigate('/resetPass')}>
							Восстановить пароль
						</button>
					</div>
					<div className='formButWrapper authButsWrapper'>
						<button type='button' className='but authBut' onClick={onRegister}>
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

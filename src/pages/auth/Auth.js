import './auth.css';
import '../../css/common.css';

import {useState} from 'react';
import {useNavigate, Link} from 'react-router-dom';

import useAuth from '../../services/useAuth';
import useValidate from '../../services/useValidate';

import PageHeader from '../../components/PageHeader/PageHeader';
import ShowPassIcon from '../../components/ShowPassIcon/ShowPassIcon';

import googleIcon from '../../assets/icons/google-icon.png';

export default function Auth() {
	const {signInGoogle, signInEmail, registerEmail} = useAuth();
	const {validateField} = useValidate();

	const navigate = useNavigate();

	const [email, setEmail] = useState('');
	const [pass, setPass] = useState('');
	const [passShow, setPassShow] = useState(false);
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
			case 'auth/popup-closed-by-user':
				setErrorAuth('Окно авторизации закрыто пользователем');
				break;
			case 'auth/internal-error':
				setErrorAuth('Внутренняя ошибка');
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

	const onSignIn = async (e, test) => {
		e.preventDefault();

		if (!test) {
			const validRes = await validateField('email', email, setEmailError);
			const passReq = await validateField('passRequired', pass, setPassError);

			if (!validRes || !passReq) {
				return;
			}
		}

		signInEmail(email, pass, test)
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
					<h2 className='formHeader'>Добро пожаловать</h2>

					<div className='fieldWrapper'>
						<label htmlFor='login' className='formInputLabel'>
							Введите электронную почту*
						</label>
						{emailError ? <div className='authInfo authError'>{emailError}</div> : null}
						<input
							type='text'
							id='login'
							name='login'
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
						<div className='passWrapper'>
							<input
								type={passShow ? 'text' : 'password'}
								autoComplete='current-password'
								id='pass'
								name='pass'
								value={pass}
								onChange={(e) => onChange(e, setPass)}
								className={`formInput formInputPass ${passErrInpStyle}`}
							/>
							<div className='showPassWrapper'>
								<ShowPassIcon
									id='passEye'
									width='30px'
									height='30px'
									animDuration={400}
									onClick={() => setPassShow(!passShow)}
								/>
							</div>
						</div>
						<div className='passRestoreWrapper'>
							<Link to='/resetPass' className='resetPassLink'>
								Забыли пароль?
							</Link>
						</div>
					</div>
					{errorAuth ? <div className='authInfo authError'>{errorAuth}</div> : null}
					<div className='authButsWrapper'>
						<button type='button' className='but authBut' onClick={onSignIn}>
							Войти
						</button>
						<button type='button' className='but authBut' onClick={onRegister}>
							Регистрация
						</button>
					</div>
					<div className='authOtherSign'>
						<div className='authTestSignWrapper'>
							<button className='but authTestBut' onClick={(e) => onSignIn(e, true)}>
								Тестовый аккаунт
							</button>
						</div>
						<div className='alternateSignWrapper'>
							<div className='alternateSignDescription'>Войти с помощью:</div>
							<div className='authIconsWrapper'>
								<div className='authIconsContainer' onClick={onGoogle}>
									<img src={googleIcon} alt='Зайти с помощью Google' />
								</div>
							</div>
						</div>
					</div>
				</form>
			</div>
		</>
	);
}

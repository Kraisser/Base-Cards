import '../auth/auth.css';
import './resetPass.css';
import '../../css/common.css';

import {useState} from 'react';
import {useNavigate} from 'react-router-dom';

import useAuth from '../../services/useAuth';
import useValidate from '../../services/useValidate';

import PageHeader from '../../components/PageHeader/PageHeader';

export default function ResetPass({close}) {
	const navigate = useNavigate();
	const {validateField} = useValidate();
	const {resetPass} = useAuth();

	const [email, setEmail] = useState('');
	const [emailError, setEmailError] = useState(null);
	const [successRequest, setSuccessRequest] = useState(null);

	const emailErrInpStyle = emailError === null ? '' : 'errorInput';

	const onChange = (e, setState) => {
		setState(e.target.value);
	};

	const clearErrors = () => {
		setEmailError(null);
	};

	const errorCustom = (error) => {
		setSuccessRequest(null);

		const code = error.code;
		console.log('ErrorCode: ', code);

		switch (code) {
			case 'auth/invalid-email':
				setEmailError('Неправильный Email');
				break;
			case 'auth/user-not-found':
				setEmailError('Пользователь не найден');
				break;

			default:
				setEmailError(`${code}: ${error.message}`);
				break;
		}
	};

	const redirectToMain = () => {
		navigate('/');
	};

	const onResetPass = async () => {
		const valid = await validateField('email', email, setEmailError);

		if (!valid) {
			return;
		}

		resetPass(email)
			.then(() => {
				clearErrors();
				setSuccessRequest('Запрос успешно отправлен. Перенаправление...');
				setTimeout(redirectToMain, 3000);
			})
			.catch((err) => errorCustom(err));
	};

	return (
		<>
			<PageHeader close={close} />
			<div className='authWrapper'>
				<form action='' className='authForm'>
					<h3 className='formHeader'>Восстановление пароля Email</h3>

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
					{successRequest ? <div className='authInfo authSuccess'>{successRequest}</div> : null}
					<div className='formButWrapper'>
						<button type='button' className='formBut but' onClick={onResetPass}>
							Отправить
						</button>
					</div>
				</form>
			</div>
		</>
	);
}

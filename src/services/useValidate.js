import * as yup from 'yup';

export default function useValidate() {
	const validSchema = yup.object().shape({
		email: yup
			.string('Введите строку')
			.email('Введите правильный Email')
			.required('Обязательное поле*'),
		pass: yup
			.string('Введите строку')
			.min(6, 'Минимум 6 символов')
			.matches(/(?=.*[0-9])(?=.*[a-zA-Z])/g, 'Пароль должен содержать минимум 1 цифру и букву')
			.required('Обязательное поле*'),
		passRequired: yup.string('Введите пароль').required('Обязательное поле*'),
		cardName: yup
			.string('Введите строку')
			.required('Обязательное поле*')
			.min(2, 'Минимум 2 символа')
			.max(55, 'Максимум 55 символов'),
		chapter: yup
			.string('Выберите раздел*')
			.required('Обязательное поле*')
			.min(2, 'Минимум 2 символа'),
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

	return {
		validateField,
	};
}

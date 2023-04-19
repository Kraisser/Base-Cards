import './helpPage.css';

import authImg from '../../assets/help_images/auth_help.JPG';

import {Link} from 'react-router-dom';

export default function HelpPage() {
	return (
		<div className='pageContentWrapper help'>
			<h2>Основные функции приложения</h2>
			<div className='pageContentContainer helpPageContainer'>
				<div className='helpWrapper'>
					<div className='helpContent'>
						<h3>Вход в аккаунт</h3>
						<img src={authImg} alt='Окно авторизации' />
						<div className='helpText'>
							Можно использовать электронную почту или зайти с помощью Google аккаунта. Авторизция
							полностью безопасна поэтому можете не переживать за сохранность личных данных. Есть
							возможность протестировать основные функции приложения нажав на кнопку "Тестовый
							аккаунт"
						</div>
					</div>
				</div>
				<div className='helpWrapper'>
					<div className='helpContent'>
						<h3>Добавить раздел</h3>
						<img src={authImg} alt='Окно авторизации' />
						<div className='helpText'>
							Для начала необходимо создать разделы. Они нужны для упрощения навигации и разделения
							данных по темам. В поле "Редактирование" нужно ввести название будущего раздела и
							нажать "+".
						</div>
					</div>
				</div>
				<div className='helpWrapper'>
					<div className='helpContent'>
						<h3>Вход в аккаунт</h3>
						<img src={authImg} alt='Окно авторизации' />
						<div className='helpText'>
							При загрузке вы должны войти в приложение. Можно использовать электронную почту или
							зайти с помощью Google аккаунта. Авторизция полностью безопасна поэтому можете не
							переживать за сохранность личных данных. Есть возможность протестировать основные
							функции приложения нажав на кнопку "Тестовый аккаунт"
						</div>
					</div>
				</div>
			</div>
			<div className='onMainButWrapper'>
				<Link to='/'>
					<button className='onMainBut but'>На главную</button>
				</Link>
			</div>
		</div>
	);
}

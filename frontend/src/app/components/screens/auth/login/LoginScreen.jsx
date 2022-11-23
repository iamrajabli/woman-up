import { useState } from 'react';
import useAuth from '../../../../../../hooks/useAuth';

import Alert from '../../../ui/alert/Alert';

const LoginScreen = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { auth, error } = useAuth('login')

    const handleLogin = async (e) => {
        e.preventDefault();

        auth(email, password);

    }

    return (
        <div className='container'>
            <div className="w-[500px] border border-gray-300 m-auto p-3 mt-28">
                <div>
                    <h1 className='text-2xl font-bold text-center mb-2'>
                        Вход
                    </h1>
                </div>

                {error && <Alert text={error} />}


                <form
                    onSubmit={handleLogin}
                    className='flex flex-col gap-3'>
                    <input
                        onChange={(e) => setEmail(e.target.value)}
                        type="text"
                        name="name"
                        className='py-2 px-2 outline-none border'
                        placeholder='Введите электронную почту' />
                    <input
                        onChange={(e) => setPassword(e.target.value)}
                        type="password"
                        name="password"
                        className='py-2 px-2 outline-none border'
                        placeholder='Введите пароль' />

                    <button
                        className='p-3 bg-primaryText text-primaryBg'
                        type='submit'>
                        Авторизоваться
                    </button>
                </form>
            </div>
        </div>
    );
};

export default LoginScreen;
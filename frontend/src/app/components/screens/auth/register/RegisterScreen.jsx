import { useState } from 'react';
import useAuth from '../../../../../hooks/useAuth';


import Alert from '../../../ui/alert/Alert';


const RegisterScreen = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { error, auth } = useAuth('register');

    const handleRegister = async (e) => {
        e.preventDefault();

        auth(email, password)

    }

    return (
        <div className='container'>
            <div className="w-[500px] border border-gray-300 m-auto p-3 mt-28">
                <div>
                    <h1 className='text-2xl font-bold text-center mb-2'>
                        Регистрация
                    </h1>
                </div>

                {error && <Alert type={'danger'} text={error} />}
                <form
                    onSubmit={handleRegister}
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
                        Регистрация
                    </button>
                </form>
            </div>
        </div>
    );
};

export default RegisterScreen;
import logo from '../../../assets/images/logo.svg';

import { NavLink, useNavigate, Link } from 'react-router-dom';

import { navLinks } from '../../../../data/nav';

import { useContext } from 'react';
import { AuthContext } from '../../../contexts/AuthProvider';


const Header = () => {

    const { auth, setAuth } = useContext(AuthContext);

    const navigate = useNavigate();

    const activeStyle = {
        color: 'gray',
        textDecoration: 'underline'
    }


    const logout = () => {
        localStorage.removeItem('user');
        navigate('/login');
        setAuth('')
    }

    return (
        <div className="container">
            <div className="flex justify-between items-center">
                <div>
                    <Link to='/'>
                        <img src={logo} alt="logo" />
                    </Link>
                </div>
                <div>
                    <ul className='flex gap-20'>

                        {auth && <>
                            <li>{auth.user.email}</li>
                            <NavLink
                                className='font-medium text-primaryText'
                                style={(navClass) => (navClass.isActive ? activeStyle : undefined)}
                                to='/'>
                                Главная
                            </NavLink>

                        </>}

                        {!auth && navLinks.map(({ title, path }) => (
                            <li key={title}>
                                <NavLink
                                    className='font-medium text-primaryText'
                                    style={(navClass) => (navClass.isActive ? activeStyle : undefined)}
                                    to={path}>
                                    {title}
                                </NavLink>
                            </li>
                        ))}

                        {auth && <li
                            onClick={logout}
                            className='cursor-pointer'>
                            <p className='font-medium text-primaryText'>
                                Выйти
                            </p>
                        </li>}
                    </ul>
                </div>
            </div>
        </div>
    )
};

export default Header;
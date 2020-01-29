import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import { AuthContext } from '../../context/auth'
import { ReactComponent as Logo } from '../../assets/crown.svg';

import './header.styles.scss';

const Header = () => {
    const context = useContext(AuthContext)
    return (
        context.user ? (
            <div className='header'>
                <Link className='logo-container' to='/'>
                    <Logo className='logo' />
                </Link>
                <div className='options'>
                    <Link className='option' to='/about'> ABOUT</Link>
                    <Link className='option' to='/account'>{context.user.username.toUpperCase()}</Link>
                    <div className='option' to='/signin' onClick={context.logout}> SIGN OUT </div>
                </div>
            </div>
        ) : (
            <div className='header'>
                <Link className='logo-container' to='/'>
                    <Logo className='logo' />
                </Link>
                <div className='options'>
                    <Link className='option' to='/about'> ABOUT </Link>
                    <Link className='option' to='/signup'>SIGN UP</Link>
                    <Link className='option' to='/signin'>SIGN IN</Link>
                </div>
            </div>
            )


    )
};


export default Header;
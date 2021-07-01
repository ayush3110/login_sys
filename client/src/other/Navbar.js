import React from 'react';
import { NavLink } from 'react-router-dom';
import UserStore from '../stores/UserStore';

const Navbar = (props) => {
    return (
        <>
            <div className="_navbar">
                <div className="_menu">
                        <NavLink activeClassName='active_class' className='_link' to='/home'>
                            Home
                        </NavLink>

                        <NavLink activeClassName='active_class' className='_link' to='/user/dashbord'>
                            Dashbord
                        </NavLink>

                        <NavLink activeClassName='active_class' className='_link' to='/user/todo'>
                            Todo
                        </NavLink>

                        <NavLink activeClassName='active_class' className='_link' to='/user/login'>
                            Login
                        </NavLink>

                        <NavLink activeClassName='active_class' className='_link' to='/user/signin'>
                            Sign In
                        </NavLink>
                </div>
            </div>
        </>
    );
};

export default Navbar;
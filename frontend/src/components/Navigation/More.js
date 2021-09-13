import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from "react-router-dom";
import * as sessionActions from '../../store/session';
import './Navigation.css';


function More({ setActiveMore }) {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user)

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
  };

  return (
    <div className='more__page'>
        <NavLink to='/' activeClassName='selected'>Home</NavLink>
        <NavLink to='/about-us' activeClassName='selected'>About Us</NavLink>
        <NavLink to='/contact-us' activeClassName='selected'>Contact Us</NavLink>
        {sessionUser && <div onClick={logout}>Log Out</div>}
        <i className='far fa-window-close' onClick={() => setActiveMore(false)}/>
    </div>
  );
}

export default More;

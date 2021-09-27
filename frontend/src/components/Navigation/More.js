import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from "react-router-dom";
import * as sessionActions from '../../store/session';
import './Navigation.css';


function More({ setActiveMore }) {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user)
  const [contentLoaded, setContentLoaded] = useState('slide__in')

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
  };

  console.log(contentLoaded)

function slideOutFunction() {
      if(contentLoaded === 'slide__out'){
          setActiveMore(false)
      }
  }
function closePage(){
    setContentLoaded('slide__out')
}

  return (
    <div className={`more__page ${contentLoaded}`} onAnimationEnd={() => slideOutFunction()}>
        <NavLink exact to='/' className='more__home' activeClassName='selected'>Home</NavLink>
        <NavLink to='/about-us' className='more__about' activeClassName='selected'>About Us</NavLink>
        <NavLink to='/contact-us' className='more__contact' activeClassName='selected'>Contact Us</NavLink>
        {sessionUser && <div className='more__logout' onClick={logout}>Log Out</div>}
        <i className='fas fa-times-circle' onClick={() => closePage()}/>
    </div>
  );
}

export default More;

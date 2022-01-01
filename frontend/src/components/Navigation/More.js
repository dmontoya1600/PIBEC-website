import React, { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useHistory } from "react-router-dom";
import * as sessionActions from '../../store/session';
import './Navigation.css';
import {removehash} from '../../Help_functions'

function More({ setActiveMore }) {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user)
  const [contentLoaded, setContentLoaded] = useState('slide__in')
  const history = useHistory()

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
    <div className='more__component'>
      <div className={`more__page ${contentLoaded}`} onAnimationEnd={() => slideOutFunction()}>
          <NavLink exact to='/' className='more__home' activeClassName='selected'>Home</NavLink>
          <a onClick={() => removehash(history)} href='#about_us' className='more__about' >About Us</a>
          <a onClick={() => removehash(history)} href='#contact__link' className='more__contact' >Contact Us</a>
          {sessionUser && <div className='more__logout' onClick={logout}>Log Out</div>}
          <i className='fas fa-times' onClick={() => closePage()}/>
          {/* <NavLink exact to='/staff' className='more__staff' activeClassName='selected'>Staff</NavLink> */}
          <NavLink exact to='/calendar' className='more__calendar' activeClassName='selected'>Calendar</NavLink>

      </div>
          <div className='more__background' onClick={() => closePage()} ></div>
    </div>
  );
}

export default More;

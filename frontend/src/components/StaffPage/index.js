import React, {useState} from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './staff.css';

function StaffPage({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);

  console.log('entering component')
  return (
      <>
        <div className='page__title'><p>Our Staff</p></div>
        <div className='staff__page'>
            <div className='staff__row'>
                <div className='staff__image'>Image Goes Here</div>
                <div className='staff__title'><p>Samuel Gomez, Pastor</p></div>
                <div className='staff__info'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </div>
            </div>
            {/* <div className='staff__row'>
                <div className='staff__image'></div>
                <div className='staff__title'><p>Adriana Gomez, Pastor's wife</p></div>
                <div className='staff__info'></div>
            </div> */}
            <div className='staff__row'>
                <div className='staff__image'>Image Goes Here</div>
                <div className='staff__title'><p>Damian Montoya, Youth Pastor</p></div>
                <div className='staff__info'>As the Youth Pastor, Damian organizes activities, creates messages, and preaches to the youth group. He likes to play piano and works as a software developer.</div>
            </div>
            {/* <div className='staff__row'>
                <div className='staff__image'></div>
                <div className='staff__title'><p></p></div>
                <div className='staff__info'></div>
            </div> */}
        </div>
    </>
  );
}

export default StaffPage;

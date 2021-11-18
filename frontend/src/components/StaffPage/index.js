import React, {useState} from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './staff.css';

function StaffPage({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);

  console.log('entering component')
  return (
    <div className='staff__page'>
        <div className='staff__row'>
            <div className='staff__image'></div>
            <div className='staff__title'>Testing Information section </div>
            <div className='staff__info'></div>
        </div>
        <div className='staff__row'>
            <div className='staff__image'></div>
            <div className='staff__title'>Testing Information section </div>
            <div className='staff__info'></div>
        </div>
        <div className='staff__row'>
            <div className='staff__image'></div>
            <div className='staff__title'>Testing Information section </div>
            <div className='staff__info'></div>
        </div>
        <div className='staff__row'>
            <div className='staff__image'></div>
            <div className='staff__title'>Testing Information section </div>
            <div className='staff__info'></div>
        </div>
    </div>
  );
}

export default StaffPage;

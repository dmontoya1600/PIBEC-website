import React, { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import SlideShow from './SlideShow';
import './HomePage.css'


function HomePage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);

  return (
    <div className='home__page'>
        <SlideShow />
        <div className='home__page__content'>
            <div className='inner__stuff'>This thing is going to have a lot of  stuff</div>
        </div>
    </div>
  );
}

export default HomePage;

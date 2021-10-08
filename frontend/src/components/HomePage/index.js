import React, { useEffect, useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useParams } from 'react-router-dom';
import SlideShow from './SlideShow';
import EmbeddedPost from './EmbeddedPost';
import './HomePage.css'
import { getImages } from '../../store/images';


function HomePage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const location = 'homepage'

  useEffect(() => {

  }, [])

  return (
    <div className='home__page'>
        <SlideShow location={location}/>
        <div className='home__page__content'>
            <div className='inner__stuff'>This thing is going to have a lot of  stuff</div>
            <div className='rando__stuff'>RANDOM STUFF</div>
            <EmbeddedPost location={location}/>
        </div>
    </div>
  );
}

export default HomePage;

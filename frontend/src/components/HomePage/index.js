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
          <div className='home__page__information'>
            <div className='information__tabs'>
              <i className="fas fa-clock information__icon" />
              <div className='information__text'>Service time, Sundays 11a.m, Wednesday 7p.m</div>
            </div>
            <div className='information__tabs'>
              <i className="fas fa-map-marker-alt information__icon" />
              <div className='information__text'>2000 North Minnasota Ave Brownsville, TX 78521</div>
            </div>
            {/* <div className='information__tabs'>
              <i className="fa-solid fa-location-dot information__icon" />
              <div className='information__text'>2000 North Minnasota Ave Brownsville, TX 78521</div>
            </div> */}
          </div>
            <div className='inner__stuff'>This thing is going to have a lot of  stuff</div>
            <div className='rando__stuff'>RANDOM STUFF</div>
            <EmbeddedPost location={location}/>
        </div>
    </div>
  );
}

export default HomePage;

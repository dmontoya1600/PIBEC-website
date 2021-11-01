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
            <div className='information__tabs clock'>
              <i className="fas fa-clock information__icon clock" />
              <div className='information__text'>Service time, Sundays 11a.m, Wednesday 7p.m</div>
            </div>
            <div className='information__tabs location' href='#google__map'>
              <i className="fas fa-map-marker-alt information__icon location" />
              <a className='information__text location' href='#google__map'>2000 North Minnasota Ave Brownsville, TX 78521</a>
            </div>
            {/* <div className='information__tabs'>
              <i className="fa-solid fa-location-dot information__icon" />
              <div className='information__text'>2000 North Minnasota Ave Brownsville, TX 78521</div>
            </div> */}
          </div>
            <EmbeddedPost location={location}/>
            <div className='inner__stuff'>This thing is going to have a lot of  stuff</div>
            <div className='rando__stuff'>RANDOM STUFF</div>
            <div id='google__map' dangerouslySetInnerHTML={{ __html: `<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3587.886786570354!2d-97.43290918497543!3d25.938941883556623!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x866fbe0425939131%3A0xb4534ad760db747a!2s2000%20N%20Minnesota%20Ave%2C%20Brownsville%2C%20TX%2078521!5e0!3m2!1sen!2sus!4v1635742369010!5m2!1sen!2sus" width="550" height="350" style="border:0;" allowfullscreen="" loading="lazy" />`}} />
        </div>
    </div>
  );
}

export default HomePage;

import React, { useEffect, useRef, useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useParams, useHistory } from 'react-router-dom';
import SlideShow from './SlideShow';
import EmbeddedPost from './EmbeddedPost';
import Footer from './Footer';
import './HomePage.css'
import { getImages } from '../../store/images';
import {useOnScreen, removehash} from '../../Help_functions'



function HomePage() {
  const dispatch = useDispatch();
  const history = useHistory()
  const sessionUser = useSelector(state => state.session.user);
  const location = 'homepage'
  const ref = useRef()
  const ref2 = useRef()
  const ref3 = useRef()
  const ref4 = useRef()

  useEffect(() => {

  }, [])


  return (
    <div className='home__page'>
        <SlideShow location={location}/>
        <div className='home__page__content'>
          <div className='home__page__information'>

            <div className='information__tabs live_stream'>
              <i className="fas fa-desktop information__icon live_stream" />
              <a href='#embedded__title' onClick={() => removehash(history)} className='information__text live_stream'>Watch us live!</a>
            </div>
            <div className='information__tabs clock'>
              <i className="fas fa-clock information__icon clock" />
              <div className='information__text'>Service time, Sundays 11a.m, Wednesday 7p.m</div>
            </div>
            <div className='information__tabs location' href='#google__map'>
              <i className="fas fa-map-marker-alt information__icon location" />
              <a className='information__text location' onClick={(e) => removehash(history) }href='#google__map'>2000 North Minnasota Ave Brownsville, TX 78521</a>
            </div>

          </div>
            <div id='embedded__title' ref={ref4} className={"embedded__title scroll-transition-fade " +(useOnScreen(ref4) ? 'nothing' : 'below-viewport-2')}>Stream the church service</div>
            <EmbeddedPost location={location}/>
            <div id='about_us' className={'about__us__home scroll-transition-fade '} ref={ref} >
              <p className={"about__us__text scroll-transition-fade " +(useOnScreen(ref) ? 'nothing' : 'below-viewport')} ref={ref} >About Us</p>
              <p className={"about__believe__title scroll-transition-fade " +(useOnScreen(ref3) ? 'nothing' : 'below-viewport-3')} ref={ref3}>Lo que creemos.</p>
              <p className={'about__believe__content scroll-transition-fade ' +(useOnScreen(ref3) ? 'nothing' : 'below-viewport-2')} ref={ref3}>
                Creemos en el Padre, Hijo, y El Espíritu Santo. Se predica de la Santa Biblia Reyna Valera Gomez. La salvación viene por El arrepentimiento de sus pecados y recibiendo a Jesucristo como su Señor y Salvador!
              </p>
              <p className={'about__location scroll-transition-fade ' +(useOnScreen(ref2) ? 'nothing' : 'below-viewport-2')} ref={ref2}>Donde estamos.</p>
              <div className={"scroll-transition-fade " +(useOnScreen(ref2) ? 'nothing' : 'below-viewport-3')} id='google__map' ref={ref2} dangerouslySetInnerHTML={{ __html: `<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3587.886786570354!2d-97.43290918497543!3d25.938941883556623!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x866fbe0425939131%3A0xb4534ad760db747a!2s2000%20N%20Minnesota%20Ave%2C%20Brownsville%2C%20TX%2078521!5e0!3m2!1sen!2sus!4v1635742369010!5m2!1sen!2sus" width="550" height="350" style="border:0;" allowfullscreen="" loading="lazy" />`}} />
            </div>
            <div className='contact__link' id='contact__link' />
            <Footer />
        </div>
    </div>
  );
}

export default HomePage;

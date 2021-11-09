import React, { useEffect, useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useParams, useHistory } from 'react-router-dom';
import ChangeImages from '../ChangeImages';
import './HomePage.css'
import { getImages } from '../../store/images';
import logo from '../../images/logo.png'
import {removehash} from '../../Help_functions'


function SlideShow({location}) {
  const dispatch = useDispatch();
  const history = useHistory()
  const sessionUser = useSelector(state => state.session.user);
  let imageArr = useSelector(state => state.images[location])
  let [currentIdx, setCurrentIdx] = useState(0)
  let [currentSlide, setCurrentSlide] = useState(imageArr?.[currentIdx])
  let [fadeinto, setFadeIn] = useState(1)
  let [authSlide, setAuthSlide] = useState('home')
  let [changeSlide, setChangeSlide] = useState(false)
  let [timer, setTimer] = useState(0)

  useEffect(() => {
    dispatch(getImages(location))
    if( currentIdx === imageArr?.length && imageArr?.length !== 0 ){
      if(currentIdx === 0){
        setCurrentIdx( imageArr?.length - 1)
      } else {
        setCurrentIdx( currentIdx - 1 )
      }
      // if slide is 0 it will move them to the final slide
      // if slide is deleted and user is currently on deleted slide it will move them one slide back
    }
    if( currentIdx < (imageArr?.length - 1)  ){
      setCurrentIdx (imageArr?.length - 1)
    }
  }, [imageArr?.length])


  useEffect(() => {

    if(sessionUser){
      setAuthSlide('authslide')
    }
  }, [sessionUser])

  useEffect(() => {
    if(imageArr){
        setFadeIn(1)
        setCurrentSlide(imageArr[currentIdx])
    }
  }, [currentIdx, imageArr])

  function handleLeftClick() {
    if(currentIdx === 0){
        setCurrentIdx(imageArr.length - 1)
    } else{
        setCurrentIdx(currentIdx - 1)
    }
  }

  function handleRightClick() {
    if(currentIdx === (imageArr?.length - 1)){
        setCurrentIdx(0)
    } else{
        setCurrentIdx(currentIdx + 1)
    }
  }

  function handleSlideClick() {
    setChangeSlide(true)
  }

  useEffect(() => {
      if(currentIdx === (imageArr?.length - 1) || imageArr?.length <= 0 || !imageArr){
        return setCurrentIdx(0)
      }
      else{
        return setCurrentIdx(currentIdx + 1)
      }
  }, [timer]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer(timer => timer + 1);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  function bubbleArr(){
    if(imageArr?.length >= 1){

      return imageArr?.map((ele, idx) => {
        if(idx === currentIdx){
         return <i className='fas fa-circle' onClick={() => setCurrentIdx(idx)} />
        } else {
         return <i className='far fa-circle' onClick={() => setCurrentIdx(idx)} />
        }
      })
    }
  }

  return (
    <div className={`slideshow__component ${authSlide}`}>
      {changeSlide&& sessionUser ?
        <div className='shadow__background' onClick={ () => setChangeSlide(false)} />
      :null}
      {changeSlide && sessionUser ?
        <ChangeImages setChangeSlide={setChangeSlide} imageArr={imageArr} location={location} />
      : null}
        {authSlide === 'authslide' ? <div className='slideshow__overlay' onClick={() => handleSlideClick()}/> : <div className='slideshow__overlay' /> }
        <i className='fas fa-arrow-left slide__arrow left__arrow' onClick={() => handleLeftClick()}/>
        <i className='fas fa-arrow-right slide__arrow right__arrow' onClick={() => handleRightClick()}/>
        <div className='slide__phone'>Primera Iglesia Bautista El Calvario</div>
        <div className='slide__message'>
          <img src={logo}/>

           {/* Primera Iglesia Bautista El Calvario */}
        </div>
        <a onClick={() => removehash(history)}href='#contact__link' className='slide__contact'>CONTACT US</a>
        <div className='slide__array'>{bubbleArr()}</div>
        <img fadeinto={fadeinto} onAnimationEnd={() => setFadeIn(0)} className='slide__image' src={currentSlide?.imageUrl} />
    </div>
  );
}

export default SlideShow;

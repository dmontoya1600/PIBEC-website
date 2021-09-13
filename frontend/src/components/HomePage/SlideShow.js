import React, { useEffect, useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useParams } from 'react-router-dom';
import ChangeImages from '../ChangeImages';
import './HomePage.css'
import { getImages } from '../../store/images';

function SlideShow({location}) {
  console.log('THIS IS LOCATION', location)
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  let imageArr = useSelector(state => state.images[location])
  let [currentIdx, setCurrentIdx] = useState(0)
  let [currentSlide, setCurrentSlide] = useState(imageArr?.[currentIdx])
  let [fadeinto, setFadeIn] = useState(1)
  let [authSlide, setAuthSlide] = useState('home')
  let [changeSlide, setChangeSlide] = useState(false)

  // imageArrs = useSelector(state => state.arrays)

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
    if(currentIdx === (imageArr.length - 1)){
        setCurrentIdx(0)
    } else{
        setCurrentIdx(currentIdx + 1)
    }
  }

  function handleSlideClick() {
    setChangeSlide(true)
  }


  return (
    <div className={`slideshow__component ${authSlide}`}>
      {changeSlide && sessionUser ? <ChangeImages setChangeSlide={setChangeSlide} imageArr={imageArr} location={location} />: null}
        {authSlide === 'authslide' ? <div className='slideshow__overlay' onClick={() => handleSlideClick()}/> : <div className='slideshow__overlay' /> }
        <i className='fas fa-arrow-left slide__arrow left__arrow' onClick={() => handleLeftClick()}/>
        <i className='fas fa-arrow-right slide__arrow right__arrow' onClick={() => handleRightClick()}/>
        <div className='slide__phone'>956-123-4567</div>
        <div className='slide__message'>WELCOME TO PIBEC</div>
        <div className='slide__contact'>CONTACT US</div>
        <img fadeinto={fadeinto} onAnimationEnd={() => setFadeIn(0)} className='slide__image' src={currentSlide?.imageUrl} />
    </div>
  );
}

export default SlideShow;

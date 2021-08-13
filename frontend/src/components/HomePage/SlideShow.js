import React, { useEffect, useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import './HomePage.css'

function SlideShow() {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  let imageArr = [{image_url:'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg'},
  {image_url:'https://cdn.pixabay.com/photo/2015/04/19/08/32/marguerite-729510__340.jpg'},
  {image_url:'https://st.depositphotos.com/1428083/2946/i/600/depositphotos_29460297-stock-photo-bird-cage.jpg'}]

  let [currentIdx, setCurrentIdx] = useState(0)
  let [currentSlide, setCurrentSlide] = useState(imageArr[currentIdx])
  let [fadeinto, setFadeIn] = useState(1)
  let [authSlide, setAuthSlide] = useState('home')
  let [changeSlide, setChangeSlide] = useState(false)
  // imageArrs = useSelector(state => state.arrays)
  useEffect(() => {

  })

  useEffect(() => {
    //   dispatch(imageArray('homepage'))
    if(sessionUser){
      setAuthSlide('authslide')
    }
  }, [sessionUser])

  useEffect(() => {
    if(imageArr){
        setFadeIn(1)
        setCurrentSlide(imageArr[currentIdx])
    }
  }, [currentIdx])

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
      {changeSlide ? <div className='TEST'></div> : null}
        {authSlide === 'authslide' ? <div className='slideshow__overlay' onClick={() => handleSlideClick()}/> : null }
        <i className='fas fa-arrow-left slide__arrow left__arrow' onClick={() => handleLeftClick()}/>
        <i className='fas fa-arrow-right slide__arrow right__arrow' onClick={() => handleRightClick()}/>
        <div className='slide__phone'>956-123-4567</div>
        <div className='slide__message'>WELCOME TO PIBEC</div>
        <div className='slide__contact'>CONTACT US</div>
        <img fadeinto={fadeinto} onAnimationEnd={() => setFadeIn(0)} className='slide__image' src={currentSlide.image_url} />
    </div>
  );
}

export default SlideShow;

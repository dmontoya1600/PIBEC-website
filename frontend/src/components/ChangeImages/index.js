import React, { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import './ChangeImages.css'


function ChangeImages({imageArr, setChangeSlide}) {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);

  async function uploadFile(e){
    // await dispatch(updateFarmImage(e.target.files[0], farm.id))
}

  console.log('this is imagearr', imageArr)
  return (
    <div className='change__image__page'>
      <input type='file' id='file' hidden onChnage={(e) => uploadFile(e)}/>
      <i className='fas fa-window-close image__close' onClick={() => setChangeSlide(false)}/>
        {imageArr.map(imageObj => (
          <div key={imageObj.image_url} className='image__card' style={{backgroundImage: `url(${imageObj.image_url})`, backgroundSize: '150px 100px'}}>
                <i className='fa fa-close image__delete'/>
            </div>
        ))}
        <i className='fas fa-plus image__add' onClick={() => document.getElementById('file').click()}/>
    </div>
  );
}

export default ChangeImages;

import React, { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import './ChangeImages.css'
import { removeImage, uploadImage } from '../../store/images';


function ChangeImages({imageArr, setChangeSlide, location}) {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);

  async function uploadFile(e){
    await dispatch(uploadImage(e.target.files[0], location))
    setChangeSlide(false)
}

  async function deleteImage(imageId){
    // await dispatch(removeImage(imageId, location))
    await dispatch(removeImage(imageId, location))
  }

  return (
    <div className='change__image__page'>
      <input type='file' id='file' hidden onChange={(e) => uploadFile(e)}/>
      <i className='fas fa-window-close image__close' onClick={() => setChangeSlide(false)}/>
        {imageArr.map(imageObj => (
          <div key={imageObj.imageUrl} className='image__card' style={{backgroundImage: `url(${imageObj.imageUrl})`, backgroundSize: '150px 100px'}}>
                <i className='fa fa-close image__delete' onClick={ (e) => deleteImage(imageObj.id)}/>
            </div>
        ))}
        <i className='fas fa-plus image__add' onClick={() => document.getElementById('file').click()}/>
    </div>
  );
}

export default ChangeImages;

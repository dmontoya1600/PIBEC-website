import React from 'react';
import { useDispatch } from 'react-redux';
import './ChangeImages.css'
import { removeImage, uploadImage } from '../../store/images';


function ChangeImages({imageArr, setChangeSlide, location}) {
  const dispatch = useDispatch();

  async function uploadFile(e){
    await dispatch(uploadImage(e.target.files[0], location))
}

  async function deleteImage(imageId){
    await dispatch(removeImage(imageId, location))
  }

  return (
      <div className='change__image__page' style={{gridTemplate: `100px / repeat(${imageArr?.length + 1}, 150px) 45px`}}>
        <input type='file' id='file' hidden onChange={(e) => uploadFile(e)}/>
        <i className='fas fa-window-close image__close' onClick={() => setChangeSlide(false)}/>
          {imageArr ? imageArr.map(imageObj => (
            <div key={imageObj.imageUrl} className='image__card' style={{backgroundImage: `url(${imageObj.imageUrl})`, backgroundSize: '150px 100px'}}>
                  <i className='fa fa-close image__delete' onClick={ (e) => deleteImage(imageObj.id)}/>
              </div>
          )) :
          null }
          <i className='fas fa-plus image__add' onClick={() => document.getElementById('file').click()}/>
      </div>
  );
}

export default ChangeImages;

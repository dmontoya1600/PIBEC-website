import React, {useState, useRef, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './HomePage.css'
import {useOnScreen} from '../../Help_functions'
import {getEmbeddedCode, updateEmbeddedCode} from '../../store/embedded'


function EmbeddedPost({ location }){
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const embeddedArray = useSelector(state => state.embedded[location])
  const [openCode, setOpenCode] = useState(false)
  const [embeddedCode, setEmbeddedCode] = useState('')
  const [mostRecentPost, setMostRecentPost] = useState(null)
  const [contentLoaded, setContentLoaded] = useState('slide__up')
  const ref = useRef()
  useEffect(() => {
    dispatch(getEmbeddedCode(location))
  }, [])
  useEffect(() => {
    let maxVal = null;
    if (embeddedArray?.length >= 1){
      embeddedArray.forEach(e => {

        if(maxVal === null){
          maxVal = e
        } else if(new Date(maxVal?.createdAt) - new Date(e?.createdAt) < 0) {
          maxVal = e
        }
      })
      setMostRecentPost(maxVal)
    }
  }, [embeddedArray])

  function handleUpdate(e) {
    console.log('testing submit form', embeddedCode);
    if(embeddedArray === undefined){
      console.log('YOU MUST PASS IN A VALUE')
    }
    if(embeddedCode?.includes('<iframe')){
      console.log('YES IT INCLUDES IT')
      // setEmbeddedCode(null)

      dispatch(updateEmbeddedCode(embeddedCode, location))
    } else{
      console.log('YOU MUST PASS IN AN IFRAME');

    }
    setEmbeddedCode('')
    setContentLoaded('slide__down')
  }

function slideDownFunction(){
  if(contentLoaded === 'slide__down') {
    setOpenCode(false)
    setContentLoaded('slide__up')
  }
}
function clickedOnIcon(){
  if(openCode){
    setContentLoaded('slide__down')
  }
  else if (!openCode){
    setOpenCode(true)
  }
}

  function embedded__update(){
    return (
      <form className={`embedded__update__page ${contentLoaded}`} onAnimationEnd={() => slideDownFunction()}>
        <i className="fas fa-times-circle" onClick={() => setContentLoaded('slide__down')}/>
        <input type='text' value={embeddedCode} className='embedded__input' placeholder='Paste Embedded Code...' onChange={(e) => setEmbeddedCode(e.target.value)}/>
        <i onClick={()=> handleUpdate()} className="fas fa-upload"/>
      </form>
    )
  }

  return (
    <div id='embedded__element' className={"embedded__component scroll-transition-fade " +(useOnScreen(ref) ? 'nothing' : 'below-viewport-3')} ref={ref}>
      {openCode && sessionUser ?
        embedded__update()
      :null}
      {sessionUser?
        <div className='embedded__controls'>
            <i className="fas fa-code" onClick={() => clickedOnIcon()} />
        </div> :null}
        <div className='embedded__post' dangerouslySetInnerHTML={{ __html: mostRecentPost?.code}}></div>
    </div>
  );
}

export default EmbeddedPost;

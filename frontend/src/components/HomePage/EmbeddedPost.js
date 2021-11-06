import React, {useState, useRef} from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import './HomePage.css'
import {useOnScreen} from '../../Help_functions'
import {updateEmbeddedCode} from '../../store/embedded'


function EmbeddedPost({ isLoaded, location }){
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const [openCode, setOpenCode] = useState(false)
  const [embeddedCode, setEmbeddedCode] = useState(null)
  const ref = useRef()

  function handleUpdate(e) {
    console.log('testing submit form', embeddedCode);
    if(embeddedCode.includes('<iframe')){
      console.log('YES IT INCLUDES IT')
      return dispatch(updateEmbeddedCode(embeddedCode, location))
    } else{
      console.log('NOPE NOT HERE');

    }
  }

  function embedded__update(){
    return (
      <form className='embedded__update__page'>
        <input type='text' className='embedded__input' placeholder='Paste Embedded Code...' onChange={(e) => setEmbeddedCode(e.target.value)}/>
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
            <i className="fas fa-code" onClick={() => setOpenCode(!openCode)} />
        </div> :null}
        <div className='embedded__post' dangerouslySetInnerHTML={{ __html: `<iframe src="https://www.facebook.com/plugins/video.php?height=314&href=https%3A%2F%2Fwww.facebook.com%2Fpibelcalvario%2Fvideos%2F3039717636268186%2F&show_text=false&width=560&t=0" width="560" height="314" style="border:none;overflow:hidden" scrolling="no" frameborder="0" allowfullscreen="true" allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share" allowFullScreen="true" />`}}></div>
    </div>
  );
}

export default EmbeddedPost;

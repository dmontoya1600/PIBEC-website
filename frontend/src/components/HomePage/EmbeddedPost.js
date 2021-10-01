import React, {useState} from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './HomePage.css'



function EmbeddedPost({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);
  const [openCode, setOpenCode] = useState(false)


  return (
    <div className='embedded__component'>
        <div className='embedded__controls'>
            <i className="fas fa-code" onClick={() => setOpenCode(!openCode)} />
        </div>
        <div className='embedded__post' dangerouslySetInnerHTML={{ __html: `<iframe src="https://www.facebook.com/plugins/video.php?height=314&href=https%3A%2F%2Fwww.facebook.com%2Fpibelcalvario%2Fvideos%2F3039717636268186%2F&show_text=false&width=560&t=0" width="560" height="314" style="border:none;overflow:hidden" scrolling="no" frameborder="0" allowfullscreen="true" allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share" allowFullScreen="true" />`}}></div>
    </div>
  );
}

export default EmbeddedPost;

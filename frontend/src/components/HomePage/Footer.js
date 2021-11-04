import React, {useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './HomePage.css'



function Footer({ isLoaded }){
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const [openCode, setOpenCode] = useState(false)
  const [embeddedCode, setEmbeddedCode] = useState(null)

  return (
    <div id='footer' className='homepage__footer'>
        <div className='footer__contact__us'>
            <p>Do you have a question or a prayer request?</p>
            <p>Contact Us.</p>
            <input className='contact__email' type='text' placeholder='Email'/>
            <input className='contact__message' type='text' placeholder='Message'/>
        </div>
    </div>
  );
}

export default Footer;

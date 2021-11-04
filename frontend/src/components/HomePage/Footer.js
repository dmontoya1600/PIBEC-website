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
        <form className='footer__contact__us'>
            <p className='footer__message__1' >Do you have a question or a prayer request?</p>
            <p className='footer__message__2' >Contact Us.</p>
            <input className='contact__email' required type='email' placeholder='Email'/>
            <textarea className='contact__message' required placeholder='Message'/>
            <input type='submit' className='contact__submit'/>
        </form>
    </div>
  );
}

export default Footer;

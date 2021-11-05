import React, {useState, useRef} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './HomePage.css'
import {useOnScreen} from '../../Help_functions'


function Footer({ isLoaded }){
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const [openCode, setOpenCode] = useState(false)
  const [embeddedCode, setEmbeddedCode] = useState(null)
  const ref = useRef()
  const isVisible = useOnScreen(ref)

  return (
    <div id='footer' className={"homepage__footer scroll-transition-fade " +(isVisible ? 'nothing' : 'below-viewport')}  ref={ref}>
        <form className='footer__contact__us'>
            <p className='footer__message__1' >Do you have a question or a prayer request?</p>
            <p className='footer__message__2' >Contact Us.</p>
            <input className='contact__email' required type='email' placeholder='Email'/>
            <textarea className='contact__message' required placeholder='Message'/>
            <input type='submit' className='contact__submit'/>
        </form>
        <div className='footer__tag'>
            <p className='footer__tag__text'>Follow Us</p>
            <a href='https://www.facebook.com/pibelcalvario' className="fab fa-facebook footer__tag__fb"/>
        </div>
    </div>
  );
}

export default Footer;

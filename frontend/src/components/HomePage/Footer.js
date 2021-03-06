import React, {useState, useRef} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './HomePage.css'
import {useOnScreen} from '../../Help_functions'
import { submitForm } from '../../store/session';
import { csrfFetch } from '../../store/csrf'


function Footer({ isLoaded, setResponse}){
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const [openCode, setOpenCode] = useState(false)
  const [embeddedCode, setEmbeddedCode] = useState(null)
  const ref = useRef()
  const isVisible = useOnScreen(ref)
  const [emailValue, setEmail] = useState('')
  const [messageValue, setMessage] = useState('')

  async function submitContactForm(e){
      e.preventDefault()
    const submitValue = {
        email: emailValue,
        message: messageValue
    }
    const response = await csrfFetch(`api/users/email`, {
        method: 'POST',
        body: JSON.stringify(submitValue)
    })
    const data = await response.json()
    await setResponse(data.message)
    setEmail('')
    setMessage('')
}

  return (
    <div id='footer' className='homepage__footer'>
        <form onSubmit={(e) => submitContactForm(e)} className={"footer__contact__us scroll-transition-fade " +(useOnScreen(ref) ? 'nothing' : 'below-viewport')}  ref={ref}>
            <p className='footer__message__1' >¿Tiene una pregunta o una petición de oración?</p>
            <p className='footer__message__2' >Contactanos.</p>
            <input value={emailValue} onChange={(e) => setEmail(e.target.value)} className='contact__email' required type='email' placeholder='Email'/>
            <textarea value={messageValue} onChange={(e) => setMessage(e.target.value)} className='contact__message' required placeholder='Message'/>
            <input type='submit' className='contact__submit'/>
        </form>
        <div className={"footer__tag scroll-transition-fade " +(useOnScreen(ref) ? 'nothing' : 'below-viewport')} >
            <p className='footer__tag__text'>Follow Us</p>
            <a href='https://www.facebook.com/pibelcalvario' className="fab fa-facebook footer__tag__fb"/>
        </div>
    </div>
  );
}

export default Footer;

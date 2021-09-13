import React, {useState} from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import More from './More'

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);
  const [activeMore, setActiveMore] = useState(false)

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <ProfileButton user={sessionUser} />
    );
  } else {
    sessionLinks = (
      <>
        <NavLink to="/login">Log In</NavLink>
        <NavLink to="/signup">Sign Up</NavLink>
      </>
    );
  }

  return (
    <ul className='navbar__component'>
      <li>
        <NavLink exact to="/">Home</NavLink>
        {isLoaded && sessionLinks}
        <i className='fas fa-bars' onClick={() => setActiveMore(!activeMore)}/>
      </li>
      {activeMore && <More setActiveMore={setActiveMore}/>}
    </ul>
  );
}

export default Navigation;

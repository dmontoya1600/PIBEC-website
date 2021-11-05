import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';


export function useOnScreen(ref) {

    const [isIntersecting, setIntersecting] = useState(false)

    const observer = new IntersectionObserver(
      ([entry]) => setIntersecting(entry.isIntersecting)
    )

    useEffect(() => {
      observer.observe(ref.current)
      // Remove the observer as soon as the component is unmounted
      return () => { observer.disconnect() }
    }, [])

    return isIntersecting
  }

 export function removehash(history) {

    setTimeout(() => {
      history.replace('', document.title, window.location.origin + window.location.pathname + window.location.search);
    }, 5)

  }

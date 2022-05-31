import React from 'react'
import './Header.css';

import {Link, useLocation} from 'react-router-dom';
const Header = () => {

  const location = useLocation();

     const titulo = location.pathname.split('/')[1]

  console.log(location)
  return (
    <header>

        <div className='titulo'>{ titulo === '' ? <p>Home</p> : <p>{titulo.charAt(0).toUpperCase()+titulo.slice(1)}</p> }</div>
    </header>
  )
}

export default Header
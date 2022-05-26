import React from 'react'

import { Link} from 'react-router-dom';

import './Navbar.css';

const Navbar = () => {
  return (
    <nav>
    <p>Serviços</p>
    
    <Link to='/'>Inicio</Link>
    <Link to='/estados'>Estados</Link>
    <Link to='/municipios'>Municipios</Link>
    <Link to='/enderecos'>Endereços</Link>
    <Link to='/pessoas'>Pessoas</Link>

    
</nav>
  )
}

export default Navbar
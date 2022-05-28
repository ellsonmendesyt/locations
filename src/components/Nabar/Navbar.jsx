import React from 'react'

import { Link} from 'react-router-dom';

import './Navbar.css';

const Navbar = () => {
  return (
    <nav>    
    <Link to='/'>Inicio</Link>
    <Link to='/estados'>UF</Link>
    <Link to='/municipios'>Mu</Link>
    <Link to='/bairros'>Bai</Link>
    <Link to='/enderecos'>End</Link>
    <Link to='/pessoas'>Pes</Link>
</nav>
  )
}

export default Navbar
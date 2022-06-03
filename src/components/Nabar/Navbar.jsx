import React from 'react'

import { NavLink,Link} from 'react-router-dom';

import './Navbar.css';

const Navbar = () => {
  return (
    <nav>    
    <NavLink to='/home'>Inicio</NavLink>
    <NavLink to='/estados'>UF</NavLink>
    <NavLink  to='/municipios'>Mun</NavLink>
    <NavLink to='/bairros'>Bai</NavLink>
    <NavLink to='/pessoas'>Pes</NavLink>
</nav>
  )
}

export default Navbar
import React, { useContext } from 'react'


import { ContextoUF } from '../../context/contextUF';
import './Estado.css';
import { Lista } from '../../components/Lista';




const Estado = () => {
const estados = useContext(ContextoUF);


  return (
    <article>
        <Lista items={estados} />
    </article>
  )
}

export default Estado
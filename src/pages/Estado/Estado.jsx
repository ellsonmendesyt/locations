import React, { useContext } from 'react'


import { ContextoUF } from '../../context/contextUF';
import './Estado.css';
import  CardUF  from '../../components/Cards/cardUF';




const Estado = () => {


const gerenciadorEstados = useContext(ContextoUF);
const{ufs:estados}=gerenciadorEstados;

  return (
    <article>
        <ul className='lista'>
      {
        estados.length>0 && estados.map(item=>(
          item && <CardUF key={item.codigoUF} estado={item}/>
        ))
      }
    </ul>
    </article>
  )
}

export default Estado
import React from 'react'
import { CardUF } from '../../Cards';

import './ListaUF.css';

const ListaUF = ({estados}) => {
  return (
    <ul className='uf_list'>
         {
       estados.length> 0 && estados.map(estado=>(
         <CardUF key={estado.codigoUF} estado={estado} />
       ))
     }
    </ul>
  )
}

export default ListaUF;

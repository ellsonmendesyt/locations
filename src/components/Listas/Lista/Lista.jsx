import React from 'react'
import { CardUF } from '../../Cards';

import './Lista.css';

const Lista = ({items}) => {
  return (
    <ul className='uf_list'>
         {
       items.length> 0 && items.map(estado=>(
         <CardUF key={estado.codigoUF} estado={estado} />
       ))
     }
    </ul>
  )
}

export default Lista;

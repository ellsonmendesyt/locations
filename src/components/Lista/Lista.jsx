import React from 'react'
import { CardUF } from '../Cards';

import './Lista.css';

/**

*/

export const Lista = ({items,id="id"}) => {
  return (
    
    <ul className='uf_list'>
         {
       items.length> 0 && items.map(estado=>(
         <CardUF key={estado[id]} estado={estado} />
       ))
     }
    </ul>
  )
}



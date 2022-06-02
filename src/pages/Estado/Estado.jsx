import React, { useContext } from 'react'


import { ContextoUF } from '../../context/contextUF';
import './Estado.css';
import { Lista } from '../../components/Lista';
import { Cart } from '../../components/Cart/Cart';
import { ActionBoxUF, UF } from '../../components/Lista/Lista';




const Estado = () => {
const estados = useContext(ContextoUF);


  return (
    <article>
        <ul className='lista'>
      {
        estados.length>0 && estados.map(item=>(
          item && <Cart specific={<UF item={item} />}  actionbox={<ActionBoxUF item={item}/>} key={item.nome + new Date().valueOf()*new Date().valueOf()} item={item} />
        ))
      }
    </ul>
    </article>
  )
}

export default Estado
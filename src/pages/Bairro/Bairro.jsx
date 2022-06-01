import React, { useContext,useEffect, useState } from 'react'

// import { ContextoUF } from '../../context/contextUF';
import { ContextoUF } from '../../context/contextUF';
import { Dropdown } from '../../components/Dropdown';
import './Bairro.css';
import { ActionBoxBA, BA } from '../../components/Lista/Lista';
import { ContextoBairro } from '../../context/contextBairros';
import { Cart } from '../../components/Cart/Cart';




const Bairro = () => {



const bairros = useContext(ContextoBairro);









  return (
    <article>
        <div className='lista'>
    {
      bairros.length>0 && bairros.map(item=>(
          item && <Cart specific={<BA item={item} />}  actionbox={<ActionBoxBA item={item}/>} key={item.nome} item={item} />
        ))
      }
    </div>

    </article>
  )
}

export default Bairro
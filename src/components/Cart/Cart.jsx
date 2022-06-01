import React from 'react'

import './Cart.css';




export const Cart = ({item,actionbox,specific}) => {

const {nome,status}=item;

  return (
    <div className='card'>
        <div className="card-details">
            <h4>{nome }</h4>
           {specific}
            <p>{status===1 ?"ativo": "inativo"}</p>  
        </div>
        {actionbox}
    </div>
  )
}


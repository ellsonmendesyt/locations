import React from 'react'

import './Cart.css';




export const Cart = ({item,actionbox,specific}) => {

    const {nome,status}=item;
  return (
    <div className='card'>
        <div className="card-details">
            <h4 className='card-title'>{nome }</h4>
            <div className="card-specific">
             <div> {specific} </div>  
             <div>{status===1 ?"ativo": "inativo"} </div>
            </div>
           
        </div>
        {actionbox}
    </div>
  )
}


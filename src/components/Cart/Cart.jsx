import axios from 'axios';
import React,{useState} from 'react'
import Switch from '../Switch/Switch';

import './Cart.css';




export const Cart = ({item,actionbox,specific}) => {

    const {nome,status}=item;






     const [ativo, setAtivo] = React.useState(false);

    


     
   

  return (
    <div className='card'>
        <div className="card-details">
            <h4 className={`card-title `}>{nome }</h4>
            <div className="card-specific">
             <div> {specific} </div>  
             {/* {console.log("Do Cartao")} */}
             {/* {console.log(item.status)} */}
              <div className={`status ${item.status===1? 'ligado': ''}`}>
                {item.status===1? 'Ligado': 'Desligado'}
              </div>
            </div>
           
        </div>
        {actionbox}
    </div>
  )
}


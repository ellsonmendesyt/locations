import React from 'react'
import Switch from '../Switch/Switch';

import './Cart.css';




export const Cart = ({item,actionbox,specific}) => {

    const {nome,status}=item;
    const [checked, setChecked] = React.useState(true);



  return (
    <div className='card'>
        <div className="card-details">
            <h4 className={`card-title ${status==='1'? 'ativo': ''}`}>{nome }</h4>
            <div className="card-specific">
             <div> {specific} </div>  
             <Switch
        isOn={status===1? true: false}
        handleToggle={() => setChecked(!checked)}
        colorTwo="#EF476F"
        colorOne="#06D6A0"
      />
            </div>
           
        </div>
        {actionbox}
    </div>
  )
}


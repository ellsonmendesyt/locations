import React,{useState} from 'react'
import './Switch.css';


export const Switch = ({nome,ativo, changeHandler}) => {


  return (
    <label  className="switch" >
      <input name={nome}  checked={ativo===1? true:false} onChange={()=>changeHandler(!ativo)} type="checkbox" />
    
      <span className="slider round"></span>
    </label>
  )
}


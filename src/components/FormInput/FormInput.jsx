import React from 'react'
import './FormInput.css';

export const FormInput = ({type='text',label,name,handler,value}) => {
  return (
    <input value={value} placeholder={label} name={name} type={type} onChange={e=>handler(e)} />
  )
}


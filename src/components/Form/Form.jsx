import React from 'react'
import './Form.css';

export const Form = ({children,handleSubmit}) => {


  return (
    <form onSubmit={handleSubmit} className='custom-form'>
     {children}
    </form>
  )
}


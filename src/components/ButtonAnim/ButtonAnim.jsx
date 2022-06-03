import React from 'react'
import './ButtonAnim.css';



const ButtonAnim = ({label1,label2,clickHandler,bg,color,icon, size}) => {
  return (
    <button style={{backgroundColor: `${bg}`, color:`${color}`}} className='animated-btn' onClick={(e)=>clickHandler(e)}>
        <div className="btn-content" >
            <div className="text1">{label2}</div>
            <div className="text2" style={{fontSize:`${size}px`}}>{icon}</div>
        </div>
    </button>
  )
}

export default ButtonAnim
import React,{useState,useEffect,useRef} from 'react'
import './Actionbox.css';

import { useClicarFora } from '../../hooks/useClicarFora';



export const Actionbox = ({options}) => {

  const [show, setShow] = useState(false);

 let domNodeReference=useClicarFora(()=>{
   setShow(false);
 });


 const handleClick= ()=>{

    setShow(!show);
 }







  return (
    <div className='action-box'>
    <div className="button-box">
      <button ref={domNodeReference} className='action-btn'   onClick={handleClick}>acões</button>
    </div>

   <ul  className={`action-list ${show ? "mostrar" : ""}`}>
      {
        options.length >0 && options.map(option=>(
         <li key={option+new Date()}>{option}</li>
        ))
      }
      </ul>
    </div>
  )
}


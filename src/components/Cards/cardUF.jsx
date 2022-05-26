import React, { useContext } from 'react'
import { ContextoUF } from '../../context/contextUF';

import './CardUF.css';

export const CardUF = ({estado}) => {

  const {removerEstado} = useContext(ContextoUF);
  return (
    <li className='card'>
     <div className="card_header">
         <h4>{estado.nome}</h4>
       
         <button className='optionsBtn'  onClick={()=>removerEstado(estado.codigoUF)}>...</button>
     </div>
     <div className="card_body">
         <ul>
         <li><span>{estado.codigoUF}</span> <span>codigo</span></li>
         <li><span>{estado.sigla}</span> <span>sigla</span></li>
         <li><span>{estado.status}</span> <span>status</span></li>
         </ul>
     </div>
    </li>
  )
}


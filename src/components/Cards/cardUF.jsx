import React, { useContext } from 'react'
import { ContextoUF } from '../../context/contextUF';
import { Actionbox } from '../ActionBox';


import './CardUF.css';

export const CardUF = ({estado}) => {

  const {removerEstado} = useContext(ContextoUF);

  
  return (
    <li className='card'>
     <div className="card_header">
         <h4 className='titulo'>{estado.nome}</h4>
       
       

         <Actionbox options={['apagar','editar','detalhes']} />

         
     </div>
     <div className="card_body">
         <ul>
         <li>
           <span>{estado.codigoUF}</span> <span>codigo</span>
           </li>
         <li><span>{estado.sigla}</span> <span>sigla</span></li>
         <li><span>{estado.status}</span> <span>status</span></li>
         </ul>
     </div>
    </li>
  )
}





















  {/* <div className="action-box">
         <button className='optionsBtn'  onClick={()=>removerEstado(estado.codigoUF)}>
         <svg fill="currentColor" viewBox="0 0 24 24" width="1em" height="1em" ><circle cx="12" cy="12" r="2.5"></circle><circle cx="19.5" cy="12" r="2.5"></circle><circle cx="4.5" cy="12" r="2.5"></circle></svg>
         </button>
           <div className="pop-up">
              <p>Deseja remover o estado?</p>
           </div>

         </div> */}
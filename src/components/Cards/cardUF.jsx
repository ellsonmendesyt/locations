import React, { useContext,useEffect,useState,useRef } from 'react'
import { ContextoUF } from '../../context/contextUF';



import './CardUF.css';

import { useClicarFora } from '../../hooks/useClicarFora';

export const CardUF = ({estado}) => {

const {removerEstado} = useContext(ContextoUF);

const [show, setShow] = useState(false);
const popUpRef=useClicarFora(()=>{setShow(false)})

 

  return (
    <li className='card'>
     <div className="card_header">
         <h4 className='titulo'>{estado.nome}</h4>
       
       {/* ACTIONS */}

        <div ref={popUpRef}  className="actions-container">
          <button  onClick={()=>setShow(!show)} className='toggler' >Options</button>
        <div  className={`action-pills ${show ? 'show': ''}`}>
          <button name='deletar' className='action' onClick={()=> console.log(estado.nome)}>deletar</button>
          <button name='atualizar' className='action' onClick={()=> console.log(estado.nome)}>atalizar</button>
          <button name='detalhar' className='action' onClick={()=> console.log(estado.nome)}>detalhar</button>
          <button name='desativar' className='action' onClick={()=> console.log(estado.nome)}>desativar</button>
        </div>
        </div>

     </div>
     {/* INFO */}
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
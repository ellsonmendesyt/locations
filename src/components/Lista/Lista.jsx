import axios from 'axios';
import React, { useContext } from 'react'
import { ContextoUF } from '../../context/contextUF';


import {Cart} from '../Cart/Cart';
import './Lista.css';



// const gerenciadorEstados = useContext(ContextoUF);
// const {ufs:estados,atualizarEstado,setUfs}=gerenciadorEstados;

//exclusivo do estado
export const UF= ({item})=>{
  const {sigla,codigoUF}=item;
  return(
      <div className='specific-details'>
         <p>{sigla}  &nbsp;&nbsp;&nbsp;&nbsp; {codigoUF}</p>
      </div>
  )
}

//exclusivo do municipio
export const MU= ({item})=>{
  const {codigoMunicipio,codigoUF}=item;
  return(
      <div className='specific-details'>
         <span>UF &nbsp;&nbsp; {codigoUF}</span>
         <span>MU &nbsp;&nbsp;{codigoMunicipio}</span>
      </div>
  )
}


export const BA= ({item})=>{
  const {codigoBairro,codigoMunicipio}=item;

  return(
      <div className='specific-details'>
         <span title='código do bairro'>bai&nbsp;&nbsp;{codigoBairro}</span>
         <span title='código municipio'>mun &nbsp;&nbsp;{codigoMunicipio}</span>
      </div>
  )
}

export const ActionBoxUF= ({item})=>{
  ///lista de acoes vem do contexto
return(
   <div className='action-box'>
          <button onClick={{}}>Editar</button>
          <button onClick={()=>console.log(item.nome)}>Excluir</button>
          <button onClick={()=>console.log(item.nome)}>Detalhes</button>
   </div>
)
}



export const ActionBoxMU= ({item})=>{
  ///lista de acoes vem do contexto
return(
   <div className='action-box'>
          <button onClick={()=>console.log(item.nome)}>Editar</button>
          <button onClick={()=>console.log(item.nome)}>Excluir</button>
          <button onClick={()=>console.log(item.nome)}>Detalhes</button>
   </div>
)
}



export const ActionBoxBA= ({item})=>{
  ///lista de acoes vem do contexto
return(
   <div className='action-box'>
          <button onClick={()=>console.log(item.nome)}>Editar</button>
          <button onClick={()=>console.log(item.nome)}>Excluir</button>
          <button onClick={()=>console.log(item.nome)}>Detalhes</button>
   </div>
)
}










export const Lista = ({items}) => {

 
  return (
    <ul className='lista'>
      {
        items.length>0 && items.map(item=>(
          item && <Cart specific={<UF item={item} />}  actionbox={<ActionBoxUF item={item}/>} key={item.nome} item={item} />
        ))
      }
    </ul>
  )
}



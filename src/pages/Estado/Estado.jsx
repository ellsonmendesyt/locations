import React, { useContext,useEffect } from 'react'

import { ContextoUF } from '../../context/contextUF';


import './Estado.css';
// import CadastroUF from '../../components/Formularios/CadastroUF';
import { CadastroUF } from '../../components/Formularios/CadastroUF';
import { Lista } from '../../components/Lista';



const Estado = () => {

const {ufs} = useContext(ContextoUF);
//  useEffect(()=>{
//   // obterUF();
//  },[])

  return (
    <article>
        <h2>Cadastraro de Estados</h2>
        <CadastroUF />
        <Lista id="codigoUF" items={ufs} />


    </article>
  )
}

export default Estado
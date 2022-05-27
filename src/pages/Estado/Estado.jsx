import React, { useContext,useEffect } from 'react'
import { CardUF } from '../../components/Cards';
import { ContextoUF } from '../../context/contextUF';

// import Lista from '../../components/Listas/Lista';
import Lista from '../../components/Listas/Lista';
import './Home.css';
import CadastroUF from '../../components/Formularios/CadastroUF';




const Estado = () => {

const {ufs,removerEstado} = useContext(ContextoUF);
//  useEffect(()=>{
//   // obterUF();
//  },[])

  return (
    <article>
        <h2>Cadastraro de Estados</h2>
        <CadastroUF />
        <Lista items={ufs} />


    </article>
  )
}

export default Estado
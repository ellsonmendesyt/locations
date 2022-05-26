import React, { useContext,useEffect } from 'react'
import { CardUF } from '../../components/Cards';
import { ContextoUF } from '../../context/contextUF';

import ListaUF from '../../components/Listas/ListaUF';
import './Home.css';
import CadastroUF from '../../components/Formularios/CadastroUF';




const Home = () => {

const {ufs,removerEstado} = useContext(ContextoUF);
 useEffect(()=>{
  // obterUF();
 },[])

  return (
    <article>
        <h2>Cadastraro de Pessoas e Lugares</h2>
        <CadastroUF />
        <ListaUF estados={ufs} />


    </article>
  )
}

export default Home
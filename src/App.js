
import Home from "./pages/Estado";

import {Routes, Route} from 'react-router-dom';
import NotFound from "./components/NotFound";
import Layout from "./components/Layout";


import React, { useEffect } from "react";
import axios from "axios";
import Estado from "./pages/Estado";
import Municipio from "./pages/Municipio";

///contextos
import {ContextoUF} from './context/contextUF';
import {ContextoMunicipio} from './context/contextoMunicipio';
import { ContextoBairro } from "./context/contextoBairro";


import Bairro from "./pages/Bairro";
import { Pessoa } from "./pages/Pessoa";



//DAODS MOCADOS

import {estados} from './api/estados';
import municipios from './api/municipios';
import bairros from './api/bairros';





function App() {


const [ufs, setUfs] = React.useState([]);

// metodos dos Estados
const obterEstados= async () => {
  const response= await axios.get(`http://localhost:3333/uf`);
  setUfs(response.data);
}
const removerEstado= async(codigoUf)=>{
  const response= await axios.delete(`http://localhost:3333/uf/${codigoUf}`);
  setUfs(response.data);
}
const cadastrarEstado = async (novoEstado) => {
  const response = await axios.post(`http://localhost:3333/uf`, novoEstado, {ContentType:"application/json"});
  setUfs(response.data);
};

//Metodos dos Municipios

///estados mocados









useEffect( ()=>{

  const iniciarBusca= async ()=>{
    await obterEstados();
  }
   iniciarBusca();
},[])





  
  return (
    <>
    <ContextoUF.Provider value={ufs}>
    <ContextoMunicipio.Provider value={municipios}>
     <ContextoBairro.Provider value={bairros}>
     <Routes>
       <Route path='/' element={<Layout/>}>
      <Route index path='estados' element={<Estado  />} /> 
      <Route index path='municipios' element={<Municipio  />} /> 
      <Route index path='bairros' element={<Bairro  />} /> 
      <Route index path='pessoas' element={<Pessoa  />} /> 
     
      <Route path="*" element={<NotFound />} /> 
       </Route>
      </Routes> 
      </ContextoBairro.Provider>
      </ContextoMunicipio.Provider>
      </ContextoUF.Provider>
    </>
  );
}

export default App;


/*
-------------
pessoa 
-------------
{
    "codigoPessoa": 1,
    "nome": "JOÃO",
    "sobrenome": "DA SILVA",
    "idade": 22,
    "login": "joao_silva",
    "senha": "joao123",
    "status": 1
  }

-----------------
  Endereço
-----------------
  {
    "codigoBairro": 2,
    "codigoMunicipio": 2,
    "nome": "CAMPO GRANDE",
    "status": 1
  }
*/

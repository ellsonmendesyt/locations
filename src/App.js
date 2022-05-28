
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
import {ContextoMunicipio} from './context/contextMunicipio';
import Bairro from "./pages/Bairro";
import { Pessoa } from "./pages/Pessoa";









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



const pacoteUF={
  ufs,
  setUfs,
  obterEstados,
  removerEstado,
  cadastrarEstado
}





const pacoteMu={}

useEffect( ()=>{

  const iniciarBusca= async ()=>{
    await obterEstados();
  }
   iniciarBusca();
},[])

  
  return (
    <>
    <ContextoUF.Provider value={pacoteUF}>
    <ContextoMunicipio.Provider value={pacoteMu}>
     <Routes>
       <Route path='/' element={<Layout/>}>
      <Route index path='estados' element={<Estado  />} /> 
      <Route index path='municipios' element={<Municipio  />} /> 
      <Route index path='bairros' element={<Bairro  />} /> 
      <Route index path='pessoas' element={<Pessoa  />} /> 
     
      <Route path="*" element={<NotFound />} /> 
       </Route>
      </Routes> 
      </ContextoMunicipio.Provider>
      </ContextoUF.Provider>
    </>
  );
}

export default App;

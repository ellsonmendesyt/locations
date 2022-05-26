
import Home from "./pages/Home";

import {Routes, Route} from 'react-router-dom';
import NotFound from "./components/NotFound";
import Layout from "./components/Layout";


import {ContextoUF} from './context/contextUF';
import React, { useEffect } from "react";
import axios from "axios";
function App() {

const [ufs, setUfs] = React.useState([]);

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

const pacote={
  ufs,
  setUfs,
  obterEstados,
  removerEstado,
  cadastrarEstado
}


useEffect( ()=>{

  const iniciarBusca= async ()=>{
    await obterEstados();
  }
   iniciarBusca();
},[])

  
  return (
    <>
    <ContextoUF.Provider value={pacote}>
     <Routes>
       <Route path='/' element={<Layout/>}>
      <Route index element={<Home  />} /> 
     
      <Route path="*" element={<NotFound />} /> 
       </Route>
      </Routes> 
      </ContextoUF.Provider>
    </>
  );
}

export default App;

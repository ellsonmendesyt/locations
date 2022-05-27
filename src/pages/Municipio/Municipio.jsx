import React, { useContext,useEffect, useState } from 'react'
import { CardUF } from '../../components/Cards';
import { ContextoUF } from '../../context/contextUF';
import Lista from '../../components/Listas/Lista';
import './Municipio.css';
import CadastroUF from '../../components/Formularios/CadastroUF';
import { Dropdown } from '../../components/Dropdown';




const Municipio = () => {

const {ufs} = useContext(ContextoUF);

const [estado,setEstado] = useState(null);


 const tratarMudancaUF=(e)=>{
   console.log(e.target.value)
 }


  
  return (
    <article>
        <h2>Cadastraro de Municipios</h2>

        {JSON.stringify(estado)}
        <Dropdown 
        value={estado} 
        prompt="Selecione um Estdo" 
        onChange={(value)=>setEstado(value)} options={ufs} 
        id="codigoUF" label="nome"/>






     



    </article>
  )
}

export default Municipio
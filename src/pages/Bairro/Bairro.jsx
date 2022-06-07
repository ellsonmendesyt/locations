import React, { useContext,useEffect, useState } from 'react'

// import { ContextoUF } from '../../context/contextUF';
import { ContextoUF } from '../../context/contextUF';
import { Dropdown } from '../../components/Dropdown';
import './Bairro.css';
import { ContextoBairro } from '../../context/contextoBairro';

import { Form } from '../../components/Form';
import axios from 'axios';
import { FormInput } from '../../components/FormInput/FormInput';
import CardBai from '../../components/Cards/CardBai';




const Bairro = () => {



const [bairros, setBairros] = useState([]);


const gerenciadorEstados = useContext(ContextoUF);
const{ufs:estados}=gerenciadorEstados;

// DADOS DO DROPDOWN DO ESTADO
const [estado,setEstado] = useState(null);


//DADOS DO DROPDOWN DO MUNICIPIO
const [municipio,setMunicipio] = useState(null);
const [municipios,setMunicipios] = useState([]);

// DADOS DO BAIRRO



const [opcao,setOpcao] = useState('');

const obterMunicipiosPorCodigoUF=async(estado)=>{
  // const municipios= await axios.get(`http://localhost:3333/municipio?codigoUF=${uf}`);
  const munis= await axios.get(`http://localhost:3333/municipio?codigoUF=${estado.codigoUF}`)
  setMunicipio(null);
 setMunicipios(munis.data)
}

const [bairro,setBairro] = useState({nome:'',status:''});

// {if(bairros.length===0) return (<h2>Nenhum bairro cadastrado</h2>)}

const trazerTodosBairros= async()=>{
  const bairroRetorno= await axios.get(`http://localhost:3333/bairro`);
  setBairros(bairroRetorno.data);
}



useEffect(()=>{
 async function iniciarBuscaBairros(){
  await trazerTodosBairros();

 }
 iniciarBuscaBairros();

},[])
useEffect(()=>{
  async function buscarMunicipios(){
     if(estado !=null)
      await obterMunicipiosPorCodigoUF(estado);
    }
    buscarMunicipios();
},[estado])


const escolherOpcao= (e)=>{
  setOpcao(e.target.name);

}

const obterCampoBairro= (e)=>{
  setBairro({...bairro,[e.target.name]:e.target.value});
}

const tratarEnvio =  async(e)=>{
  e.preventDefault();

  if(bairro.nome==='' || bairro.status=='' ||estado===null || municipio===null){
    alert("Preencha todos os campos")
    return;
  }
  const novoBairro={
    ...bairro,
    codigoMunicipio:municipio.codigoMunicipio
  }

  console.log(novoBairro);
  const bairrosRetorno =await axios.post('http://localhost:3333/bairro',novoBairro);
  setBairro({nome:'',status:''});
  setMunicipio(null);
  setEstado(null);

  setBairros(bairrosRetorno.data);
}


  return (
    <article>
      <div className="painel">
        <button  onClick={(e)=>escolherOpcao(e)} name='cadastro'>cadastrar </button>
        <button onClick={(e)=>escolherOpcao(e)} name='busca'>buscar </button>
        <input
          className={`barra__busca ${opcao==='busca' ? 'mostrar__busca':''}`}
     
          type='text'
          name='nome'
          placeholder='buscar por nome'
          onChange={(e)=>console.log(e.target.value)}
          />
      
      </div>


      {
        opcao && opcao==='cadastro' ?
        <Form  handleSubmit={(e)=>tratarEnvio(e)}>
          <Dropdown 
            value={estado} 
            prompt="Estado"
            getOption={(value)=>setEstado(value)} 
            options={estados} 
            id="nome" 
            label="nome"
          /> 

        <Dropdown 
          value={municipio} 
          prompt="Municipio"
          getOption={(value)=>setMunicipio(value)} 
          options={municipios} 
          id="nome" 
          label="nome"
          /> 

        
        <FormInput 
         type='number' 
         label='status'
         name='status'
         value={bairro.status}
         handler={(e)=>obterCampoBairro(e)}
         />
            
         <FormInput 
         type='text' 
         label='nome'
         name='nome'
         value={bairro.nome}
         handler={(e)=>obterCampoBairro(e)}
         />


      <button type='submit'>Envair</button>
      </Form>

      :
       <h2>Busca</h2>

      }
      




      <hr/>
      <div className='lista'>
    {
      bairros.length>0 && bairros.map(item=>(
          <CardBai key={item.nome} bairro={item} />
        ))

        
      }
    </div>

    </article>
  )
}

export default Bairro
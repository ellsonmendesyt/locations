import React, { useContext,useEffect, useState } from 'react'

// import { ContextoUF } from '../../context/contextUF';
import { ContextoUF } from '../../context/contextUF';
import { Dropdown } from '../../components/Dropdown';
import './Bairro.css';




const Bairro = () => {

//tras os Estados | UFs da contexto
const {ufs} = useContext(ContextoUF);


const [estado,setEstado] = useState(null);
const [municipio,setMunicipio] = React.useState({nome:'',codigoUF:'',status:''});
const [bairro,setBairro] = React.useState({nome:'',status:''});

//DADOS TEMPORARIOS
/// ao selecionar uma UF devemos trazer os municipios

const municipios = [
  {
    "codigoMunicipio": 2,
    "codigoUF": 2,
    "nome": "Rio de Janeiro",
    "status": 1
  },
  {
    "codigoMunicipio": 3,
    "codigoUF": 1,
    "nome": "São Paulo",
    "status": 1
  }
]







const tratarMudancaBairro= (e)=>{
  setBairro({...bairro,[e.target.name]:e.target.value});
}


const limparCamposBairro=()=>{
  setMunicipio({nome:'',status:''});
  setEstado(null);
  
}

const tratarEnvio= async(e)=>{
  e.preventDefault();
  if(!municipio.nome || !municipio.codigoUF || !municipio.status){
    alert("Preencha todos os campos");
    return;
  }
  
  console.log(municipio);
  // enquanto nao apronta api por em um array

  limparCamposBairro();
  
}



  //toa vez que o campo dinamico mudar, eu atualizo o campo de codigoUF
useEffect(()=>{
  if(estado!==null){
    setBairro({...bairro,codigoUF:estado.codigoUF});
    
    if(estado !==null && municipio !== null ){
      setBairro({...bairro,codigoMunicipio:municipio.codigoMunicipio,codigoUF:estado.codigoUF});
    }
  }


},[estado,municipio])





  return (
    <article>
        <h2>Cadastraro de Bairros</h2>

        {/* {JSON.stringify(estado)} */}


      <form className='formulario'>
        <div className="formulario_grupo">
        <Dropdown 
          value={estado} 
          prompt="Estado"
          getOption={(value)=>setEstado(value)} options={ufs} 
          id="codigoUF" 
          label="nome"
          />


        <Dropdown 
          value={null} 
          prompt="Municipio"
          getOption={(value)=>setMunicipio(value)} options={municipios} 
          id="codigoMunicipio" 
          label="nome"
          />



        <input className='campo_bairro' onChange={(e)=>tratarMudancaBairro(e)} value={bairro.nome} type="text" name='nome' required placeholder="nome bairro" />
        <input className='campo_bairro' onChange={(e)=>tratarMudancaBairro(e)} value={bairro.status} type="text" name='status' required placeholder="status bairro" />
        <button className='campo_municipio_gravar'  onClick={(e)=>tratarEnvio(e)} type='submit'>salvar</button>    
        </div>
      </form>
          {/* {JSON.stringify(bairro)} */}
          <p>UF: {bairro.codigoUF} MU: {bairro.codigoMunicipio} Nome: {bairro.nome} Status: {bairro.status==1 ? " ativado": " desativado"} </p>

          

    </article>
  )
}

export default Bairro
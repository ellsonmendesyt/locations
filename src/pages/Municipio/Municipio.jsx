import React, { useContext,useEffect, useState } from 'react'

// import { ContextoUF } from '../../context/contextUF';
import { ContextoUF } from '../../context/contextUF';
import { Dropdown } from '../../components/Dropdown';
import './Municipio.css';




const Municipio = () => {

//tras os Estados | UFs da contexto
const {ufs} = useContext(ContextoUF);


const [estado,setEstado] = useState(null);
const [municipio,setMunicipio] = React.useState({nome:'',codigoUF:'',status:''});




const tratarMudancaMU= (e)=>{
  setMunicipio({...municipio,[e.target.name]:e.target.value});
}


const limparCamposUF=()=>{
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

  limparCamposUF();
  
}


/**-------------------------------------------------------------------
 Passamos uma lista de ESTADOS pro dropdown o que o usuario escolher 
 Porque preqisamos saber em qual Estado criar o MUNICIPIO
 
 Parametros do Dropdown:
 
 value:      ele vai mostrar a opção selecionada
prompt:     texto que informa o que o usuario deve escolher
getOption:  recupera o valor selecionado
id:         usado na propriedade key do elemento ao ser mapeado
label:      usado para mostrar o valor no dropdown


  {
    "codigoMunicipio": 1,
    "codigoUF": 1,
    "nome": "JUNDIAÍ",
    "status": 1
  }
  ----------------------------------------------------------------------*/
  
  
  
  //toa vez que o campo dinamico mudar, eu atualizo o campo de codigoUF
useEffect(()=>{
  if(estado!==null){
    setMunicipio({...municipio,codigoUF:estado.codigoUF});
   
    
  }
},[estado])





  return (
    <article>
        <h2>Cadastraro de Municipios</h2>

        


      <form className='formulario'>
        <div className="formulario_grupo">
        <Dropdown 
          value={estado} 
          prompt="Estado"
          getOption={(value)=>setEstado(value)} options={ufs} 
          id="codigoUF" 
          label="nome"
          />



        <input className='campo_mu' onChange={(e)=>tratarMudancaMU(e)} value={municipio.nome.toString()} type="text" name='nome' required placeholder="nome municipio" />
        <input className='campo_mu' onChange={(e)=>tratarMudancaMU(e)} value={municipio.status.toString()} type="text" name='status' required placeholder="status municipio" />
        <button className='campo_municipio_gravar'  onClick={(e)=>tratarEnvio(e)} type='submit'>salvar</button>    
        </div>
      </form>
          {JSON.stringify(municipio)}

          

    </article>
  )
}

export default Municipio
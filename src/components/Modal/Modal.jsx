import React,{useState,useEffect,useContext} from 'react'
import './Modal.css';
import axios from 'axios';
import { FormInput } from '../FormInput/FormInput';
import { Form } from '../Form';
import { Dropdown } from '../Dropdown';
import { ContextoUF } from '../../context/contextUF';

const Modal = ({children,open,onClose,item}) => {

  
const [pessoa,setPessoa] = useState(item);
const [listaEnderecos,setListaEnderecos] = useState([]);

 const buscarPessoaCompleta=async(codigoPessoa)=>{
 const p =await axios.get(`http://localhost:3333/pessoa?codigoPessoa=${pessoa.codigoPessoa}`) 
 setPessoa(p.data);
 setListaEnderecos(p.data.enderecos);
  
}





const gerenciadorEstados = useContext(ContextoUF);
const{ufs:estados}=gerenciadorEstados;


// DADOS DO DROPDOWN DO ESTADO
const [estado,setEstado] = useState(null);


//DADOS DO DROPDOWN DO MUNICIPIO
const [municipio,setMunicipio] = useState(null);
const [municipios,setMunicipios] = useState([]);

// DADOS DO BAIRRO

const [bairro,setBairro] = useState(null);
const [bairros,setBairros] = useState([]);



const tratarDadosEndereco= async(e)=>{
    e.preventDefault();
    
    if(bairro==null){
      alert('Selecione um bairro');
      return;
    }
    // setEndereco({...endereco,codigoBairro:bairro.codigoBairro,[e.target.name]:e.target.value});
}

const obterBairrosPorCodigoMunicipio=async(estado)=>{
    const bairrosRetorno= await axios.get(`http://localhost:3333/bairro?codigoMunicipio=${municipio.codigoMunicipio}`)
    setBairro(null);
   setBairros(bairrosRetorno.data)
  }

  const obterMunicipiosPorCodigoUF=async(estado)=>{
    const munis= await axios.get(`http://localhost:3333/municipio?codigoUF=${estado.codigoUF}`)
    setMunicipio(null);
   setMunicipios(munis.data)
  }

useEffect(()=>{
async function buscarBairros(){
    if(municipio !=null)
    await obterBairrosPorCodigoMunicipio(municipio);
    }
    buscarBairros();
},[municipio])

useEffect(() => {
    if(open)
    document.body.style.overflowY = 'hidden';
    return () =>{
        document.body.style.overflowY = 'auto';
    }
}, [open])

useEffect(()=>{
    async function buscarMunicipios(){
       if(estado !=null)
        await obterMunicipiosPorCodigoUF(estado);
      }
      buscarMunicipios();
  },[estado])

//quando abrir o modal deve buscar a pessoa completa
useEffect(()=>{
    
    async function iniciarBuscaPessoa(){
        if(open)
     buscarPessoaCompleta(pessoa.codigoPessoa);
    }
    iniciarBuscaPessoa();
},[open])





    if(!open) return null;
    
  return (
      <>
     <div onClick={()=>onClose()} className={`overlay ${open===true? 'noscroll': ''}`}></div>
    <div className='modal'>
      <div className="modal__top">
        <button onClick={()=>onClose()}>x</button>
      </div>    
       <div className="modal__body">
        {/* FORMULARIO DA PESSOA */}
        <Form >
          <FormInput 
          type='text'
          label='Nome'
          value={pessoa.nome}
          name="nome"
          handler={{}}
          />

          <FormInput 
          type='text'
          label='Sobrenome'
          value={pessoa.sobrenome}
          name="sobrenome"
          handler={{}}
          />

          <FormInput 
          type='number'
          label='idade'
          value={pessoa.idade}
          name="idade"
          handler={{}}
          />
          <FormInput 
          type='text'
          label='login'
          value={pessoa.login}
          name="login"
          handler={{}}
          />
          <FormInput 
          type='text'
          label='senha'
          value={pessoa.senha}
          name="senha"
          handler={{}}
          />
          <FormInput 
          type='text'
          label='status'
          value={pessoa.status}
          name="status"
          handler={{}}
          />
          <button type='submit'>Salvar</button>
     </Form>
     {/* ========================== */}
     {
            listaEnderecos.length>0 && listaEnderecos.map((endereco)=>(
                <div className='endereco' key={endereco.nomeRua+new Date().getTime()}>
                   <Form >
                        {/* {JSON.stringify(endereco)} */}
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

                        <Dropdown 
                        value={bairro} 
                        prompt="Bairro"
                        getOption={(value)=>setBairro(value)} 
                        options={bairros} 
                        id="nome" 
                        label="nome"
                        /> 

                        <FormInput 
                        type='text'
                        label='Rua'
                        value={endereco.nomeRua}
                        name="nomeRua"
                        handler={(e)=>tratarDadosEndereco(e)}
                        />
                        <FormInput 
                        type='text'
                        label='Numero'
                        value={endereco.numero}
                        name="numero"
                        handler={(e)=>tratarDadosEndereco(e)}
                        />
                        <FormInput 
                        type='text'
                        label='Complemento'
                        value={endereco.complemento}
                        name="complemento"
                        handler={(e)=>tratarDadosEndereco(e)}
                        />
                        <FormInput 
                        type='text'
                        label='CEP'
                        value={endereco.cep}
                        name="cep"
                        handler={(e)=>tratarDadosEndereco(e)}
                        />
                        <button>Adicionar</button>
                    </Form> 
                </div>
            ))
         }
         {/* ============== fim modal de Ediçao============== */}

       </div>

       <div className="modal__footer">
        {/* ============ LISTA DE ENDEREÇOS CADASTRADOS==========*/}

         
       </div>
    </div>
      </>
  )
}

export default Modal
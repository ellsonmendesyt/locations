import React,{useState,useEffect,useContext} from 'react'
import './Modal.css';
import axios from 'axios';
import { FormInput } from '../FormInput/FormInput';
import { Form } from '../Form';
import { Dropdown } from '../Dropdown';
import { ContextoUF } from '../../context/contextUF';

const Modal = ({children,open,onClose,item}) => {

const enderecoVazio={
    "codigoBairro": "",
    "nomeRua": "",
    "numero": "",
    "complemento": "",
    "cep": ""
}
  
const [pessoa,setPessoa] = useState(item);

const [listaEnderecos,setListaEnderecos] = useState([]);

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




const [novoEndereco,setNovoEndereco] = useState({
    "codigoBairro": "",
    "nomeRua": "",
    "numero": "",
    "complemento": "",
    "cep": ""
})


const [copiaEndereco,setCopiaEndereco] = useState(null)
const [enderecoEmAtualizacao,setEnderecoEmAtualizacao] = useState(null)



const buscarPessoaCompleta=async(codigoPessoa)=>{
    const p =await axios.get(`http://localhost:3333/pessoa?codigoPessoa=${pessoa.codigoPessoa}`) 
   
    setPessoa(p.data);
    setListaEnderecos(p.data.enderecos);
     
   }


const tratarDadosEndereco= async(e)=>{
    e.preventDefault();
    
    if(bairro==null){
      alert('Selecione um bairro');
      return;
    }
    setNovoEndereco({...novoEndereco,codigoBairro:bairro.codigoBairro,[e.target.name]:e.target.value});
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

/*
Pra modificar guarda uma copia do original
remove o endereco da lista

passa os dados desse endereco para o novoendereco
passa os valores correspondents pro dropdown
*/
const modficarEndereco=async(endereco)=>{
    console.log(endereco)

setEnderecoEmAtualizacao(endereco);
setListaEnderecos( listaEnderecos.filter((end=> end.codigoEndereco!=endereco.codigoEndereco)))
setNovoEndereco(endereco);



}
const excluirEndereco=()=>{

}

const cancelarEdicaoEndereco=(e)=>{
    e.preventDefault();
    setListaEnderecos([...listaEnderecos,enderecoEmAtualizacao]);
    setNovoEndereco(enderecoVazio)
    setEnderecoEmAtualizacao(enderecoVazio);
}




///puxa os bairros quando o municpio mudar
useEffect(()=>{
async function buscarBairros(){
    if(municipio !=null)
    await obterBairrosPorCodigoMunicipio(municipio);
    }
    buscarBairros();
},[municipio])


// TRAVA A TELA QUANDO OVERLAY TIVER ATIVO 
/*
useEffect(() => {
    if(open)
    document.body.style.overflowY = 'hidden';
    return () =>{
        document.body.style.overflowY = 'auto';
    }
}, [open])
*/

// seleciona um Municipio quando o estado mudar
useEffect(()=>{
    async function buscarMunicipios(){
       if(estado !=null)
        await obterMunicipiosPorCodigoUF(estado);
      }
      buscarMunicipios();
      console.log('============')
      if (estado)console.log(estado)
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

    <Form >
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
        value={novoEndereco.nomeRua}
        name="nomeRua"
        handler={(e)=>tratarDadosEndereco(e)}
        />
        <FormInput 
        type='text'
        label='Numero'
        value={novoEndereco.numero}
        name="numero"
        handler={(e)=>tratarDadosEndereco(e)}
        />
        <FormInput 
        type='text'
        label='Complemento'
        value={novoEndereco.complemento}
        name="complemento"
        handler={(e)=>tratarDadosEndereco(e)}
        />
        <FormInput 
        type='text'
        label='CEP'
        value={novoEndereco.cep}
        name="cep"
        handler={(e)=>tratarDadosEndereco(e)}
        />
        <button>Adicionar</button>
        <button onClick={(e)=>cancelarEdicaoEndereco(e) }>cancelar</button>
    </Form> 
    {/* ============== fim modal de Ediçao============== */}

       </div>

      <hr />

       <div className="modal__footer">
    {/* ============ LISTA DE ENDEREÇOS CADASTRADOS==========*/}
        {
        listaEnderecos.length>0 && listaEnderecos.map((endereco)=>(

            <div className='endereco' key={endereco.nomeRua+new Date().getTime()}>
                <div className="endereco__conteudo">
                    <div>Rua <span>{endereco.nomeRua}</span></div>
                    <div>Numero <span>{endereco.numero}</span></div>
                    <div>Complemento <span>{endereco.complemento}</span></div>
                    <div>Bairro <span>{endereco.codigoBairro}</span></div>
                    <div>Cep <span>{endereco.cep}</span></div>
                </div>
                <div className="endereco__acoes">
                    <button className='endereco__acao--btn' onClick={()=>modficarEndereco(endereco)}>modificar</button>
                    <button className='endereco__acao--btn' onClick={()=>excluirEndereco(endereco)}>excluir</button>
                </div>
            </div>

        ))
        }         
       </div>
    </div>
      </>
  )
}

export default Modal
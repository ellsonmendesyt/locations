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

const [jaRetornou,setJaRetornou] = useState(false);


const [novoEndereco,setNovoEndereco] = useState({
    "codigoBairro": "",
    "nomeRua": "",
    "numero": "",
    "complemento": "",
    "cep": ""
})


const [copiaEndereco,setCopiaEndereco] = useState(null)
const [enderecoEmAtualizacao,setEnderecoEmAtualizacao] = useState(null)



const [editando,setEditando] = useState(false);


const buscarPessoaCompleta=async(codigoPessoa)=>{
    const p =await axios.get(`http://localhost:3333/pessoa?codigoPessoa=${pessoa.codigoPessoa}`) 
   
    setPessoa(p.data);
    setListaEnderecos(p.data.enderecos);
     
   }


const tratarDadosPessoais=(e)=>{
    e.preventDefault();
    setPessoa({...pessoa,[e.target.name]:e.target.value});
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
setEditando(true)
setEnderecoEmAtualizacao(endereco);
setCopiaEndereco(endereco);
setListaEnderecos( listaEnderecos.filter((end=> end.codigoEndereco!=endereco.codigoEndereco)))
// setNovoEndereco(endereco);
setEditando(false)
}

const cancelarEdicaoEndereco=(e)=>{
    e.preventDefault();
    if(jaRetornou){alert("Não é possivel desfazer a edição duas vezes ou algo inexistente!");return;}

    if(copiaEndereco==null){alert("Não é possivel desfazer a edição duas vezes ou algo inexistente!");return;}

//tira o endereco da atualização
setEnderecoEmAtualizacao(null);
setListaEnderecos([...listaEnderecos,copiaEndereco]);
setJaRetornou(true)

        // setListaEnderecos([...listaEnderecos,copiaEndereco]);
        // setCopiaEndereco(null)
        // setNovoEndereco(enderecoVazio)
        // setEnderecoEmAtualizacao(enderecoVazio);
        // setBairro(null)
        // setEstado(null)
        // setMunicipio(null)
        // setJaRetornou(false)
        // setEditando(false)
}


const excluirEndereco=(endereco)=>{
    if(listaEnderecos.length===0){alert("Lista de endereços vazia");return;
    }
          const novaLista = listaEnderecos.filter(e=>e.codigoEndereco != endereco.codigoEndereco);
           setListaEnderecos(novaLista);
           setPessoa({...pessoa,enderecos:novaLista});
   }
/*
  Verifica se todos os campos foram preenchidos
  adiciona o novo endereço na lista de endereços
  exclui o endereço temporario (a copia)
*/

const adicionarNovoEndereco=(e)=>{
    e.preventDefault();
    setEditando(true)
   
   if(novoEndereco.nomeRua===''||novoEndereco.numero===''||novoEndereco.cep==='' || novoEndereco.complemento===''){
    alert('Preencha todos os campos');
    return;
 }

 if(!bairro){
    alert('Selecione um bairro');
    return;
 }
    const enderecoAtualizado={...novoEndereco,codigoBairro:bairro.codigoBairro}
    setListaEnderecos([...listaEnderecos,enderecoAtualizado]);
    setNovoEndereco(enderecoVazio)
    setEnderecoEmAtualizacao(enderecoVazio);
    setCopiaEndereco(enderecoVazio);
    setBairro(null)
    setEstado(null)
    setMunicipio(null)
    // setJaRetornou(true)
    setEditando(false)
    
}



/*
  Verifica se a pessoa tem pelo menos um endeço
  verifica sem não tem algum endereço em ediçao
  atualiza a lista de endereços da pessoa
  manda salvar no banco
  limpa os campos
*/
const atualizarPessoa=async(e)=>{
   e.preventDefault();
    if(listaEnderecos.length===0){
        alert("Adicione ao menos um endereco")
        return;
    }

    if(bairro){
        alert("Termine de editar o endereco")
        return;
    }

   

    //   setPessoa({...pessoa,enderecos:[...pessoa.enderecos,endereco]});
    // setPessoa({...pessoa,enderecos:[...pessoa.enderecos,[...listaEnderecos]]});
    
    // setPessoa({...pessoa,enderecos:[...listaEnderecos]});
    const pessoaToSave={...pessoa,enderecos:[...pessoa.enderecos,...listaEnderecos]}
    
    try {
      await axios.put('http://localhost:3333/pessoa',pessoaToSave,{ContentType:'application/json'});
      
      
  } catch (error) {
      console.log(error);
  }finally{
      console.log('fim')
  }
  

  
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
        <Form handleSubmit={(e)=>{atualizarPessoa(e)}}>
          <FormInput 
          type='text'
          label='Nome'
          value={pessoa.nome}
          name="nome"
          handler={(e)=>tratarDadosPessoais(e)}
          />

          <FormInput 
          type='text'
          label='Sobrenome'
          value={pessoa.sobrenome}
          name="sobrenome"
          handler={(e)=>tratarDadosPessoais(e)}
          />

          <FormInput 
          type='number'
          label='idade'
          value={pessoa.idade}
          name="idade"
          handler={(e)=>tratarDadosPessoais(e)}
          />
          <FormInput 
          type='text'
          label='login'
          value={pessoa.login}
          name="login"
          handler={(e)=>tratarDadosPessoais(e)}
          />
          <FormInput 
          type='text'
          label='senha'
          value={pessoa.senha}
          name="senha"
          handler={(e)=>tratarDadosPessoais(e)}
          />
          <FormInput 
          type='text'
          label='status'
          value={pessoa.status}
          name="status"
          handler={(e)=>tratarDadosPessoais(e)}
          />
          <button type='submit' >Salvar</button>
     </Form>
     {/* ========================== */}

    <Form  handleSubmit={(e)=>atualizarPessoa(e)} >
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
        <button onClick={(e)=>adicionarNovoEndereco(e) } >Adicionar</button>
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
                   {console.log(endereco)}
                    <div className="endereco_section primeiro">
                    <div>Rua <span>{endereco.nomeRua}</span></div>
                    <div>Comp <span>{endereco.complemento}</span></div>
                    <div>Cep <span>{endereco.cep}</span></div>
                    </div>

                    <div className="endereco_section">
                    <div>Num <span>{endereco.numero}</span></div>
                    <div>Bairro <span>{endereco?.bairro?.nome}</span></div>
                    </div>
                    <div className="endereco_section">
                    <div>Mun <span>{endereco?.bairro?.municipio?.nome}</span></div>
                    <div>UF <span>{endereco.bairro?.municipio?.uf.nome}</span></div>
                    </div>
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
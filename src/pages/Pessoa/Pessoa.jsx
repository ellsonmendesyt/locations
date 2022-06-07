import React, { useContext, useEffect, useState } from 'react'
import './Pessoa.css';
import { Dropdown } from '../../components/Dropdown';
import { ContextoUF } from '../../context/contextUF';
import { Form } from '../../components/Form';
import axios from 'axios';
import { FormInput } from '../../components/FormInput/FormInput';


export const Pessoa = () => {

   
  

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


//DADOS DAS PESSOAS
const [pessoas,setPessoas] = useState([]);

const obterMunicipiosPorCodigoUF=async(estado)=>{
  const munis= await axios.get(`http://localhost:3333/municipio?codigoUF=${estado.codigoUF}`)
  setMunicipio(null);
 setMunicipios(munis.data)
}
const obterBairrosPorCodigoMunicipio=async(estado)=>{
  const bairrosRetorno= await axios.get(`http://localhost:3333/bairro?codigoMunicipio=${municipio.codigoMunicipio}`)
  setBairro(null);
 setBairros(bairrosRetorno.data)
}

async function buscarTodasPessoas(){
  const pessoasRetorno = await axios.get('http://localhost:3333/pessoa');
  setPessoas(pessoasRetorno.data);
}

useEffect(()=>{
  async function iniciarBuscaPessoa(){
    buscarTodasPessoas();
  }
   iniciarBuscaPessoa();
},[])

useEffect(()=>{
  async function buscarMunicipios(){
     if(estado !=null)
      await obterMunicipiosPorCodigoUF(estado);
    }
    buscarMunicipios();
},[estado])


useEffect(()=>{
  async function buscarBairros(){
     if(municipio !=null)
      await obterBairrosPorCodigoMunicipio(municipio);
    }
    buscarBairros();
},[municipio])

  
const [pessoa,setPessoa] = useState({
"nome": "",
"sobrenome": "",
"idade":"",
"login": "",
"senha": "",
"status":"",
"enderecos": [
    
  ]
});

const [endereco,setEndereco] = useState({
  "codigoBairro": "",
  "nomeRua": "",
  "numero": "",
  "complemento": "",
  "cep": ""
})


const tratarDadosPessoais= (e)=>{
  setPessoa({...pessoa,[e.target.name]:e.target.value});
}

const limparPessoa=()=>{
  setPessoa({
    "nome": "",
    "sobrenome": "",
    "idade":"",
    "login": "",
    "senha": "",
    "status":""
  });
}

const submeterDadosPessoais= async(e)=>{
e.preventDefault();

if(pessoa.nome==="" || pessoa.sobrenome==="" || pessoa.idade==="" || pessoa.login==="" || pessoa.status===""||pessoa.senha==="" ){
  alert("Preencha todos os campos");
return;
}

if(pessoa.enderecos.length<1){
  alert('Forneça pelo menos um endereço');
  return;
}
limparPessoa();



const pessoasRetorno = await axios.post('http://localhost:3333/pessoa',pessoa,{ContentType:'application/json'});
 setPessoas(pessoasRetorno.data);
}



const adicionarEndereco= async (e)=>{
 e.preventDefault();
 if(endereco.codigoBairro ==='' || endereco.nomeRua ==="" || endereco.numero ==="" || endereco.cep ==="" || endereco.complemento ===""){
  alert("Preencha todos os campos");
  return;
}
 

pessoa.enderecos.push(endereco);

 limparEndereco();
 alert("Endereço adicionado com sucesso");
}

const limparEndereco=()=>{
  setEndereco({
    "codigoBairro": "",
    "nomeRua": "",
    "numero": "",
    "complemento": "",
    "cep": ""
  })
  setEstado(null)
  setBairro(null)
  setMunicipio(null);
}

const tratarDadosEndereco= async(e)=>{
e.preventDefault();

if(bairro==null){
  alert('Selecione um bairro');
  return;
}
setEndereco({...endereco,codigoBairro:bairro.codigoBairro,[e.target.name]:e.target.value});
}


  return (
    <article>

    
     <Form  handleSubmit={(e)=>submeterDadosPessoais(e)}>
         {/* {JSON.stringify(pessoa)} */}
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

          <button type='submit'>Salvar</button>
        
     
     </Form>


 
      <Form handleSubmit={(e)=>adicionarEndereco(e)}>
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

      <div className="lista ">
        {
          pessoas.length> 0 && pessoas.map(pessoa=>(
            <div key={pessoa.nome+pessoa.codigoPessoa}>
              <p>{pessoa.nome}</p>  
             </div>
          ))
        }
      </div>
    
    </article>
  )
}


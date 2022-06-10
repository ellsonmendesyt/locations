import React, { useContext } from 'react'
import './Estado.css';

import { ContextoUF } from '../../context/contextUF';

import  CardUF  from '../../components/Cards/cardUF';
import ButtonAnim from '../../components/ButtonAnim/ButtonAnim';
import { Form } from '../../components/Form';
import { FormInput } from '../../components/FormInput/FormInput';





const Estado = () => {


const gerenciadorEstados = useContext(ContextoUF);
const{ufs:estados,cadastrarEstado}=gerenciadorEstados;

const [showPopup, setShowPopup] = React.useState(false);


const fecharPopup = (e) => {
 e.preventDefault();
 setShowPopup(false)
}


const processarCadastro = async(e) => {
  e.preventDefault();

  if(novoCadastro.nome==='' || novoCadastro.sigla==='' ||novoCadastro.status===''){
    alert('Preencha todos os campos');
    return;
  }
  
  try {
    cadastrarEstado(novoCadastro)
    setNovoCadastro({nome:'',sigla:'',status:''})
    setTimeout(()=>{
      setShowPopup(false);
    },2000)
   
  } catch (error) {
    console.log(error.message)
  }
}

const [novoCadastro, setNovoCadastro] = React.useState({nome:"",sigla:"",status:""});

const tratarCamposCadastro = (e) => {
setNovoCadastro({...novoCadastro,[e.target.name]:e.target.value})
}


  return (
    <article>


      <ButtonAnim 
        clickHandler={()=>setShowPopup(!showPopup)}
        icon={<i className=" fa fa-map" ></i>}
        label2='Locais' 
        bg='purple' 
        color='white' 
        size={20}
        />



       <div className={`cadastro__popup ${showPopup===true ? 'show__popup': ''}`}>
          <h2 className='cadastro__title'>Cadastrar UF</h2>
          <Form handleSubmit={(e)=>processarCadastro(e)}>

            <FormInput 
            type='text' 
            label="Estado"
            name="nome"
            handler={tratarCamposCadastro}
            value={novoCadastro.nome}
            />
            <FormInput 
            type='text' 
            label="Sigla"
            name="sigla"
            handler={tratarCamposCadastro}
            value={novoCadastro.sigla}
            />
            <FormInput 
            type='text' 
            label="Status"
            name="status"
            handler={tratarCamposCadastro}
            value={novoCadastro.status}
            />
            <button className='btn__cadastro'>Cadastrar</button>
            <button onClick={(e)=>fecharPopup(e) } className='btn__fechar'>Sair</button>
          </Form>
       </div>

      
        <ul className='lista'>
      {
        estados.length>0 && estados.map(item=>(
          item && <CardUF key={item.codigoUF} estado={item}/>
        ))
      }
    </ul>
    </article>
  )
}

export default Estado
import React, { useContext,useState,useEffect} from 'react'


import { ContextoUF } from '../../context/contextUF';
import { Dropdown } from '../../components/Dropdown';
import './Municipio.css';




import { Form } from '../../components/Form';
import { FormInput } from '../../components/FormInput/FormInput';
import axios from 'axios';
import  CardMU  from '../../components/Cards/CardMU';




const Municipio = () => {

  const gerenciadorEstados = useContext(ContextoUF);
  const{ufs:estados}=gerenciadorEstados;

  // estado selecionaod no dropdown
  const [estado,setEstado] = useState(null);
  const [municipio, setMunicipio] = useState({nome:'',status:''});

  //municipios cadastrados 
  const [municipios, setMunicipios] = useState([]);

  // pega os dados do campo
  const manipuladorDeMudanca=(e)=>{
    setMunicipio({...municipio,[e.target.name]:e.target.value});
  }

const limparDados =()=>{
  setMunicipio({nome:'',status:''});
  setEstado(null);

}
  

  
 const enviarDadosMunicipio=async(e)=>{
   e.preventDefault();
   if (!municipio.nome || !municipio.status || !estado){
     alert('Preencha todos os campos');
     return;
   }
   const municipioAtualizado= {...municipio,codigoUF:estado.codigoUF};
   const response = await axios.post(`http://localhost:3333/municipio`, municipioAtualizado, {ContentType:"application/json"});
   setMunicipios(response.data);
   limparDados();
 
 }






useEffect(()=>{
   const obterMunicipios= async () => {
  const response= await axios.get(`http://localhost:3333/municipio`);
  setMunicipios(response.data);
}
obterMunicipios();
  
  
},[])


  return (
    <article>






    <Form handleSubmit={(e)=>enviarDadosMunicipio(e)} >


         {/* {JSON.stringify(estado)} */}

          <Dropdown 
          value={estado} 
          prompt="Estado"
         
          getOption={(value)=>setEstado(value)} 
          options={estados} 
          id="nome" 
          label="nome"
          /> 


        <FormInput value={municipio.status} handler={manipuladorDeMudanca}  label='Status' name='status' />
        <FormInput value={municipio.nome} handler={manipuladorDeMudanca}   label='Nome' name='nome' />
        <button type='submit'>Enviar</button>
    </Form>
    
    <hr style={{margin:"30px 0px"}} />
 

    <div className='lista'>
    {
        municipios.length>0 && municipios.map(item=>(
          item && <CardMU key={item.nome} municipio={item} />
        ))
      }
    </div>
          

    </article>
  )
}

export default Municipio


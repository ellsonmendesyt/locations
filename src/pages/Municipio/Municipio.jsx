import React, { useContext,useState,useEffect} from 'react'


import { ContextoUF } from '../../context/contextUF';
import { Dropdown } from '../../components/Dropdown';
import './Municipio.css';


import { Cart } from '../../components/Cart/Cart';
import { ActionBoxMU, MU } from '../../components/Lista/Lista';
import { Form } from '../../components/Form';
import { FormInput } from '../../components/FormInput/FormInput';
import axios from 'axios';




const Municipio = () => {

  const estados = useContext(ContextoUF);
  const [estado,setEstado] = useState(null);
  const [municipio, setMunicipio] = useState({nome:'',status:''});
  const [municipios, setMunicipios] = useState([]);

  const manipuladorDeMudanca=(e)=>{
    setMunicipio({...municipio,[e.target.name]:e.target.value});
  }

const limparDados =()=>{
  setMunicipio({nome:'',status:''});

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
    <Dropdown 
      value={estado} 
      prompt="Estado"
      getOption={(value)=>setEstado(value)} options={estados} 
      id="codigoUF" 
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
          item && <Cart specific={<MU item={item} />}  actionbox={<ActionBoxMU item={item}/>} key={item.nome} item={item} />
        ))
      }
    </div>
          

    </article>
  )
}

export default Municipio


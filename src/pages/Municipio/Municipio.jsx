import React, { useContext } from 'react'

// import { ContextoUF } from '../../context/contextUF';
import { ContextoUF } from '../../context/contextUF';
import { Dropdown } from '../../components/Dropdown';
import './Municipio.css';
import { ContextoMunicipio } from '../../context/contextoMunicipio';
import { Lista } from '../../components/Lista';
import { Cart } from '../../components/Cart/Cart';
import { ActionBoxMU, MU } from '../../components/Lista/Lista';




const Municipio = () => {

//tras os Estados | UFs da contexto
const municipios = useContext(ContextoMunicipio);

  return (
    <article>
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


/*

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

  
  
  //toa vez que o campo dinamico mudar, eu atualizo o campo de codigoUF
useEffect(()=>{
  if(estado!==null){
    setMunicipio({...municipio,codigoUF:estado.codigoUF});
   
    
  }
},[estado])


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


*/
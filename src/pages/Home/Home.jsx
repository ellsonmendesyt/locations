import React from 'react'
import ButtonAnim from '../../components/ButtonAnim/ButtonAnim';
import { Form } from '../../components/Form';
import { FormInput } from '../../components/FormInput/FormInput';

import Mapa from '../../components/Mapa';
import './Home.css';
import useFetch from '../../hooks/useFetch';
import Switch from '../../components/Switch/Switch';

const Home = () => {

 const [dados,setDados] = React.useState({nome:'',email:''});
 const [states,carregando,erro]=useFetch('http://localhost:3333/uf');


  const manipuladorDeMudanca=(e)=>{
    setDados({...dados,[e.target.name]:e.target.value});
  }

 if(carregando){ return <h1>Carregando...</h1>}
if(erro){ return <h1>{erro.message}</h1>}





  return (
    <article className='home'>

      <h3>{dados.nome} {dados.email}</h3>

   {/* <Switch cor1='orange' cor2='purple'/> */}


      {/* <Form name='municipio' >
        <FormInput handler={manipuladorDeMudanca} value={dados.nome} name='nome' label='Nome' />
        <FormInput handler={manipuladorDeMudanca} value={dados.email} name='email' label='Email' />
      </Form> */}

      {/* {
        states && states.length>0 && states.map(state=>{
          return <div key={state.codigoUF}>
            <h4>{state.nome}</h4>
            <p>{state.sigla}</p>
          </div>
        })
      } */}

       
     
        {/* {JSON.stringify(dados)} */}
      
        {/* <ButtonAnim 
        clickHandler={()=>alert('feito')}
        icon={<i className=" fa fa-map" ></i>}
        label2='Locais' 
        bg='purple' 
        color='white' 
        size={20}
        />


        <ButtonAnim 
        clickHandler={()=>alert('feito')} 
        icon={<i className="fa  fa-cart-arrow-down"></i>}  
        label2='Comprar' 
        bg='crimson' 
        color='white' 
        size={21}
        />

          */}
<Mapa /> 
    </article>
  )
}

export default Home
import React, { useContext, useState } from 'react'
import './Pessoa.css';

import { Dropdown } from '../../components/Dropdown';




import { ContextoUF } from '../../context/contextUF';
import {ContextoMunicipio} from '../../context/contextoMunicipio';
import { ContextoBairro } from '../../context/contextoBairro';


export const Pessoa = () => {

   
    const estados = useContext(ContextoUF);
    const municipios= useContext(ContextoMunicipio);
    const bairros = useContext(ContextoBairro);


    const [estado,setEstado] = useState(null);
    const [municipio,setMunicipio] = React.useState(null);
    const [bairro,setBairro] = React.useState(null);


   bairro && console.log(bairro);

  return (
    <div className='pessoa'>


    <div className="dados_pessoais">
        <form  className="formulario_pessoa--dados">
            <input className='pessoa_campo' type="text" name='nome' placeholder='Nome' />
            <input className='pessoa_campo' type="text" name="idade" placeholder='idade' />
            <input className='pessoa_campo' type="text" name="senha"  placeholder='senha'/>

            <input className='pessoa_campo' type="text" name="sobrenome"  placeholder='sobrenome'/>
            <input className='pessoa_campo' type="text" name="login" placeholder='login' />
            <input className='pessoa_campo' type="text" name="status" placeholder='status' />
            <button type='submit'>Salvar</button>
        </form>
    </div>

    <div className="cadastro_endereco">
        <form className="formulario_pessoa--endereco">
            <input className='pessoa_campo--endereco' type="text" name="rua" placeholder='rua' />
            <input className='pessoa_campo--endereco' type="text" name="numero" placeholder='numero' />
            <input className='pessoa_campo--endereco' type="text" name="complemento" placeholder='bairro' />

         <Dropdown 
          value={estado} 
          prompt="Estado"
          getOption={(value)=>setEstado(value)} options={estados} 
          id="codigoUF" 
          label="nome"
          />


         
        <Dropdown 
          value={municipio} 
          prompt="Municipio"
          getOption={(value)=>setMunicipio(value)} options={municipios} 
          id="codigoUF" 
          label="nome"
          />

           
        <Dropdown 
          value={bairro} 
          prompt="Bairro"
          getOption={(value)=>setBairro(value)} options={bairros} 
          id="codigoMunicipio" 
          label="nome"
          /> 
           
            <button type='submit'>Salvar</button>
        </form>
    </div>

        {/* LISTA  TEMPORARIA*/}
        {/* <Lista id="codigoUF" items={estados} /> */}

    </div>
  )
}

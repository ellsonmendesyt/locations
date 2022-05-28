import React, { useContext, useState } from 'react'
import { ContextoUF } from '../../context/contextUF';
import './Pessoa.css';

import { Dropdown } from '../../components/Dropdown';
import { Lista } from '../../components/Lista';

export const Pessoa = () => {

    const {ufs} = useContext(ContextoUF);


    const [estado,setEstado] = useState(null);
    const [municipio,setMunicipio] = React.useState({nome:'',codigoUF:'',status:''});



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
          getOption={(value)=>setEstado(value)} options={ufs} 
          id="codigoUF" 
          label="nome"
          />
        <Dropdown 
          value={estado} 
          prompt="Estado"
          getOption={(value)=>setEstado(value)} options={ufs} 
          id="codigoUF" 
          label="nome"
          />
        <Dropdown 
          value={estado} 
          prompt="Estado"
          getOption={(value)=>setEstado(value)} options={ufs} 
          id="codigoUF" 
          label="nome"
          />
           
            <button type='submit'>Salvar</button>
        </form>
    </div>

        {/* LISTA  TEMPORARIA*/}
        <Lista id="codigoUF" items={ufs} />

    </div>
  )
}

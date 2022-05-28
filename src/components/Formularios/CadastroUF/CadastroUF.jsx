import React, { useContext } from 'react'
import { ContextoUF } from '../../../context/contextUF';
import './CadastroUF.css';



export const CadastroUF = () => {


const {cadastrarEstado} =useContext(ContextoUF);    

const [uf,setUf] = React.useState({nome:'',sigla:'',codigoUF:'',status:''});

 const tratarMudancaUF= (e)=>{
    setUf({...uf,[e.target.name]:e.target.value});
 }

 const limparCamposUF=()=>{
    setUf({nome:'',sigla:'',codigoUF:'',status:''});
    }

const tratarEnvio= async(e)=>{
  if(!uf.nome || !uf.sigla || !uf.status){
      alert("Preencha todos os campos");
      return;
  }

    e.preventDefault();
    await cadastrarEstado(uf)
    limparCamposUF();
    
}
//onClick={(e)=>tratarEnvio(e)}
  return (
      <>
      {/* {JSON.stringify(uf)} */}
    <form className='formulario_uf' onSubmit={tratarEnvio}>
        <div className="formulario_grupo_campos">
        <input className='campo_uf' onChange={(e)=>tratarMudancaUF(e)} value={uf.nome.toString()} type="text" name='nome' required placeholder='nome' />
        <input className='campo_uf' onChange={(e)=>tratarMudancaUF(e)} value={uf.sigla.toString()} type="text" name='sigla' required placeholder="sigla" />
        <input className='campo_uf' onChange={(e)=>tratarMudancaUF(e)} value={uf.status.toString()} type="text" name='status' required placeholder="status" />

        <button className='campo_uf_save'   type='submit'>salvar</button>    
        </div>
    </form>
    </>
  )
}


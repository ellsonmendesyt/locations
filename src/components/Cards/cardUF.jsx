import React, { useContext } from 'react'
import { ContextoUF } from '../../context/contextUF';
import ButtonAnim from '../ButtonAnim/ButtonAnim';
import { Switch } from '../Switch/Switch';

import './CardUF.css';

import ufImg from './imgs/estado.png';

const CardUF = ({estado}) => {


// tras os Estados | UFs e seus manipuladores
const gerenciadorEstados = useContext(ContextoUF);
const {ufs:estados,setUfs,obterEstados,removerEstado,atualizarEstado,atualizarStatusEstado,cadastrarEstado}=gerenciadorEstados;

// controla a parte de edição
const [isOpen, setIsOpen] = React.useState(true);
const [showEdit, setShowEdit] = React.useState(false);



//controla a atualizaçãod e status do estado
const [novoEstado,setNovoEstado]=React.useState(estado);
const tratarNovoEstado=()=>{
  setNovoEstado({...novoEstado,status:novoEstado.status===1?2:1});
}


const tratarNovaSiga=(e)=>{
  setNovoEstado({...novoEstado,sigla:e.target.value});
 
}


const submeterNovoEstado= async(e)=>{
e.preventDefault();
 atualizarEstado(novoEstado)
 try {
     await atualizarEstado(novoEstado);
 } catch (error) {
   console.log(error)
 }
}



return (
  <div className='card__uf'>
         <div className="card__image"> <img src={ufImg} alt="image UF" /></div>
          <div className={`card__uf--overlay ${isOpen? 'down': ''}`}>
            {/* MOSTRAR SOMENTE PONTINHA DO OVERLAY */}
            <div className="card--actions">
              <div className="title">{estado.nome}</div>
                <button title='detalhes' className='card--btn' onClick={()=>setIsOpen(!isOpen)}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" data-supported-dps="24x24" fill="currentColor" className="mercado-match" width="24" height="24" focusable="false">
                    <path d="M14 12a2 2 0 11-2-2 2 2 0 012 2zM4 10a2 2 0 102 2 2 2 0 00-2-2zm16 0a2 2 0 102 2 2 2 0 00-2-2z"></path>
                  </svg>
                </button>
            </div>
            {/* CONTEUDO DO CARTAO */}
            <div className={`card--content`}>
              <div className='info'>{estado.codigoUF}</div>
              <div >{estado.sigla}</div>
              <div>{estado.status===1? 'ativo': 'inativo'}</div>
            </div>

               {/* FORMULARIO DE EDIÇÃO EMBUTIDO*/}
              <form className={`card__uf--update ${showEdit===true ? 'show-edit': ''}`} onSubmit={(e)=>submeterNovoEstado(e)} >
                {/* <input type="number" placeholder='0' /> */}
                <Switch name='status' changeHandler={tratarNovoEstado} titulo="ativar | desativar status" ativo={novoEstado.status}/>
                <input onChange={(e)=>tratarNovaSiga(e)}  value={novoEstado.sigla}  name='sigla' className='sigla' type="text" placeholder='sigla' maxLength="2" />
                
                <ButtonAnim 
                clickHandler={()=>console.log('fez')}
                icon={<i className="fa fa-paper-plane" ></i>}
                label2='Enviar' 
                bg='#3883de' 
                color='white' 
                size={20}
                />
              </form>

              {/* MENU DE ACOES*/}
            <div className="card__footer">
              <div className="card__content--actions">
                <button disabled={showEdit} onClick={()=>atualizarStatusEstado(estado)} className='action__btn status_btn'>{estado.status===1? 'desabilitar':'habilitar'}</button>
                <button onClick={()=>setShowEdit(!showEdit)} className='action__btn'>{`${showEdit===false ? 'atualizar': 'conteúdo'}`}</button>
                <button className='action__btn'>deletar</button>
              </div>
            </div>
      </div>
    </div>
  )
}

export default CardUF;
import React, { useContext } from 'react'
import { ContextoUF } from '../../context/contextUF';
import ButtonAnim from '../ButtonAnim/ButtonAnim';
import { Switch } from '../Switch/Switch';

import './CardUF.css';

import ufImg from './imgs/estado.png';

export const CardUF = ({estado}) => {


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
  setNovoEstado({...novoEstado,sigla:e.target.value,codigoUF:estado.codigoUF});
 
}


const submeterNovoEstado= async(e)=>{
 e.preventDefault();
 atualizarEstado(novoEstado);


//  setNovoEstado({nome:"",sigla:""});
 
 
}


// 










return (
  <div className='card__uf'>
         <div className="card__image"> <img src={ufImg} alt="image UF" /></div>
          <div className={`card__uf--overlay ${isOpen? 'down': ''}`}>

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

               {/* EMUBITIDO ATUALIZA OS DOADOS DO CARTAO */}
              <form className={`card__uf--update ${showEdit===true ? 'show-edit': ''}`} onSubmit={(e)=>submeterNovoEstado(e)} >
                {/* <input type="number" placeholder='0' /> */}
                <Switch name='status' changeHandler={tratarNovoEstado} titulo="ativar | desativar status" ativo={novoEstado.status}/>
                <input onChange={(e)=>tratarNovaSiga(e)}  value={novoEstado.sigla}  name='sigla' className='sigla' type="text" placeholder='sigla' maxLength="2" />
                
                <ButtonAnim 
                clickHandler={()=>console.log('')}
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
                <button onClick={()=>atualizarStatusEstado(estado)} className='action__btn'>{estado.status===1? 'desabilitar':'habilitar'}</button>
                <button onClick={()=>setShowEdit(!showEdit)} className='action__btn'>atualizar</button>
                <button className='action__btn'>deletar</button>
              </div>
            </div>
      </div>
     
    </div>
  )
}



























// import React, { useContext,useEffect,useState,useRef } from 'react'
// import { ContextoUF } from '../../context/contextUF';



// import './CardUF.css';

// import { useClicarFora } from '../../hooks/useClicarFora';

// export const CardUF = ({estado}) => {

// const {removerEstado} = useContext(ContextoUF);

// const [show, setShow] = useState(false);
// const popUpRef=useClicarFora(()=>{setShow(false)})

 

//   return (
//     <li className='card'>
//      <div className="card_header">
//          <h4 className='titulo'>{estado.nome}</h4>
       
//        {/* ACTIONS */}

//         <div ref={popUpRef}  className="actions-container">
//           <button  onClick={()=>setShow(!show)} className='toggler' >Options</button>
//         <div  className={`action-pills ${show ? 'show': ''}`}>
//           <button name='deletar' className='action' onClick={()=> console.log(estado.nome)}>deletar</button>
//           <button name='atualizar' className='action' onClick={()=> console.log(estado.nome)}>atalizar</button>
//           <button name='detalhar' className='action' onClick={()=> console.log(estado.nome)}>detalhar</button>
//           <button name='desativar' className='action' onClick={()=> console.log(estado.nome)}>desativar</button>
//         </div>
//         </div>

//      </div>
//      {/* INFO */}
//      <div className="card_body">
//          <ul>
//          <li>
//            <span>{estado.codigoUF}</span> <span>codigo</span>
//            </li>
//          <li><span>{estado.sigla}</span> <span>sigla</span></li>
//          <li><span>{estado.status}</span> <span>status</span></li>
//          </ul>
//      </div>
//     </li>
//   )
// }





















//   {/* <div className="action-box">
//          <button className='optionsBtn'  onClick={()=>removerEstado(estado.codigoUF)}>
//          <svg fill="currentColor" viewBox="0 0 24 24" width="1em" height="1em" ><circle cx="12" cy="12" r="2.5"></circle><circle cx="19.5" cy="12" r="2.5"></circle><circle cx="4.5" cy="12" r="2.5"></circle></svg>
//          </button>
//            <div className="pop-up">
//               <p>Deseja remover o estado?</p>
//            </div>

//          </div> */}
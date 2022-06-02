import React, { useEffect,useRef,useState } from 'react'
import './Drop.css';


/**-------------------------------------------------------------------
  Passamos uma lista de ESTADOS pro dropdown o que o usuario escolher 
  Porque preqisamos saber em qual Estado criar o MUNICIPIO

 Parametros do Dropdown:
 
value:      ele vai mostrar a opção selecionada
prompt:     texto que informa o que o usuario deve escolher
getOption:  recupera o valor selecionado
id:         usado na propriedade key do elemento ao ser mapeado
label:      usado para mostrar o valor no dropdown

----------------------------------------------------------------------*/

export const Dropdown = ({options,prompt, value, getOption,label,id}) => {

 const [open,setOpen] = useState(false);

  const ref = useRef(null);

 useEffect(()=>{
  document.addEventListener('click', fecharDropdown);
  return ()=> document.removeEventListener("click",fecharDropdown);
 },[])
 
const fecharDropdown = (e) => {
  // console.dir([e.target, ref.current])
 setOpen(e && e.target === ref.current);
}

  return (
    <div className="dropdown">

      <div className="control" onClick={()=>setOpen((prev)=>!prev)}>
        <div className="selected-value" ref={ref}>{value ? value[label] : prompt}</div>
        <div  className={`arrow  ${open ? "open" : null}`}/>
      </div>

      <div className={`options  ${open ? "open" : null}`}>
        {
            options.length>0 ?options.map(option=> 
            <div 
            key={option[id]}
            className={`option ${value===option ? "selected": null}`} 
            onClick={()=>{getOption(option);
            setOpen(false)
            }}>{option.nome}</div>): <p>Sem Dropdown</p>
        }
      </div>

    </div>
  )
}


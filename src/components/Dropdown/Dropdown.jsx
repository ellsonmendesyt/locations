import React, { useEffect,useRef,useState } from 'react'


import './Drop.css';
export const Dropdown = ({options,prompt, value, onChange,label,id}) => {

 const [open,setOpen] = useState(false);

  const ref = useRef(null);

 useEffect(()=>{
  document.addEventListener('click', fecharDropdown);

  return ()=> document.removeEventListener("click",fecharDropdown);
 },[])
 
const fecharDropdown = (e) => {
  console.dir([e.target, ref.current])
  //se estiver aberto e se eu cliquei no dodumento
 setOpen(e && e.target === ref.current);
}

  return (
    <div className="dropdown">

      <div className="control" onClick={()=>setOpen((prev)=>!prev)}>
        <div className="selected-value" ref={ref}>{value ? value[label] : prompt}</div>
        <div  className={`arrow  ${open ? "open" : null}`}/>
      </div>

      <div className={`options  ${open ? "open" : null}`}>
        {options.map(option=> 
        <div 
        key={option[id]}
        className={`option ${value===option ? "selected": null}`} 
        onClick={()=>{onChange(option);
        setOpen(false)
        }}>{option.nome}</div>)}
      </div>

    </div>
  )
}


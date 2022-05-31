import {useRef,useEffect} from 'react';

export const useClicarFora=(handler)=>{
    const domNodeRef = useRef(null);
    useEffect(()=>{
      const handleClick=(event)=>{
        if(domNodeRef.current && !domNodeRef.current.contains(event.target)){
           handler();
         }
      }
  
      document.addEventListener('mousedown', handleClick,true)
      return ()=> document.removeEventListener("mousedown",handleClick,true)
    },[])
  
    return domNodeRef;
  }
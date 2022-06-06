import axios from 'axios'
import React,{useState,useEffect} from 'react'

const useFetch = (url) => {

const [dados, setDados] = useState(null)
const [carregando, setCarregando] = useState(false)
const  [erro, setErro] = useState(null);

const config={
    ContentType: 'application/json',
}
useEffect(()=>{
    setCarregando(true)
   axios.get(url,config)
   .then(resposta=>{
       setDados(resposta.data)
       setCarregando(false)
   })
   .catch(erro=>{
         setErro(erro)
   }).finally(()=>{
         setCarregando(false)
   })
},[])
   return [dados,carregando,erro]
}

  


export default useFetch
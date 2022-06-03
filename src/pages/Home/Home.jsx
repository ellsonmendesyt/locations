import React from 'react'
import ButtonAnim from '../../components/ButtonAnim/ButtonAnim';
import Mapa from '../../components/Mapa';
import './Home.css';


const Home = () => {
  return (
    <article className='home'>
        <ButtonAnim 
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

          <Mapa />

    </article>
  )
}

export default Home
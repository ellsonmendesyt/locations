import React from 'react';

import './CardMU.css';



const CardMU = ({municipio}) => {
  return (
    <div className='card__mu'>
      <div className="card__mu--title">
          <div className="card__mu--actions">
              <button className='action__mu'>modificar</button>
              <button className='action__mu'>update</button>
              <button className='action__mu'>desabilitar</button>
            </div>
      </div>

      <div className="card__mu--body">
           <span title='Nome'>{municipio.nome}</span>
         <div className="card__content">
           <span title='UF'>{municipio.codigoUF}</span>
           <span title='MU'> {municipio.codigoMunicipio}</span>
           <span title='Status'> {`${municipio.status===1? 'ativo':'inativo'}`}</span>
         </div>
      </div>

      <div className="card__mu--footer">
       
      </div>
    </div>
  )
}

export default CardMU;

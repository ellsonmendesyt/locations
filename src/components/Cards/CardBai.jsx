import React from 'react'
import './CardBai.css';



const CardBai = ({bairro,acoes}) => {
  return (
    <div className='card__bai'>
        <div className="card__bai--body">
             <h4 className='card__bai--title'>{bairro.nome}</h4>
            <div className="card__bai--content">
             <p title='status'> <i className="fa  fa-lightbulb-o icone"></i> <span>{`${bairro.status===1? 'ativo': 'inativo'}`}</span></p>
             <p title='codigo municipio'><i className="fa fa-road icone"></i> <span>{bairro.codigoMunicipio}</span></p>
             <p title='codigo bairro'><i className="fa fa-map-marker icone" aria-hidden="true"></i> <span>{bairro.codigoBairro}</span></p>

            </div>
        </div>
        <div className="card__bai--footer">
           <button>modificar</button>
           <button>desabilitar</button>
        </div>
    </div>
  )
}

export default CardBai
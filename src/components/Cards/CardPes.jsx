import React from 'react'
import Modal from '../Modal/Modal';

import './CardPes.css';

const CardPes = ({pessoa}) => {

 const [isModalOpen, setIsModalOpen] = React.useState(false);





 const closeModal = () => {
    setIsModalOpen(false);
}


  return (
    <div className='card__pessoa'>
        <div className="card__pessoa--header">
            <div className="card__pessoa--avatar">
            <i className="fa fa-user icone_pessoa" aria-hidden="true"></i>
            </div>
            <h4 className="card__pessoa--title">{pessoa.nome}</h4>

        </div>
        <div className="card__pessoa--body">

            <div className='pessoa__info'>
                <span><i className="fa fa-id-badge" aria-hidden="true"></i></span>
                <span>{pessoa.codigoPessoa}</span>
            </div>
            <div className='pessoa__info'>
                <span><i className="fa fa-calendar" aria-hidden="true"></i></span>
                <span>{pessoa.idade}</span>
            </div>
            <div className='pessoa__info'>
                <span><i className="fa fa-info-circle status" aria-hidden="true"></i></span>
                <span>{pessoa.status===1?'ativo':'inativo'}</span>
            </div>

          
            <Modal item={pessoa} onClose={()=>closeModal()} open={isModalOpen}>
              
            </Modal>
           
        </div>

        <div className="card__pessoa--footer">
            
            <button onClick={()=> setIsModalOpen(! isModalOpen) } className="acao">modificar</button>
        </div>
    </div>
  )
}

export default CardPes
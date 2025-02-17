import React, { useState } from 'react';
import './courtCard.scss';
import 'react-datepicker/dist/react-datepicker.css';
import ModalEstabelecimento from '../Component_ModalEstabelecimento';

const CourtCard = ({ court }) => {

  const [modalOpen, setModalOpen] = useState(false)

  const handleClose = () => {
    console.log('close')
    setModalOpen(false)
  }

  return (
    <>
      <div className="container mt-4 court-card-container" onClick={() => {setModalOpen(true)}}>
        <img src={court.foto} alt="Court" />
        <div className="info-card">
          <p><b>Nome: </b>&nbsp;{court.nome}</p>
          <p><b>Horário de Funcionamento: </b>&nbsp;{court.horarioFuncionamento}</p>
          <p><b>Endereço: </b>&nbsp;{court.endereco}</p>
          <p><b>Preço da Hora: </b>&nbsp;{court.precoHora}</p>
        </div>
        <div className="bg-img-container">
          <div className="bg-img"></div>
        </div>
      </div>
      {modalOpen && <ModalEstabelecimento estabelecimento={court} onClose={handleClose}/>}
    </>
  );
};

export default CourtCard;

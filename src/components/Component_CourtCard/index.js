import React from "react";
import "react-datepicker/dist/react-datepicker.css";

import './courtCard.scss';

const CourtCard = ({ court }) => {
    return (
        <div className="container mt-4 court-card-container">
            <img src={court.foto} alt="Court" />
            <div className="info-card">
                <p><b>Nome: </b>&nbsp;{court.nome}</p>
                <p><b>Horário de Funcionamento: </b>&nbsp;{court.horarioFuncionamento}</p>
                <p><b>Endereço: </b>&nbsp;{court.endereco}</p>
            </div>
            <div className="bg-img-container">
                <div className="bg-img"></div>
            </div>
        </div>
    );
};

export default CourtCard;

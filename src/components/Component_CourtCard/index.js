import React, { useState } from 'react';
import './courtCard.scss';

const CourtCard = ({ court }) => {
  const [selectedDay, setSelectedDay] = useState(null); // Track the selected day
  const [selectedHorario, setSelectedHorario] = useState(''); // Track selected horario

  const horarios = court.horarios;

  const handleDayChange = (e) => {
    const day = e.target.value;
    setSelectedDay(day); // Set the selected day
  };

  const handleHorarioChange = (e) => {
    const horario = e.target.value;
    setSelectedHorario(horario); // Set the selected horario
  };

  return (
    <div className="container mt-4 court-card-container">
      <img src={court.foto} alt="Court" />
      <div className="info-card">
        <p><b>Nome: </b>&nbsp;{court.nome}</p>
        <p><b>Horário de Funcionamento: </b>&nbsp;{court.horarioFuncionamento}</p>
        <p><b>Endereço: </b>&nbsp;{court.endereco}</p>
        <div className="card-select-container">
          {/* Day select */}
          <select
            className="form-select"
            aria-label="Dia select"
            onChange={handleDayChange}
            value={selectedDay || ''}
          >
            <option selected disabled>Dia</option>
            {horarios.map((horario, dayIndex) => (
              <option key={dayIndex} value={horario.day}>
                {horario.day}
              </option>
            ))}
          </select>

          {/* Horário select - disabled until a day is selected */}
          <select
            className="form-select"
            aria-label="Horário select"
            onChange={handleHorarioChange}
            value={selectedHorario}
            disabled={!selectedDay} // Disable if no day is selected
          >
            <option selected disabled>Horário</option>
            {/* Show only the horarios for the selected day */}
            {selectedDay &&
              horarios
                .filter((horario) => horario.day === parseInt(selectedDay)) // Filter by selected day
                .flatMap((horario) =>
                  horario.horarios.map((timeSlot, timeIndex) => (
                    <option key={`${timeIndex}`} value={timeSlot.horario} disabled={timeSlot.disponivel}>
                      {timeSlot.horario}
                    </option>
                  ))
                )}
          </select>
        </div>
      </div>
      <div className="bg-img-container">
        <div className="bg-img"></div>
      </div>
    </div>
  );
};

export default CourtCard;

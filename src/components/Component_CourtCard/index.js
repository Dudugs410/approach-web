import React, { useContext, useState } from 'react';
import './courtCard.scss';
import { AuthContext } from '../../contexts/auth';

const CourtCard = ({ court }) => {
  const { schedule, updateUser } = useContext(AuthContext)

  const [selectedDate, setSelectedDate] = useState(''); // Track the selected date
  const [selectedTime, setSelectedTime] = useState(''); // Track selected time slot

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value); // Set the selected date
    setSelectedTime(''); // Reset selected time when date changes
  };

  const handleHorarioChange = (e) => {
    setSelectedTime(e.target.value); // Set the selected time
  };

  const handleSubmit = () => {
    if (!selectedDate || !selectedTime) {
      alert('Please select both a date and time.');
      return;
    }

    // Combine the date and time into a Date object
    const dateTime = new Date(`${selectedDate}T${selectedTime}`);

    // Call the schedule function with place and dateTime
    schedule(court, dateTime);
    let user = JSON.parse(localStorage.getItem('currentUser'))
    updateUser(user)
    alert('Agendamento realizado com sucesso!');
  };

  return (
    <div className="container mt-4 court-card-container">
      <img src={court.foto} alt="Court" />
      <div className="info-card">
        <p><b>Nome: </b>&nbsp;{court.nome}</p>
        <p><b>Horário de Funcionamento: </b>&nbsp;{court.horarioFuncionamento}</p>
        <p><b>Endereço: </b>&nbsp;{court.endereco}</p>
        <div className="card-select-container">
         {/* Date Picker */}
         <input
            type="date"
            className="form-select date-time-controller"
            aria-label="Dia select"
            onChange={handleDateChange}
            value={selectedDate}
            style={{ flex: 1 }}
          />

          {/* Time Picker - Disabled until a date is selected */}
          <input
            type="time"
            className="form-control date-time-controller"
            aria-label="Horário select"
            onChange={handleHorarioChange}
            value={selectedTime || ''}
            disabled={!selectedDate}
          />
          <div className='btn-container'>
            <button 
              className='btn btn-agendar date-time-controller' 
              disabled={!selectedTime || !selectedDate}
              onClick={handleSubmit}
              >
                Agendar
            </button>
          </div>
        </div>
      </div>
      <div className="bg-img-container">
        <div className="bg-img"></div>
      </div>
    </div>
  );
};

export default CourtCard;

import React, { useContext, useState } from 'react';
import './courtCard.scss';
import { AuthContext } from '../../contexts/auth';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const CourtCard = ({ court }) => {
  const { schedule, updateUser } = useContext(AuthContext);

  const [selectedDate, setSelectedDate] = useState(null); // Track the selected date
  const [selectedTime, setSelectedTime] = useState(null); // Track selected time slot

  const handleDateChange = (date) => {
    setSelectedDate(date); // Update the selected date
    setSelectedTime(null); // Reset the selected time when date changes
  };

  const handleHorarioChange = (time) => {
    setSelectedTime(time); // Update the selected time
  };

  const handleSubmit = () => {
    if (!selectedDate || !selectedTime) {
      alert('Please select both a date and time.');
      return;
    }

    // Combine the date and time into a Date object
    const dateTime = new Date(
      `${selectedDate.toISOString().split('T')[0]}T${selectedTime.toTimeString().split(' ')[0]}`
    );

    // Call the schedule function with place and dateTime
    schedule(court, dateTime);

    const user = JSON.parse(localStorage.getItem('currentUser'));
    updateUser(user);

    alert('Agendamento realizado com sucesso!');
  };

  return (
    <div className="container mt-4 court-card-container">
      <img src={court.foto} alt="Court" />
      <div className="info-card">
        <p><b>Nome: </b>&nbsp;{court.nome}</p>
        <p><b>Horário de Funcionamento: </b>&nbsp;{court.horarioFuncionamento}</p>
        <p><b>Endereço: </b>&nbsp;{court.endereco}</p>
        <p><b>Preço da Hora: </b>&nbsp;{court.precoHora}</p>
        <div className="card-select-container">
          {/* Date Picker */}
          <ReactDatePicker
            portalId="root-portal"
            selected={selectedDate}
            onChange={handleDateChange}
            className="form-select"
            dateFormat="dd/MM/yyyy"
            placeholderText="Select a date"
             popperPlacement="bottom-start"
            popperModifiers={[
              {
                name: 'preventOverflow',
                options: {
                  boundary: 'viewport', // Ensures the dropdown stays within the viewport
                },
              },
              {
                name: 'offset',
                options: {
                  offset: [0, 8], // Pushes the dropdown 8px below the input
                },
              },
            ]}
          />
          <ReactDatePicker
            portalId="root-portal"
            selected={selectedTime}
            onChange={handleHorarioChange}
            className="form-control"
            showTimeSelect
            showTimeSelectOnly
            timeIntervals={15}
            timeCaption="Time"
            dateFormat="HH:mm"
            disabled={!selectedDate}
            placeholderText="Select a time"
            popperPlacement="bottom-start"
            popperModifiers={[
              {
                name: 'preventOverflow',
                options: {
                  boundary: 'viewport', // Ensures the dropdown stays within the viewport
                },
              },
              {
                name: 'offset',
                options: {
                  offset: [0, 8], // Pushes the dropdown 8px below the input
                },
              },
            ]}
          />
          {/* Submit Button */}
          <div className="btn-container">
            <button
              className="btn btn-agendar date-time-controller"
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

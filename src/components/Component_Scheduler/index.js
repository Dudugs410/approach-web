import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./scheduler.scss"; // Custom styling
import SchedulerTable from "./SchedulerTable";

const Scheduler = () => {
  const [selectedDate, setSelectedDate] = useState(null)
  const [selectedTime, setSelectedTime] = useState(null)
  const [selectedLocal, setSelectedLocal] = useState(null)
  const [bookings, setBookings] = useState([])

  const handleBooking = () => {
    if (!selectedDate || !selectedTime) {
      alert("Você deve selecionar uma Data e Horário")
      return
    }

    const newBooking = {
      date: selectedDate.toLocaleDateString('pt-BR'),
      time: selectedTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      local: selectedLocal
    }

    setBookings((prevBookings) => [...prevBookings, newBooking])
    setSelectedDate(null)
    setSelectedTime(null)
  }

  useEffect(()=>{
    let temp = JSON.parse(localStorage.getItem('bookings'))
    if(!!temp){
      setBookings(temp)
    }
  },[])

  useEffect(()=>{
    localStorage.setItem('bookings', JSON.stringify(bookings))
  },[bookings])

  useEffect(()=>{
    console.log('local: ', selectedLocal)

  },[selectedLocal])

  return (
    <div className="scheduler">
      <h1>Reserva de Quadras</h1>

      <div className="picker-container">
        <div className='picker-group'>
          <label>Selecione a Data:</label>
          <DatePicker
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            minDate={new Date()}
            placeholderText="data"
            className="form-control"
          />
        </div>
        <div className='picker-group'>
          <label>Selecione o Horário:</label>
          <DatePicker
            selected={selectedTime}
            onChange={(time) => setSelectedTime(time)}
            showTimeSelect
            showTimeSelectOnly
            timeIntervals={30}
            timeCaption="Time"
            dateFormat="h:mm aa"
            placeholderText="horário"
            className="form-control"
          />
        </div>
        <div className='picker-group'>
          <label>Selecione o Local:</label>
          <select
            selected={selectedLocal}
            onChange={(selected) => setSelectedLocal(selected.target.value)}
            className="form-select"
          >
              <option selected value='GNU'>Gremio Nautico União</option>
              <option value="Outro">Outro</option>
          </select>
        </div>
      </div>

      <button onClick={handleBooking} className="reserve-btn">
        Reservar
      </button>

      <div className="booking-list">
        <h2>Suas Reservas:</h2>
        {bookings.length > 0 ? 
          <>
            <SchedulerTable array={bookings}/>
          </> 
            :
          (
            <p>Sem Reservas</p>
          )}
      </div>
    </div>
  )
}

export default Scheduler

// Scheduler.js
import React, { useEffect, useRef, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./scheduler.scss"; // Custom styling
import SchedulerTable from "./SchedulerTable";

const Scheduler = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedLocal, setSelectedLocal] = useState(null);
  const selectRef = useRef(null);

  useEffect(() => {
    if (selectRef.current) {
      setSelectedLocal(selectRef.current.options[0].value);
    }
  }, []);

  const [bookings, setBookings] = useState([]);

  const handleBooking = () => {
    if (!selectedDate || !selectedTime) {
      alert("Você deve selecionar uma Data e Horário");
      return;
    }

    const newBooking = {
      date: selectedDate.toLocaleDateString("pt-BR"),
      time: selectedTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      local: selectedLocal,
    };

    setBookings((prevBookings) => [...prevBookings, newBooking]);
    setSelectedDate(null);
    setSelectedTime(null);
  };

  const deleteBooking = (index) => {
    const temp = JSON.parse(localStorage.getItem("currentUser"));
    console.log('btn deletar')
    const updatedBookings = bookings.filter((_, i) => i !== index);
    temp.agendamentos = updatedBookings
    localStorage.setItem('currentUser', JSON.stringify(temp))
    setBookings(updatedBookings);
  };

  useEffect(() => {
    const temp = JSON.parse(localStorage.getItem("currentUser"));
    if (temp) {
      setBookings(temp.agendamentos);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("bookings", JSON.stringify(bookings));
    console.log('agendamentos: ', bookings)
  }, [bookings]);

  return (
    <div className="scheduler">
      <div className="booking-list">
        <h2>Suas Reservas:</h2>
        {bookings.length > 0 ? (
          <SchedulerTable array={bookings} deleteBooking={deleteBooking} />
        ) : (
          <p>Sem Reservas</p>
        )}
      </div>
    </div>
  );
};

export default Scheduler;

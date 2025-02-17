// Scheduler.js
import React, { useEffect, useRef, useState } from "react"
import "react-datepicker/dist/react-datepicker.css"
import "./scheduler.scss"
import SchedulerTable from "./SchedulerTable"

const Scheduler = () => {
  const [selectedDate, setSelectedDate] = useState(null)
  const [selectedTime, setSelectedTime] = useState(null)
  const [selectedLocal, setSelectedLocal] = useState(null)
  const selectRef = useRef(null)

  useEffect(() => {
    if (selectRef.current) {
      setSelectedLocal(selectRef.current.options[0].value)
    }
  }, [])

  const [bookings, setBookings] = useState([])

  const handleBooking = () => {
    if (!selectedDate || !selectedTime) {
      alert("Você deve selecionar uma Data e Horário")
      return
    }

    const newBooking = {
      date: selectedDate.toLocaleDateString("pt-BR"),
      time: selectedTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      local: selectedLocal,
    }

    setBookings((prevBookings) => [...prevBookings, newBooking])
    setSelectedDate(null)
    setSelectedTime(null)
  }

  const deleteBooking = (index) => {
    const temp = JSON.parse(localStorage.getItem("currentUser"))
    const updatedBookings = temp.agendamentos.filter((_, i) => i !== index)
    const deletedBooking = temp.agendamentos[index]
    temp.agendamentos = updatedBookings
    localStorage.setItem('currentUser', JSON.stringify(temp))
    const localUsers = JSON.parse(localStorage.getItem('localUsers')) || []
    const userIndex = localUsers.findIndex(user => user.usuario === temp.usuario)
    if (userIndex !== -1) {
        localUsers[userIndex].agendamentos = updatedBookings
        localStorage.setItem('localUsers', JSON.stringify(localUsers))
    }
    const estabelecimentos = JSON.parse(localStorage.getItem('estabelecimentos')) || []
    const estabelecimentoIndex = estabelecimentos.findIndex(
        (estabelecimento) => estabelecimento.nome === deletedBooking.local
    )

    if (estabelecimentoIndex !== -1) {
        // Find the quadra that matches the deleted booking's quadra
        const quadraIndex = estabelecimentos[estabelecimentoIndex].quadras.findIndex(
            (quadra) => quadra.id === deletedBooking.quadra
        )

        if (quadraIndex !== -1) {
            // Filter out the deleted booking from the quadra's agendamentos
            const updatedQuadraAgendamentos = estabelecimentos[estabelecimentoIndex].quadras[
                quadraIndex
            ].agendamentos.filter(
                (agendamento) =>
                    agendamento.data !== deletedBooking.data ||
                    agendamento.hora !== deletedBooking.hora ||
                    agendamento.nomeAtleta !== deletedBooking.nomeAtleta
            )
            estabelecimentos[estabelecimentoIndex].quadras[quadraIndex].agendamentos =
                updatedQuadraAgendamentos
            localStorage.setItem('estabelecimentos', JSON.stringify(estabelecimentos))
        } else {
            console.error('Quadra not found with id:', deletedBooking.quadra)
        }
    } else {
        console.error('Estabelecimento not found with nome:', deletedBooking.local)
    }
    setBookings(updatedBookings)
}

  useEffect(() => {
    const temp = JSON.parse(localStorage.getItem("currentUser"))
    if (temp) {
      setBookings(temp.agendamentos)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("bookings", JSON.stringify(bookings))
    console.log('agendamentos: ', bookings)
  }, [bookings])

  return (
    <div className="scheduler">
      <div className="booking-list">
        {bookings.length > 0 ? (
          <SchedulerTable array={bookings} deleteBooking={deleteBooking} />
        ) : (
          <p>Sem Reservas</p>
        )}
      </div>
    </div>
  );
};

export default Scheduler

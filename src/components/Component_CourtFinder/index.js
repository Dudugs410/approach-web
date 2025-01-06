import React, { useEffect, useRef, useState } from "react"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"

import './courtfinder.scss'

const CourtFinder = () => {
    const [bookings, setBookings] = useState([]);
    const [searchType, setSearchType] = useState('nome'); // Default search type
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTime, setSelectedTime] = useState(null);
    const [selectedLocal, setSelectedLocal] = useState('');
  
    const handleSearch = () => {
      if (!searchQuery && searchType !== 'disponibilidade') {
        alert("Você deve fornecer um termo de busca");
        return;
      }
  
      let filteredResults = [];
      if (searchType === 'nome') {
        filteredResults = bookings.filter((booking) =>
          booking.local.toLowerCase().includes(searchQuery.toLowerCase())
        );
      } else if (searchType === 'localidade') {
        filteredResults = bookings.filter((booking) =>
          booking.local.toLowerCase().includes(searchQuery.toLowerCase())
        );
      } else if (searchType === 'disponibilidade') {
        if (!selectedDate || !selectedTime) {
          alert("Você deve selecionar uma Data e Horário para buscar por disponibilidade");
          return;
        }
  
        const selectedDateStr = selectedDate.toLocaleDateString('pt-BR');
        const selectedTimeStr = selectedTime.toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        });
  
        filteredResults = bookings.filter(
          (booking) =>
            booking.date === selectedDateStr && booking.time === selectedTimeStr
        );
      }
  
      console.log('Filtered Results:', filteredResults);
      alert(`Resultados encontrados: ${filteredResults.length}`);
    };
  
    useEffect(() => {
      const temp = JSON.parse(localStorage.getItem('bookings'));
      if (temp) {
        setBookings(temp);
      }
    }, []);

    useEffect(()=>{
      console.log('quadras? ', bookings)
    },[bookings])
  
    return (
      <div className="container mt-4 finder-container">
        <h1>Encontrar Quadras</h1>
  
        <div className="mb-3">
          <label className="form-label">Selecione o Tipo de Busca:</label>
          <div>
            <div className="form-check form-check-inline">
              <input
                type="radio"
                id="searchNome"
                name="searchType"
                value="nome"
                className="form-check-input"
                checked={searchType === 'nome'}
                onChange={(e) => setSearchType(e.target.value)}
              />
              <label className="form-check-label" htmlFor="searchNome">
                Por Nome
              </label>
            </div>
  
            <div className="form-check form-check-inline">
              <input
                type="radio"
                id="searchLocalidade"
                name="searchType"
                value="localidade"
                className="form-check-input"
                checked={searchType === 'localidade'}
                onChange={(e) => setSearchType(e.target.value)}
              />
              <label className="form-check-label" htmlFor="searchLocalidade">
                Por Localidade
              </label>
            </div>
  
            <div className="form-check form-check-inline">
              <input
                type="radio"
                id="searchDisponibilidade"
                name="searchType"
                value="disponibilidade"
                className="form-check-input"
                checked={searchType === 'disponibilidade'}
                onChange={(e) => setSearchType(e.target.value)}
              />
              <label className="form-check-label" htmlFor="searchDisponibilidade">
                Por Disponibilidade
              </label>
            </div>
          </div>
        </div>
  
        <div className="mb-3">
          <label className="form-label">Termo de Busca:</label>
          <input
            type="text"
            className="form-control"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            disabled={searchType === 'disponibilidade'}
          />
        </div>
  
        {searchType === 'disponibilidade' && (
          <div className="mb-3">
            <label className="form-label">Data:</label>
            <input
              type="date"
              className="form-control"
              onChange={(e) => setSelectedDate(new Date(e.target.value))}
            />
  
            <label className="form-label mt-2">Horário:</label>
            <input
              type="time"
              className="form-control"
              onChange={(e) => setSelectedTime(e.target.valueAsDate)}
            />
          </div>
        )}
  
        <button className="btn btn-primary" onClick={handleSearch}>
          Buscar
        </button>
      </div>
    );
  };


export default CourtFinder

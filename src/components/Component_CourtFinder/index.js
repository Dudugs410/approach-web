import React, { useEffect, useRef, useState } from "react"
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import { estabelecimentos } from "../../Mockups/quadras"

import './courtfinder.scss'

const CourtFinder = ({quadras, setQuadrasDisplay}) => {
    const [bookings, setBookings] = useState([]);
    const [searchType, setSearchType] = useState('nome'); // Default search type
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTime, setSelectedTime] = useState(null);
    const [selectedLocal, setSelectedLocal] = useState('');
  
    useEffect(() => {
      console.log('estabelecimentos: ', estabelecimentos)
    },[])

    const handleSearch = () => {
      if (!searchQuery && searchType !== 'disponibilidade') {
        alert("Você deve fornecer um termo de busca");
        return;
      }
  
      let filteredResults = [];
      if (searchType === 'nome') {
        filteredResults = estabelecimentos.filter((booking) =>
          booking.nome.toLowerCase().includes(searchQuery.toLowerCase())
        );
      } else if (searchType === 'localidade') {
        filteredResults = estabelecimentos.filter((booking) =>
          booking.nome.toLowerCase().includes(searchQuery.toLowerCase())
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
  
        filteredResults = estabelecimentos.filter(
          (booking) =>
            booking.date === selectedDateStr && booking.time === selectedTimeStr
        );
      }
  
      console.log('Filtered Results:', filteredResults);
      setQuadrasDisplay(filteredResults)
      alert(`Resultados encontrados: ${filteredResults.length}`);
    };

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
          </div>
        )}
  
        <button className="btn btn-primary" onClick={handleSearch}>
          Buscar
        </button>
      </div>
    );
  };


export default CourtFinder

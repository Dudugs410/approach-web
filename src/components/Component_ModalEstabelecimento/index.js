import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import DatePicker from 'react-date-picker';
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';
import './modalEstabelecimento.scss';

const ModalEstabelecimento = ({ estabelecimento, onClose }) => {
    const [selectedQuadra, setSelectedQuadra] = useState(null);
    const [quadrasOptions, setQuadrasOptions] = useState([]);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [timeSlots, setTimeSlots] = useState([]);

    useEffect(()=>{
        console.log('estabelecimento: ', estabelecimento)
      },[])

    // Generate time slots based on horarioFuncionamento
    const generateTimeSlots = (horarioFuncionamento, agendamentos) => {
        const [start, end] = horarioFuncionamento.split(' - ');
        const startHour = parseInt(start.split(':')[0]);
        const endHour = parseInt(end.split(':')[0]);

        const slots = [];
        for (let hour = startHour; hour < endHour; hour++) {
            const time = `${hour}:00`;
            const isBooked = agendamentos.some(
                (agendamento) =>
                    agendamento.data === selectedDate.toLocaleDateString('pt-BR') &&
                    agendamento.hora === time
            );
            slots.push({ time, isBooked });
        }
        return slots;
    };

    useEffect(() => {
        const options = estabelecimento.quadras.map((quadra) => ({
            label: quadra.id,
            value: quadra.id,
            id: quadra.id,
            descricao: quadra.descricao,
            precoHora: quadra.precoHora,
            agendamentos: quadra.agendamentos,
            horarioFuncionamento: estabelecimento.horarioFuncionamento,
        }));
        setQuadrasOptions(options);
    }, [estabelecimento]);

    const handleSelectedQuadra = (selected) => {
        setSelectedQuadra(selected);
    };

    useEffect(() => {
        if (selectedQuadra) {
            const slots = generateTimeSlots(
                selectedQuadra.horarioFuncionamento,
                selectedQuadra.agendamentos
            );
            setTimeSlots(slots);
        }
    }, [selectedQuadra, selectedDate]);

    
    const handleReserva = (horario) => {
        console.log('handleReserva');
        console.log('horario a reservar: ', horario, selectedDate.toLocaleDateString('pt-BR'));
    
        const user = JSON.parse(localStorage.getItem('currentUser'));
        const agendamento = {
            nomeAtleta: user.usuario,
            data: selectedDate.toLocaleDateString('pt-BR'), // format: dd/mm/yyyy
            hora: horario.time,
            local: estabelecimento.nome,
            quadra: selectedQuadra.label,
        };
    
        // Retrieve the estabelecimentos array from localStorage
        const estabelecimentos = JSON.parse(localStorage.getItem('estabelecimentos'));
    
        if (!estabelecimentos) {
            console.error("No estabelecimentos found in localStorage");
            return;
        }
    
        // Find the estabelecimento with the matching sigla
        const estabelecimentoTemp= estabelecimentos.find(e => e.sigla === estabelecimento.sigla);
    
        if (!estabelecimentoTemp) {
            console.error("Estabelecimento not found");
            return;
        }
    
        // Find the quadra with the matching id within the estabelecimento
        const quadra = estabelecimento.quadras.find(q => q.id === selectedQuadra.label);
    
        if (quadra) {
            console.log('Found quadra:', quadra);
    
            // Add the new agendamento to the quadra's agendamentos array
            quadra.agendamentos.push(agendamento);
            user.agendamentos.push(agendamento)
    
            console.log('Updated quadra agendamentos:', quadra.agendamentos);
    
            // Save the updated estabelecimentos array back to localStorage
            localStorage.setItem('estabelecimentos', JSON.stringify(estabelecimentos));
            localStorage.setItem('currentUser', JSON.stringify(user))
        } else {
            console.error('Quadra not found with id:', selectedQuadra.label);
        }
    };    

    return (
        <div className="container-estabelecimento">
            <div className="modal-background" onClick={onClose} />
            <div className="container-modal-estabelecimento-content">
                <hr className="hr-global" />
                <div className="title-modal-estabelecimento">
                    <img src={estabelecimento?.foto} alt="Court" />
                    <h1 className="title-global">{estabelecimento?.nome}</h1>
                </div>
                <hr className="hr-global" />
                <div className="modal-estabelecimento-select-container">
                    <Select
                        className="select"
                        value={selectedQuadra}
                        onChange={handleSelectedQuadra}
                        options={quadrasOptions}
                    />
                    <DatePicker
                        className="datepicker"
                        onChange={setSelectedDate}
                        value={selectedDate}
                        calendarClassName="custom-calendar"
                        clearIcon={null}
                        format="dd/MM/yyyy"
                        disabled={!selectedQuadra}
                    />
                </div>
                <hr className="hr-global" />
                <div className="selected-quadra-container">
                    {selectedQuadra ? (
                        <div className="container-quadra">
                            <div className="selected-quadra-content">
                                <p>
                                    <b>Quadra: </b>
                                    {selectedQuadra.id}
                                </p>
                                <p>
                                    <b>Descrição: </b>
                                    {selectedQuadra.descricao}
                                </p>
                                <p>
                                    <b>Preço/hora: </b>
                                    {selectedQuadra.precoHora}
                                </p>
                            </div>
                            <div className="selected-quadra-content">
                                <p>
                                    <b>Horários Disponíveis: </b>
                                </p>
                                <div className="time-slot-container">
                                    {timeSlots.map((slot, index) => (
                                        <div key={index} className="time-slot">
                                            <span className={slot.isBooked ? 'booked' : ''}>
                                                {slot.time}
                                            </span>
                                            <button
                                                className="btn btn-reservar"
                                                disabled={slot.isBooked}
                                                onClick={() => handleReserva(slot)} // Pass the slot as an argument
                                            >
                                                Reservar
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="selected-quadra-content">
                            <p style={{ textAlign: 'center' }}>
                                Selecione uma quadra para exibir os horários
                                disponíveis
                            </p>
                        </div>
                    )}
                </div>
                <hr className="hr-global" />
            </div>
        </div>
    );
};

export default ModalEstabelecimento;

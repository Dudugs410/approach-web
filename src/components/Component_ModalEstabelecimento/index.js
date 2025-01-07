import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './modalEstabelecimento.scss';

const ModalEstabelecimento = ({ estabelecimento, onClose }) => {
    const [selectedQuadra, setSelectedQuadra] = useState({ label: 'selecione', value: 'selecione' });
    const [quadrasOptions, setQuadrasOptions] = useState([]);
    const [bookedSlots, setBookedSlots] = useState([]);
    const [selectedDate, setSelectedDate] = useState(null);
    const [workingHours, setWorkingHours] = useState([]);
    const [availableTimes, setAvailableTimes] = useState([]);

    // Fetch booked slots for the selected quadra
    const getBookedSlots = (quadraValue) => {
        const quadra = quadrasOptions.find((q) => q.value === quadraValue);
        return quadra
            ? quadra.agendamentos.map(({ data, hora }) => new Date(`${data}T${hora}:00`))
            : [];
    };

    const handleSelectedQuadra = (selected) => {
        setSelectedQuadra(selected);
        setBookedSlots(getBookedSlots(selected.value));

        const quadra = quadrasOptions.find((q) => q.value === selected.value);
        if (quadra && estabelecimento.horarioFuncionamento) {
            const { inicio, fim } = estabelecimento.horarioFuncionamento;
            const start = parseInt(inicio.split(':')[0], 10);
            const end = parseInt(fim.split(':')[0], 10);
            const hours = Array.from({ length: end - start + 1 }, (_, i) => `${start + i}:00`);
            setWorkingHours(hours);
        }
    };

    // Disable booked dates
    const isTileDisabled = ({ date }) =>
        bookedSlots.some((slot) => slot.toDateString() === date.toDateString());

    // Generate available times for the selected date
    useEffect(() => {
        if (!selectedDate || workingHours.length === 0) {
            setAvailableTimes([]); // Clear available times if dependencies are missing
            return;
        }

        // Map working hours with booked slots for the selected date
        const bookedHours = bookedSlots
            .filter((slot) => slot.toDateString() === selectedDate.toDateString())
            .map((slot) => slot.getHours());

        const times = workingHours.map((time) => {
            const hour = parseInt(time.split(':')[0], 10);
            return {
                time,
                disabled: bookedHours.includes(hour),
            };
        });

        setAvailableTimes(times);
    }, [selectedDate, workingHours, bookedSlots]);

    // Prepare quadra options from `estabelecimento` data
    useEffect(() => {
        const options = estabelecimento.quadras.map((quadra) => ({
            label: quadra.id,
            value: quadra.id,
            agendamentos: quadra.agendamentos,
        }));
        setQuadrasOptions(options);
    }, [estabelecimento]);

    return (
        <div className="container-estabelecimento">
            <div className="modal-background" onClick={onClose} />
            <div className="container-modal-estabelecimento-content">
                <hr className="hr-global" />
                <div className="title-modal-estabelecimento">
                    <img src={estabelecimento.foto} alt="Court" />
                    <h1 className="title-global">{estabelecimento.nome}</h1>
                </div>
                <hr className="hr-global" />
                <div className="modal-estabelecimento-select-container">
                    <Select
                        className="select"
                        aria-label="Quadra select"
                        value={selectedQuadra}
                        onChange={handleSelectedQuadra}
                        options={quadrasOptions}
                    />
                </div>
                <hr className="hr-global" />
                <div className="selected-quadra-container">
                    {selectedQuadra.value !== 'selecione' ? (
                        <div className="selected-quadra-content">
                            <div className="content">
                                <h2>Selecione uma Data</h2>
                                <Calendar
                                    tileDisabled={isTileDisabled}
                                    onChange={setSelectedDate}
                                />
                            </div>
                            {selectedDate && (
                                <div className="content">
                                    <h2>Selecione um horário</h2>
                                    <div className="time-picker">
                                        {availableTimes.map(({ time, disabled }) => (
                                            <button
                                                key={time}
                                                disabled={disabled}
                                                className={`time-slot ${disabled ? 'disabled' : ''}`}
                                            >
                                                {time}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="selected-quadra-content">
                            <p>Selecione uma quadra para exibir mais opções</p>
                        </div>
                    )}
                </div>
                <hr className="hr-global" />
            </div>
        </div>
    );
};

export default ModalEstabelecimento;

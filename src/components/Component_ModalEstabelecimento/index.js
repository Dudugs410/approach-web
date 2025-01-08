import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import { Scheduler } from '@aldabil/react-scheduler';
import './modalEstabelecimento.scss';

// Mockup Data (fallback if local storage is empty)
const mockData = {
    estabelecimento: {
        id: 1,
        nome: 'Complexo Esportivo',
        foto: 'complexo.jpg',
        quadras: [
            {
                id: 'quadra-1',
                descricao: 'Quadra 1',
                agendamentos: [
                    { data: '08/01/2025', hora: '10:00', usuario: 'John Doe' },
                    { data: '08/01/2025', hora: '15:00', usuario: 'Jane Doe' },
                ],
            },
            {
                id: 'quadra-2',
                descricao: 'Quadra 2',
                agendamentos: [],
            },
        ],
    },
};

const ModalEstabelecimento = ({ onClose }) => {
    const [selectedQuadra, setSelectedQuadra] = useState(null);
    const [quadrasOptions, setQuadrasOptions] = useState([]);
    const [events, setEvents] = useState([]);
    const [estabelecimento, setEstabelecimento] = useState(null);

    useEffect(() => {
        const storedData = JSON.parse(localStorage.getItem('estabelecimento')) || mockData.estabelecimento;
        setEstabelecimento(storedData);

        const options = storedData.quadras.map((quadra) => ({
            label: quadra.descricao,
            value: quadra.id,
            agendamentos: quadra.agendamentos,
        }));
        setQuadrasOptions(options);
    }, []);

    const handleSelectedQuadra = (selected) => {
        setSelectedQuadra(selected);
        if (selected) {
            generateAvailableSlots(selected.agendamentos);
        }
    };

    const generateAvailableSlots = (bookedSlots) => {
        const startTime = 9; // Start of working hours (9 AM)
        const endTime = 21; // End of working hours (9 PM)
        const today = new Date();

        const slots = [];
        for (let hour = startTime; hour < endTime; hour++) {
            const timeSlot = new Date(today.getFullYear(), today.getMonth(), today.getDate(), hour, 0);
            const timeSlotString = timeSlot.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

            const isBooked = bookedSlots.some(
                (booking) =>
                    booking.data === timeSlot.toLocaleDateString('pt-BR') &&
                    booking.hora === timeSlotString
            );

            if (!isBooked) {
                slots.push({
                    title: 'Disponível',
                    start: timeSlot,
                    end: new Date(timeSlot.getTime() + 60 * 60 * 1000), // 1-hour slot
                });
            }
        }

        setEvents(slots);
    };

    const handleEventAdd = (event) => {
        const userData = JSON.parse(localStorage.getItem('usuario')) || { usuario: 'Guest' };
        const { usuario } = userData;

        // Format the booking data
        const data = event.start.toLocaleDateString('pt-BR'); // e.g., DD/MM/YYYY
        const hora = event.start.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

        // Add the booking
        const updatedQuadras = estabelecimento.quadras.map((quadra) => {
            if (quadra.id === selectedQuadra.value) {
                return {
                    ...quadra,
                    agendamentos: [...quadra.agendamentos, { data, hora, usuario }],
                };
            }
            return quadra;
        });

        const updatedEstabelecimento = { ...estabelecimento, quadras: updatedQuadras };
        setEstabelecimento(updatedEstabelecimento);
        localStorage.setItem('estabelecimento', JSON.stringify(updatedEstabelecimento));

        // Refresh available slots
        generateAvailableSlots(updatedQuadras.find((quadra) => quadra.id === selectedQuadra.value).agendamentos);
        return event;
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
                </div>
                <hr className="hr-global" />
                <div className="selected-quadra-container">
                    {selectedQuadra ? (
                        <Scheduler
                            events={events}
                            view="day"
                            onEventAdd={handleEventAdd}
                            editable={false} // Prevent editing
                            deletable={false} // Prevent deleting
                            disableEventCreation={false} // Allow adding new bookings
                        />
                    ) : (
                        <div className="selected-quadra-content">
                            <p>Selecione uma quadra para exibir os horários disponíveis</p>
                        </div>
                    )}
                </div>
                <hr className="hr-global" />
            </div>
        </div>
    );
};

export default ModalEstabelecimento;

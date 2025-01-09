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

    useEffect(() => {
        console.log('estabelecimento: ', estabelecimento)
        const options = estabelecimento.quadras.map((quadra) => ({
            label: quadra.id,
            value: quadra.id,
            id: quadra.id,
            descricao: quadra.descricao,
            precoHora: quadra.precoHora,
            agendamentos: quadra.agendamentos,
        }));
        setQuadrasOptions(options);
    }, []);

    const handleSelectedQuadra = (selected) => {
        setSelectedQuadra(selected);
    };

    //checar horários indisponíveis

    const checkUnavailable = () => {

    }

    useEffect(()=>{
        if(selectedQuadra){
            console.log('Quadra Selecionada: ', selectedQuadra)
        }
    },[selectedQuadra])

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
                        onChange={setSelectedDate}
                        value={selectedDate}
                        calendarClassName="custom-calendar" // Optional: Add custom styles
                        clearIcon={null} // Removes the clear button
                        format="dd-mm-yyyy" // Example date format
                    />
                </div>
                <hr className="hr-global" />
                <div className="selected-quadra-container">
                    {selectedQuadra ? (
                        <div className='container-quadra'>
                            <div className='selected-quadra-content'>
                                <p><b>Quadra: </b>{selectedQuadra.id}</p>
                                <p><b>Descrição: </b>{selectedQuadra.descricao}</p>
                                <p><b>Preço/hora: </b>{selectedQuadra.precoHora}</p>
                            </div>
                            <div className='selected-quadra-content'>
                                <p><b>Horários Disponíveis: </b></p>
                                <p>teste</p>
                            </div>
                        </div>
                    ) : (
                        <div className="selected-quadra-content">
                            <p style={{'textAlign': 'center'}}>Selecione uma quadra para exibir os horários disponíveis</p>
                        </div>
                    )}
                </div>
                <hr className="hr-global" />
            </div>
        </div>
    );
};

export default ModalEstabelecimento;

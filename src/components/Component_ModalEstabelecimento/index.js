import React, { useEffect, useState } from 'react'
import Select from 'react-select'
import './modalEstabelecimento.scss'


const ModalEstabelecimento = ({ estabelecimento, onClose }) => {

    const [selectedQuadra, setSelectedQuadra] = useState({label: 'selecione', value: 'selecione'})

    const [quadrasOptions, setQuadrasOptions] = useState([])

    const handleSelectedQuadra = (selected) => {
        setSelectedQuadra(selected)
    }

    useEffect(()=>{
        let arrayTemp = []
        estabelecimento.quadras.forEach(quadra => {
            let temp = {
                label: quadra.id,
                value: quadra.id
            }
            arrayTemp.push(temp)
        });
        setQuadrasOptions(arrayTemp)
    },[])

    useEffect(()=>{
        console.log('Quadras: ', quadrasOptions)
    },[quadrasOptions])

    return (
        <div className="container-estabelecimento">
            <div className='modal-background' onClick={onClose}/>
            <div className='container-modal-estabelecimento-content'>
                <hr className='hr-global'/>
                <div className='title-modal-estabelecimento'>
                    <img src={estabelecimento.foto} alt="Court" /><h1 className='title-global'>{estabelecimento.nome}</h1>
                </div>
                <hr className='hr-global'/>
                <div className='modal-estabelecimento-select-container'>
                    <div className='select-container'>
                        <Select 
                            className="select" 
                            aria-label="Large select example"
                            value={selectedQuadra}
                            onChange={handleSelectedQuadra}
                            options={quadrasOptions}
                        />
                    </div>
                    <div className='select-container'>
                        <Select 
                            className="select" 
                            aria-label="Large select example"
                            value={selectedQuadra}
                            onChange={handleSelectedQuadra}
                            options={quadrasOptions}
                        />
                    </div>
                </div>
                <hr className='hr-global'/>
            </div>
        </div>
    );
};
 
export default ModalEstabelecimento;

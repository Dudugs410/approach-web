import React, { useState } from 'react';

import GoBack from '../../components/Component_GoBack';

import { estabelecimentos } from '../../Mockups/quadras';
import CourtCard from '../../components/Component_CourtCard';

import '../03 - Agenda/agenda.scss';
import './quadras.scss'

const EncontreQuadras = () => {

    const [quadrasDisplay, setQuadrasDisplay] = useState(estabelecimentos)

    return (
        <div className="container mt-5 container-quadras">
            <GoBack route='/dashboard' />
            <hr className='hr-global'/>
            <h1 className='title-global'>Quadras</h1>
            <hr className='hr-global'/>
            {quadrasDisplay.map((court, index) => (
              <CourtCard key={index} court={court}/>
            ))}
        </div>
    );
};

export default EncontreQuadras;

import React, { useEffect, useState } from 'react';

import CourtFinder from '../../components/Component_CourtFinder';
import GoBack from '../../components/Component_GoBack';

import { estabelecimentos } from '../../Mockups/quadras';
import CourtCard from '../../components/Component_CourtCard';

import '../03 - Agenda/agenda.scss';
import './quadras.scss'

const EncontreQuadras = () => {

    const quadrasExistentes = estabelecimentos

    const [quadrasDisplay, setQuadrasDisplay] = useState(estabelecimentos)

    return (
        <div className="container mt-5 container-quadras">
            <GoBack route='/dashboard' />
            <hr className='hr-global'/>
            <h1 className='title-global'>Quadras</h1>
            <hr className='hr-global'/>
            {/*<CourtFinder setQuadrasDisplay={setQuadrasDisplay} />*/}
            {quadrasDisplay.map((court) => (
              <CourtCard key={court.id} court={court}/>
            ))}
        </div>
    );
};

export default EncontreQuadras;

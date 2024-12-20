import React from 'react';

import CourtFinder from '../../components/Component_CourtFinder';
import GoBack from '../../components/Component_GoBack';

import { estabelecimentos } from '../../Mockups/quadras';
import CourtCard from '../../components/Component_CourtCard';

import '../03 - Agenda/agenda.scss';
import './quadras.scss'

const EncontreQuadras = () => {
    return (
        <div className="container mt-5 container-quadras">
            <GoBack route='/dashboard' />
            <CourtFinder />
            {estabelecimentos.map((court) => (
                <CourtCard key={court.id} court={court} />
            ))}
        </div>
    );
};

export default EncontreQuadras;

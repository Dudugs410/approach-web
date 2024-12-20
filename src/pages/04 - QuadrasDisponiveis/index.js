import React from 'react';

import '../03 - Agenda/agenda.scss';

import CourtFinder from '../../components/Component_CourtFinder';
import GoBack from '../../components/Component_GoBack';

import { estabelecimentos } from '../../Mockups/quadras';
import CourtCard from '../../components/Component_CourtCard';

const EncontreQuadras = () => {
    return (
        <div className="container mt-5">
            <GoBack route='/dashboard' />
            <CourtFinder />
            {estabelecimentos.map((court) => (
                <CourtCard key={court.id} court={court} />
            ))}
        </div>
    );
};

export default EncontreQuadras;

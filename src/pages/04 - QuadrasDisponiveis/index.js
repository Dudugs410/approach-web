import React, { useEffect, useState } from 'react';

import CourtFinder from '../../components/Component_CourtFinder';
import GoBack from '../../components/Component_GoBack';

import { estabelecimentos } from '../../Mockups/quadras';
import CourtCard from '../../components/Component_CourtCard';

import '../03 - Agenda/agenda.scss';
import './quadras.scss'

const EncontreQuadras = () => {

    const [data, setData] = useState([]);

    useEffect(() => {
      // Check if data is already stored in localStorage
      const storedData = localStorage.getItem('estabelecimentos');
      
      if (storedData) {
        // If data exists, parse it and set it to state
        setData(JSON.parse(storedData));
      } else {
        // If data doesn't exist, use the mockup data and store it in localStorage
        setData(estabelecimentos);
        localStorage.setItem('estabelecimentos', JSON.stringify(estabelecimentos));
      }
    }, []);

    return (
        <div className="container mt-5 container-quadras">
            <GoBack route='/dashboard' />
            <CourtFinder />
            {data.map((court) => (
                <CourtCard key={court.id} court={court} />
            ))}
        </div>
    );
};

export default EncontreQuadras;

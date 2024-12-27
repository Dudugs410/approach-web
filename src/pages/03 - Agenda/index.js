import React from 'react';

import '../04 - QuadrasDisponiveis/quadras.scss'
import './agenda.scss'
import Scheduler from '../../components/Component_Scheduler';
import GoBack from '../../components/Component_GoBack';

const Agenda = () => {
    return (
        <div className="container mt-5 container-quadras">
            <GoBack route='/dashboard'/>
            <Scheduler/>
        </div>
    );
};


export default Agenda;

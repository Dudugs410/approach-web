import React from 'react';

import './agenda.scss'
import Scheduler from '../../components/Component_Scheduler';
import GoBack from '../../components/Component_GoBack';

const Agenda = () => {
    return (
        <div className="container mt-5">
            <GoBack route='/dashboard'/>
           <Scheduler/>
        </div>
    );
};


export default Agenda;

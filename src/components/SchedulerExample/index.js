import React, { useState } from "react";
import { Scheduler } from "@aldabil/react-scheduler";

// Example data for the `estabelecimento` object
const estabelecimento = {
  nome: "Estabelecimento 1",
  horariosFuncionamento: {
    inicio: "08:00",
    fim: "20:00",
  },
  quadras: [
    {
      id: "Quadra 1",
      agendamentos: [
        { data: "2025-01-08", hora: "09:00" },
        { data: "2025-01-08", hora: "10:00" },
      ],
    },
    {
      id: "Quadra 2",
      agendamentos: [],
    },
  ],
};

const SchedulerExample = () => {
  const [selectedQuadra, setSelectedQuadra] = useState(estabelecimento.quadras[0]);

  // Convert working hours to Scheduler's `resources` format
  const workingHours = estabelecimento.horariosFuncionamento;
  const generateAvailableHours = () => {
    const start = parseInt(workingHours.inicio.split(":")[0]);
    const end = parseInt(workingHours.fim.split(":")[0]);

    return Array.from({ length: end - start }, (_, i) => ({
      id: `${start + i}:00`,
      text: `${start + i}:00`,
    }));
  };

  // Convert agendamentos to Scheduler's `events` format
  const generateEvents = () => {
    return selectedQuadra.agendamentos.map((agendamento) => ({
      event_id: `${agendamento.data}-${agendamento.hora}`,
      title: "Reservado",
      start: new Date(`${agendamento.data}T${agendamento.hora}:00`),
      end: new Date(`${agendamento.data}T${parseInt(agendamento.hora.split(":")[0]) + 1}:00`),
    }));
  };

  return (
    <div>
      <h1>Scheduler for {selectedQuadra.id}</h1>
      {/* Select Quadra */}
      <div style={{ marginBottom: "1rem" }}>
        <label>Select Quadra: </label>
        <select
          onChange={(e) => {
            const selected = estabelecimento.quadras.find((q) => q.id === e.target.value);
            setSelectedQuadra(selected);
          }}
          value={selectedQuadra.id}
        >
          {estabelecimento.quadras.map((quadra) => (
            <option key={quadra.id} value={quadra.id}>
              {quadra.id}
            </option>
          ))}
        </select>
      </div>

      {/* Scheduler */}
      <Scheduler
        view="week"
        events={generateEvents()}
        resources={[
          {
            field: "time",
            data: generateAvailableHours(),
            multiple: false,
          },
        ]}
        fields={[
          {
            name: "time",
            type: "select",
            options: generateAvailableHours(),
            config: { label: "Available Times" },
          },
        ]}
        onEventAdd={(event) => {
          alert(`New event added: ${JSON.stringify(event)}`);
        }}
        onEventDelete={(id) => {
          alert(`Event deleted: ${id}`);
        }}
        onEventUpdate={(event) => {
          alert(`Event updated: ${JSON.stringify(event)}`);
        }}
      />
    </div>
  );
};

export default SchedulerExample;

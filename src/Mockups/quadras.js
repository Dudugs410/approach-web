// Import mockup assets
import GNU from '../assets/mockups/logo-gnu.svg';
import BS from '../assets/mockups/beachsports.png';
import HRD from '../assets/mockups/cropped-logo-herold.jpg';
import TFT from '../assets/mockups/logo_tresfigueiras_tenis_clube.png';
import OBF from '../assets/mockups/openbeachfloresta.png';
import TJB from '../assets/mockups/TenisJdBotanico.png';

const currentDate = new Date();
const currentMonth = currentDate.getMonth() + 1; // Ensure month is 1-based (1 for January, 2 for February)
const currentYear = currentDate.getFullYear();

// Reusable function to generate horarios for a day
function generateHorarios() {
  const hours = [];
  for (let i = 9; i <= 21; i++) {
    const hour = `${i}:00`;
    hours.push({
      horario: hour,
      disponivel: false, // Set all horarios as unavailable initially
    });
  }
  return hours;
}

// Function to get days and horarios for a specific month
function getDaysInMonth(month, year) {
  const daysInMonth = new Date(year, month, 0).getDate(); // Get number of days in the month
  const daysArray = [];

  for (let i = 1; i <= daysInMonth; i++) {
    daysArray.push({
      day: i.toString(), // Convert day to string
      horarios: generateHorarios(), // Generate horarios for each day
    });
  }

  return daysArray;
}

// Define an array of establishments with detailed properties
export const estabelecimentos = [
  {
    nome: 'Grêmio Náutico União',
    sigla: 'GNU',
    cnpj: '123456789/0001',
    foto: GNU,
    agendamentosMarcados: [
      {
        nomeAtleta: 'Teste Atleta',
        data: '21/12/2024',
        hora: '10:00',
      },
    ],
    horarios: getDaysInMonth(currentMonth, currentYear), // Use reusable logic for horarios
    horarioFuncionamento: '9:00 - 21:00',
    endereco: 'Rua dos Remadores, 123, Porto Alegre, RS',
  },
  {
    nome: 'Beach Sports',
    sigla: 'BS',
    cnpj: '123456789/0002',
    foto: BS,
    agendamentosMarcados: [],
    horarios: getDaysInMonth(currentMonth, currentYear),
    horarioFuncionamento: '9:00 - 21:00',
    endereco: 'Av. das Areias, 456, Florianópolis, SC',
  },
  {
    nome: 'Herold Tennis',
    sigla: 'HRD',
    cnpj: '123456789/0003',
    foto: HRD,
    agendamentosMarcados: [],
    horarios: getDaysInMonth(currentMonth, currentYear),
    horarioFuncionamento: '9:00 - 21:00',
    endereco: 'Rua dos Tenistas, 789, Curitiba, PR',
  },
  {
    nome: 'Três Figueiras Tênis Clube',
    sigla: 'TFT',
    cnpj: '123456789/0004',
    foto: TFT,
    agendamentosMarcados: [],
    horarios: getDaysInMonth(currentMonth, currentYear),
    horarioFuncionamento: '9:00 - 21:00',
    endereco: 'Rua Figueira, 321, Porto Alegre, RS',
  },
  {
    nome: 'Open Beach Floresta',
    sigla: '',
    cnpj: '123456789/0005',
    foto: OBF,
    agendamentosMarcados: [],
    horarios: getDaysInMonth(currentMonth, currentYear),
    horarioFuncionamento: '9:00 - 21:00',
    endereco: 'Av. Floresta, 654, Balneário Camboriú, SC',
  },
  {
    nome: 'Tênis Jardim Botânico',
    sigla: 'TJB',
    cnpj: '123456789/0006',
    foto: TJB,
    agendamentosMarcados: [],
    horarios: getDaysInMonth(currentMonth, currentYear),
    horarioFuncionamento: '9:00 - 21:00',
    endereco: 'Rua Botânico, 987, Rio de Janeiro, RJ',
  },
];


// Import mockup assets
import GNU from '../assets/mockups/logo-gnu.svg';
import BS from '../assets/mockups/beachsports.png';
import HRD from '../assets/mockups/cropped-logo-herold.jpg';
import TFT from '../assets/mockups/logo_tresfigueiras_tenis_clube.png';
import OBF from '../assets/mockups/openbeachfloresta.png';
import TJB from '../assets/mockups/TenisJdBotanico.png';

// Define the default data for establishments
const defaultEstabelecimentos = [
  {
    nome: 'Grêmio Náutico União',
    sigla: 'GNU',
    cnpj: '123456789/0001',
    foto: GNU,
    quadras: [
      {
        id: 'quadra01',
        descricao: 'interna',
        precoHora: 'R$ 90,00',
        agendamentos: [
          {
            nomeAtleta: 'Teste Atleta',
            data: '21/12/2024',
            hora: '10:00',
          },
        ],
      },
      {
        id: 'quadra02',
        descricao: 'externa',
        precoHora: 'R$ 90,00',
        agendamentos: [],
      },
      {
        id: 'quadra03',
        descricao: 'externa',
        precoHora: 'R$ 90,00',
        agendamentos: [],
      }
    ],
    horarioFuncionamento: '9:00 - 21:00',
    endereco: 'Rua dos Remadores, 123, Porto Alegre, RS',
    precoHora: 'R$ 90,00',
  },
  {
    nome: 'Beach Sports',
    sigla: 'BS',
    cnpj: '123456789/0002',
    foto: BS,
    quadras: [
      {
        id: 'quadra01',
        descricao: 'interna',
        precoHora: 'R$ 100,00',
        agendamentos: [],
      },
      {
        id: 'quadra02',
        descricao: 'externa',
        precoHora: 'R$ 100,00',
        agendamentos: [],
      },
      {
        id: 'quadra03',
        descricao: 'externa',
        precoHora: 'R$ 100,00',
        agendamentos: [],
      }
    ],
    horarioFuncionamento: '9:00 - 21:00',
    endereco: 'Av. das Areias, 456, Florianópolis, SC',
    precoHora: 'R$ 100,00',
  },
  {
    nome: 'Herold Tennis',
    sigla: 'HRD',
    cnpj: '123456789/0003',
    foto: HRD,
    quadras: [
      {
        id: 'quadra01',
        descricao: 'interna',
        precoHora: 'R$ 70,00',
        agendamentos: [],
      },
      {
        id: 'quadra02',
        descricao: 'externa',
        precoHora: 'R$ 70,00',
        agendamentos: [],
      },
      {
        id: 'quadra03',
        descricao: 'externa',
        precoHora: 'R$ 70,00',
        agendamentos: [],
      }
    ],
    horarioFuncionamento: '9:00 - 21:00',
    endereco: 'Rua dos Tenistas, 789, Curitiba, PR',
    precoHora: 'R$ 70,00',
  },
  {
    nome: 'Três Figueiras Tênis Clube',
    sigla: 'TFT',
    cnpj: '123456789/0004',
    foto: TFT,
    quadras: [
      {
        id: 'quadra01',
        descricao: 'interna',
        precoHora: 'R$ 95,00',
        agendamentos: [],
      },
      {
        id: 'quadra02',
        descricao: 'externa',
        precoHora: 'R$ 95,00',
        agendamentos: [],
      },
      {
        id: 'quadra03',
        descricao: 'externa',
        precoHora: 'R$ 95,00',
        agendamentos: [],
      }
    ],
    horarioFuncionamento: '9:00 - 21:00',
    endereco: 'Rua Figueira, 321, Porto Alegre, RS',
    precoHora: 'R$ 95,00',
  },
  {
    nome: 'Open Beach Floresta',
    sigla: '',
    cnpj: '123456789/0005',
    foto: OBF,
    quadras: [
      {
        id: 'quadra01',
        descricao: 'interna',
        precoHora: 'R$ 105,00',
        agendamentos: [],
      },
      {
        id: 'quadra02',
        descricao: 'externa',
        precoHora: 'R$ 105,00',
        agendamentos: [],
      },
      {
        id: 'quadra03',
        descricao: 'externa',
        precoHora: 'R$ 105,00',
        agendamentos: [],
      }
    ],
    horarioFuncionamento: '9:00 - 21:00',
    endereco: 'Av. Floresta, 654, Balneário Camboriú, SC',
    precoHora: 'R$ 105,00',
  },
  {
    nome: 'Tênis Jardim Botânico',
    sigla: 'TJB',
    cnpj: '123456789/0006',
    foto: TJB,
    quadras: [
      {
        id: 'quadra01',
        descricao: 'interna',
        precoHora: 'R$ 115,00',
        agendamentos: [],
      },
      {
        id: 'quadra02',
        descricao: 'externa',
        precoHora: 'R$ 115,00',
        agendamentos: [],
      },
      {
        id: 'quadra03',
        descricao: 'externa',
        precoHora: 'R$ 115,00',
        agendamentos: [],
      }
    ],
    horarioFuncionamento: '9:00 - 21:00',
    endereco: 'Rua Botânico, 987, Rio de Janeiro, RJ',
    precoHora: 'R$ 115,00',
  },
];

// Check localStorage and set `estabelecimentos`
export const estabelecimentos = (() => {
  const storedData = localStorage.getItem('estabelecimentos');
  if (storedData) {
    try {
      return JSON.parse(storedData);
    } catch (error) {
      console.error('Failed to parse stored data:', error);
    }
  }

  // Store default data in localStorage if not present
  localStorage.setItem('estabelecimentos', JSON.stringify(defaultEstabelecimentos));
  return defaultEstabelecimentos;
})();

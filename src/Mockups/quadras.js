
import GNU from '../assets/mockups/logo-gnu.svg';
import BS from '../assets/mockups/beachsports.png';
import HRD from '../assets/mockups/cropped-logo-herold.jpg';
import TFT from '../assets/mockups/logo_tresfigueiras_tenis_clube.png';
import OBF from '../assets/mockups/openbeachfloresta.png';
import TJB from '../assets/mockups/TenisJdBotanico.png';

export const estabelecimentos = [
    {
        nome: 'Gremio Nautico União',
        sigla: 'GNU',
        cnpj: '123456789/0001',
        foto: GNU,
        agendamentosMarcados: [
            {
                nomeAtleta: 'teste',
                data:'21/12/2024',
                hora:'10:30',
            }
        ],
        horarioFuncionamento: '9:00 - 21:00',
        endereco: 'Somewhere, 123/456',
    },

    {
        nome: 'Beach Sports',
        sigla: 'BS',
        cnpj: '123456789/0002',
        foto: BS,
        agendamentosMarcados: [
            {
                nomeAtleta: '',
                data:'',
                hora:'',
            }
        ],
        horarioFuncionamento: '9:00 - 21:00',
        endereco: 'Somewhere, 123/456',
    },

    {
        nome: 'Herold Tennis',
        sigla: 'HRD',
        cnpj: '123456789/0003',
        foto: HRD,
        agendamentosMarcados: [
            {
                nomeAtleta: '',
                data:'',
                hora:'',
            }
        ],
        horarioFuncionamento: '9:00 - 21:00',
        endereco: 'Somewhere, 123/456',
    },

    {
        nome: 'Três Figueiras Tenis Clube',
        sigla: 'TFT',
        cnpj: '123456789/0004',
        foto: TFT,
        agendamentosMarcados: [
            {
                nomeAtleta: '',
                data:'',
                hora:'',
            }
        ],
        horarioFuncionamento: '9:00 - 21:00',
        endereco: 'Somewhere, 123/456',
    },

    {
        nome: 'Open Beach Floresta',
        sigla: '',
        cnpj: '123456789/0005',
        foto: OBF,
        agendamentosMarcados: [
            {
                nomeAtleta: '',
                data:'',
                hora:'',
            }
        ],
        horarioFuncionamento: '9:00 - 21:00',
        endereco: 'Somewhere, 123/456',
    },

    {
        nome: 'Tenis Jardim Botânico',
        sigla: 'TJB',
        cnpj: '123456789/0006',
        foto: TJB,
        agendamentosMarcados: [
            {
                nomeAtleta: '',
                data:'',
                hora:'',
            }
        ],
        horarioFuncionamento: '9:00 - 21:00',
        endereco: 'Somewhere, 123/456',
    },

];
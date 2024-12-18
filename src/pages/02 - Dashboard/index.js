/* eslint-disable no-unused-vars */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable default-case */

import { useContext, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

import logo from '../../assets/approach.png'
import img01 from '../../assets/01.webp'
import img02 from '../../assets/02.jpg'
import img03 from '../../assets/03.jpg'
import img04 from '../../assets/04.webp'
import agendamentoCliente from '../../assets/agendaCliente.jpg'
import quadrasCliente from '../../assets/quadrasCliente.jpg'
import agendamento from '../../assets/agenda.jpg'
import quadras from '../../assets/quadras.jpg'
import ImageCarousel from '../../components/Component_ImgCarousel'
import Card from '../../components/Component_CardDashboard'

import { FiLogOut } from "react-icons/fi";

import './dashboard.scss'
import { AuthContext } from '../../contexts/auth'

const Dashboard = () => {
	const location = useLocation()
	const { userType, logout } = useContext(AuthContext)

	const images = [
		img01, img02, img03, img04
	  ];
	
	useEffect(()=>{
		console.log('userType: ', userType)
	},[])

	useEffect(() => {
		localStorage.setItem('currentPath', location.pathname)
	}, [location])

	const handleSair = () =>{
		logout()
	}

	return (
		<div className='default-page'>
			<div className='dashboard-container'>
				<div className='logout-btn-container'>
					<button 
						type='button' 
						className='btn btn-outline-danger btn-logout' 
						data-bs-toggle='tooltip' 
						data-bs-placement='left' 
						title='Sair'
						onClick={handleSair}>
						<FiLogOut/>
					</button>
				</div>
				<div className='img-dashboard-container'>
					<img src={logo} className='img-dashboard'/>
				</div>
				<ImageCarousel images={images} interval={7000} />
				{ userType === 'atleta' ? 
					<div className='dashboard-card-container'>
						<Card title={'Agendamentos'} p={'Visualize seus agendamentos'} image={agendamento} />
						<Card title={'Quadras'} p={'Encontre quadras disponíveis'} image={quadras} />
					</div>
					:
					<div className='dashboard-card-container'>
						<Card title={'Agendamentos'} p={'Visualize e gerencie agendamentos'} image={agendamentoCliente} />
						<Card title={'Gerenciar Quadras'} p={'Gerencie suas quadras'} image={quadrasCliente} />
					</div>
				}
			</div>
		</div>
	)
}

export default Dashboard

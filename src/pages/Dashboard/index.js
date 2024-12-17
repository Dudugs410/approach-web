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
import agendamento from '../../assets/agenda.jpg'
import quadras from '../../assets/quadras.jpg'
import ImageCarousel from '../../components/Component_ImgCarousel'
import Card from '../../components/Component_CardDashboard'

import './dashboard.scss'

const Dashboard = () => {
	const location = useLocation()

	const images = [
		img01, img02, img03, img04
	  ];
	
	useEffect(() => {
		localStorage.setItem('currentPath', location.pathname)
	}, [location])

	return (
		<div className='default-page'>
			<div className='dashboard-container'>
				<div className='img-dashboard-container'>
					<img src={logo} className='img-dashboard'/>
				</div>
				<ImageCarousel images={images} interval={7000} />
				<div className='dashboard-card-container'>
					<Card title={'Agendamentos'} p={'visualize seus agendamentos'} image={agendamento} />
					<Card title={'Quadras'} p={'encontre quadras disponíveis'} image={quadras} />
				</div>
			</div>
		</div>
	)
}

export default Dashboard

/* eslint-disable no-unused-vars */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable default-case */

import { useContext, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

const Dashboard = () => {
	const location = useLocation()
	
	useEffect(() => {
		localStorage.setItem('currentPath', location.pathname)
	}, [location])

	return (
		<>
			Dashboard
		</>  
	)
}

export default Dashboard

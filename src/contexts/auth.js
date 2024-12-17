/* eslint-disable react/prop-types */
/* eslint-disable default-case */
import React, { createContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export const AuthContext = createContext({})

function AuthProvider({ children }){

	const [userType, setUserType] = useState(null)
	const [isLoggedIn, setIsLoggedIn] = useState(false)

	const navigate = useNavigate()
	
	const login = async (user, pw) => {
		try {
			const log = async () => {
				if(user === 'atleta'){
					setUserType('atleta')
					console.log('loggou como atleta')
				} else if (user === 'cliente'){
					setUserType('cliente')
					console.log('loggou como cliente')
				} else {
					console.log('usuario invalido.(// atleta // ou // cliente //)')
					return
				}
				localStorage.setItem('isLoggedIn', true)
				localStorage.setItem('currentPath', '/dashboard')
				setIsLoggedIn(true)
				navigate('/dashboard')
			}
			await log()
		
		} catch (error) {
			console.log('error: ', error)
		}

	}

	function logout(){
		localStorage.clear()
		setIsLoggedIn(false)
		navigate('/')
	}

	return(
		<AuthContext.Provider
			value={{
				login, logout,
				isLoggedIn, setIsLoggedIn,
			}}
		>
			{children}
		</AuthContext.Provider>
	)
}

export default AuthProvider

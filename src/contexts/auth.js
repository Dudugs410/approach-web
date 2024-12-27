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
				if (user !== 'cliente' || user === 'cliente') {
					// Set user type and initialize currentUser
					const userType = user !== 'cliente' ? 'atleta' : 'cliente';
					setUserType(userType);
					localStorage.setItem('userType', userType);
	
					let currentUser = {
						usuario: user,
						tipo: userType,
						agendamentos: [],
					};
	
					// Retrieve localUsers from localStorage or initialize it if not present
					let localUsers = JSON.parse(localStorage.getItem('localUsers')) || [];
	
					// Check if the user already exists in localUsers
					const existingUser = localUsers.find((u) => u.usuario === user);
	
					if (existingUser) {
						// Load existing user data into currentUser
						currentUser = existingUser;
						console.log(`User ${user} loaded from localUsers`);
					} else {
						// Add currentUser to localUsers if it doesn't exist
						localUsers.push(currentUser);
						localStorage.setItem('localUsers', JSON.stringify(localUsers));
						console.log(`New user ${user} added to localUsers`);
					}
	
					// Save currentUser to localStorage
					localStorage.setItem('currentUser', JSON.stringify(currentUser));
	
					console.log(`Logged in as ${userType}`);
				} else {
					console.log('Invalid user type. Please use "atleta" or "cliente".');
					return;
				}
	
				// Set login state and navigate
				localStorage.setItem('isLoggedIn', true);
				localStorage.setItem('currentPath', '/dashboard');
	
				setIsLoggedIn(true);
				navigate('/dashboard');
			};
	
			await log();
		} catch (error) {
			console.log('Error during login: ', error);
		}
	};


	function updateUser(user) {
		// Save the updated user as the currentUser
		let currentUser = user;
		localStorage.setItem('currentUser', JSON.stringify(currentUser));
	
		// Retrieve the list of localUsers from localStorage or initialize it if not present
		let localUsers = JSON.parse(localStorage.getItem('localUsers')) || [];
	
		// Debug: Log current user and localUsers array
		console.log('Current User:', currentUser);
		console.log('Local Users (Before):', localUsers);
	
		// Find the index of the existing user in the localUsers array
		const existingUserIndex = localUsers.findIndex((u) => u.usuario === user.usuario);
	
		if (existingUserIndex !== -1) {
			// Replace the existing user with the updated user
			localUsers[existingUserIndex] = { ...localUsers[existingUserIndex], ...currentUser };
			console.log(`Updated user: ${user.usuario}`);
		} else {
			// Add the new user to the array
			localUsers.push(currentUser);
			console.log(`Added new user: ${user.usuario}`);
		}
	
		// Save the updated localUsers array back to localStorage
		localStorage.setItem('localUsers', JSON.stringify(localUsers));
	
		// Debug: Log updated localUsers array
		console.log('Local Users (After):', localUsers);
	}
	
	function logout(){
		let localUsers = []
		localUsers = JSON.parse(localStorage.getItem('localUsers'))
		localStorage.clear()
		setIsLoggedIn(false)
		setUserType(null)
		localStorage.setItem('localUsers', JSON.stringify(localUsers))
		navigate('/')
	}

	const schedule = (place, date) => {
		let agendamento = {
			local: place.nome,
			data: date.toLocaleDateString('pt-BR'),
			hora: date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
			endereco: place.endereco,
		}

		let currentUser = JSON.parse(localStorage.getItem('currentUser'))
		currentUser.agendamentos.push(agendamento)

		localStorage.setItem('currentUser', JSON.stringify(currentUser))
	}

	return(
		<AuthContext.Provider
			value={{
				login, logout, userType, setUserType,
				isLoggedIn, setIsLoggedIn,
				schedule, updateUser,
			}}
		>
			{children}
		</AuthContext.Provider>
	)
}

export default AuthProvider

/* eslint-disable react/prop-types */
/* eslint-disable default-case */
import React, { createContext, useState } from 'react'

export const AuthContext = createContext({})

function AuthProvider({ children }){

	const [userType, setUserType] = useState(null)
	
	const login = (user, pw) => {

		if(user === 'atleta'){
			
		} else if (user === 'cliente'){

		}
	}



	return(
		<AuthContext.Provider
			value={{}}
		>
			{children}
		</AuthContext.Provider>
	)
}

export default AuthProvider

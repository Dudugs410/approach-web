/* eslint-disable react/prop-types */
/* eslint-disable default-case */
import React, { createContext } from 'react'

export const AuthContext = createContext({})

function AuthProvider({ children }){
	return(
		<AuthContext.Provider
			value={{}}
		>
			{children}
		</AuthContext.Provider>
	)
}

export default AuthProvider

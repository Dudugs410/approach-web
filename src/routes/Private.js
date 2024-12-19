import React, { useContext, useEffect, useState } from 'react'
import Layout from '../components/Layout'
import { AuthContext } from '../contexts/auth'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'

export default function Private({ children }) {
  const { logout } = useContext(AuthContext)
	const location = useLocation()
	const navigate = useNavigate()

	const [userType, setUserType] = useState(null)
	
	useEffect(()=>{
		setUserType(localStorage.getItem('userType'))
		console.log('userType: ', localStorage.getItem('userType'))
	},[])

	useEffect(() => {
		localStorage.setItem('currentPath', location.pathname)
	}, [location])

  const logged = JSON.parse(localStorage.getItem('isLoggedIn'))

  useEffect(()=>{
    console.log('is Logged in? ', logged)
    if(logged !== true){
      navigate('/')
    }
  },[])

  if (logged) {
    return (
      <>
        <Layout>{children}</Layout>
      </>
    );
  } else {
    logout()
  }
  return null;
}

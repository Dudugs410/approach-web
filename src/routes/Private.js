import React, { useContext, useEffect, useState } from 'react'
import Layout from '../components/Layout'
import { AuthContext } from '../contexts/auth'
import { Navigate, useNavigate } from 'react-router-dom'

export default function Private({ children }) {
  const { logout } = useContext(AuthContext)

  const navigate = useNavigate()

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

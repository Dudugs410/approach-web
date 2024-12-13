import React, { useContext, useEffect, useState } from 'react'
import Layout from '../components/Layout'
import { AuthContext } from '../contexts/auth'
import { Navigate, useNavigate } from 'react-router-dom'

export default function Private({ children }) {
  const { logout } = useContext(AuthContext)

  const navigate = useNavigate()

  useEffect(()=>{
    console.log('is Logged in? ', localStorage.getItem('isLoggedIn'))
    if(localStorage.getItem('isLoggedIn') !== true){
      navigate('/')
    }
  },[])

  if (localStorage.getItem('isLoggedIn') === true) {
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

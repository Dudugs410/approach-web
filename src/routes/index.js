import React, { useEffect } from "react"
import { Route, Routes, useLocation, useNavigate } from "react-router-dom"
import Login from '../pages/Login'
import Private from "./Private"
import Dashboard from "../pages/Dashboard"

function RoutesApp() {
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    if(location.pathname !== '/'){
      localStorage.setItem('currentPath', location.pathname)
    } else {
      if(localStorage.getItem('isLoggedIn') && localStorage.getItem('isLoggedIn') === true){
        localStorage.setItem('currentPath', '/dashboard')
      }
    }

    if(localStorage.getItem('currentPath') === '/null') {
      localStorage.setItem('currentPath', '/dashboard')
    }
  }, [location.pathname])

  // Check and redirect to the saved path on load
  useEffect(() => {
    const savedPath = localStorage.getItem('currentPath')
    if (savedPath && savedPath !== location.pathname) {
      navigate(savedPath)
    }
  }, [])

  return (
    <Routes>
      <Route path='/' element={<Login />} />
      <Route path='/dashboard' element={<Private><Dashboard /></Private>}/>
    </Routes>
  )
}

export default RoutesApp
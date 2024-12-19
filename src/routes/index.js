import React, { useEffect } from "react"
import { Route, Routes, useLocation, useNavigate } from "react-router-dom"
import Login from '../pages/00 - Login'
import Dashboard from "../pages/02 - Dashboard"
import Private from "./Private"
import Agenda from "../pages/03 - Agenda"

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
      <Route path='/agenda' element={<Private><Agenda/></Private>}/>
      <Route path='/encontrequadras' element={<Private></Private>}/>
      <Route path='/agendamentos' element={<Private></Private>}/>
      <Route path='/gerenciarquadras' element={<Private></Private>}/>
    </Routes>
  )
}

export default RoutesApp
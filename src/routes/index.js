import React, { useEffect } from "react"
import { Route, Routes, useLocation, useNavigate } from "react-router-dom"
import Login from '../pages/Login'

function RoutesApp() {
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    if(location.pathname !== '/'){
      localStorage.setItem('currentPath', location.pathname)
    } else {
      if(localStorage.getItem('isSignedIn') && localStorage.getItem('isSignedIn') === true){
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
    </Routes>
  )
}

export default RoutesApp
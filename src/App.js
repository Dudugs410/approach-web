import 'bootstrap/dist/css/bootstrap.min.css'
import AuthProvider from './contexts/auth'
import { BrowserRouter } from 'react-router-dom'
import RoutesApp from './routes'
import React from 'react'
import { ToastContainer } from 'react-toastify'
import './index.scss'

function App() {

  return (
    <BrowserRouter basename='/approach'>
      <AuthProvider>
            <RoutesApp/>
      </AuthProvider>
      <ToastContainer
                position="bottom-right" // Set position to bottom right
                autoClose={5000} // Adjust as per your requirements
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
    </BrowserRouter>
  )
}

export default App
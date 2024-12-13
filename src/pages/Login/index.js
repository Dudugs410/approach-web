import React, { useContext, useEffect, useState } from "react"
import logoApproach from '../../assets/approach-login.png'
import './login.css'
import { AuthContext } from "../../contexts/auth"
import { useNavigate } from "react-router-dom"

const Login = () => {
    const { login, isLoggedIn, setIsLoggedIn } = useContext(AuthContext)
    const navigate = useNavigate()

    const [user, setUser] = useState('')
    const [pw, setPw] = useState('')

    const handleLogin = (e, user, pw) => {
        e.preventDefault()
        login(user, pw)
    }

    useEffect(()=>{
        if(localStorage.getItem('isLoggedIn')){
            setIsLoggedIn(JSON.parse(localStorage.getItem('isLoggedIn')))
        }
    },[])

    useEffect(()=>{
        if(isLoggedIn === true){
            const path = localStorage.getItem('currentPath')
            if(path !== '/'){
                navigate(`/${path}`)
            }
        }
    },[isLoggedIn])

    return(
        <div className='default-page'>
            <div className='body-login'>
                <div className='background-image'/>
                <form type='submit' className='form-login' onSubmit={(e)=>(handleLogin(e, user, pw))}>
                    <img className='img-form' src={logoApproach} alt='logo approach' />
                    <div className='input-container-login'>
                        <input type="text" className='form-control' placeholder="Username" aria-label="Username" aria-describedby="basic-addon1" value={user} onChange={(e) => setUser(e.target.value)}/>
                        <input type="password" className='form-control' placeholder="Password" aria-label="Username" aria-describedby="basic-addon1" value={pw} onChange={(e) => setPw(e.target.value)}/>
                    </div>
                    <hr className='hr-global' />
                    <div className='login-btn-container'>
                        <button className='btn btn-primary btn-login'>Login</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login
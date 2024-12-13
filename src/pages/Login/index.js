import React from "react"
import logoApproach from '../../assets/approach-login.png'
import './login.css'

const Login = () => {
    return(
        <div className='default-page'>
            <div className='body-login'>
                <div className='background-image'/>
                <form type='submit' className='form-login'>
                    <img className='img-form' src={logoApproach} alt='logo approach' />
                    <div className='input-container-login'>
                        <input type="text" className='form-control' placeholder="Username" aria-label="Username" aria-describedby="basic-addon1"/>
                        <input type="password" className='form-control' placeholder="Password" aria-label="Username" aria-describedby="basic-addon1"/>
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
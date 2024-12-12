import React from "react"
import './login.css'

const Login = () => {
    return(
        <div className='appPage'>
            <div className='body-login'> 
                <div className='bg-login'></div>
                <form type='submit' className='form-login'>
                    <div className='input-container-login'>
                        <input id='login' className='input-login' type='text' placeholder='usuário' />
                        <input id='senha' className='input-login' type='password' placeholder='senha' />
                        <hr className='hr-global' />
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login
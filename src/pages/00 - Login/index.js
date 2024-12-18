import React, { useContext, useEffect, useState } from 'react'
import logoApproach from '../../assets/approach-login.png'
import './login.css'
import { AuthContext } from '../../contexts/auth'
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const { login, isLoggedIn, setIsLoggedIn } = useContext(AuthContext)
    const navigate = useNavigate()

    const [user, setUser] = useState('')
    const [pw, setPw] = useState('')
    const [isSignUp, setIsSignUp] = useState(false)

    const [nome, setNome] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [tipo, setTipo] = useState('')

    const handleLogin = (e, user, pw) => {
        e.preventDefault();
        login(user, pw);
    };

    useEffect(() => {
        if (localStorage.getItem('isLoggedIn')) {
            setIsLoggedIn(JSON.parse(localStorage.getItem('isLoggedIn')));
        }
    }, []);

    useEffect(() => {
        if (isLoggedIn === true) {
            const path = localStorage.getItem('currentPath');
            if (path !== '/') {
                navigate(`/${path}`);
            }
        }
    }, [isLoggedIn]);

    const SignUp = () => {
    
        const navigate = useNavigate()
    
        const handleSubmit = () => {
            console.log('handleSubmit')
            let user = {
                nome: nome,
                username: username,
                password: password,
                tipo: tipo,
            }
    
            console.log('user: ', user)
            
            //let storageUsers = JSON.parse(localStorage.getItem('storageUsers'))
            //storageUsers.push(user)
    
            //localStorage.setItem('storageUsers', JSON.stringify(storageUsers))
            //navigate('/')

            setIsSignUp(false)
        }
    
        return(
            <div className='signup-container'>
                <h2 className='h2-signup'>Sign Up</h2>
                <hr className='hr-global'/>
                <form className='form-signup' onSubmit={handleSubmit}>
                    <div class="input-group mb-3">
                        <span class="input-group-text" id="basic-addon1">Nome Completo</span>
                        <input type="text" class="form-control" placeholder="Nome" aria-label="Nome" aria-describedby="basic-addon1" onChange={(e)=>{setNome(e.target.value)}}/>
                    </div>
                    <div class="input-group mb-3">
                        <span class="input-group-text" id="basic-addon1">Usuário</span>
                        <input type="text" class="form-control" placeholder="Usuário" aria-label="Username" aria-describedby="basic-addon1" onChange={(e)=>{setUsername(e.target.value)}}/>
                    </div>
                    <div class="input-group mb-3">
                        <span class="input-group-text" id="basic-addon1">Senha</span>
                        <input type="password" class="form-control" placeholder="Senha" aria-label="Senha" aria-describedby="basic-addon1" onChange={(e)=>{setPassword(e.target.value)}}/>
                    </div>
                    <div class="input-group mb-3">
                        <span class="input-group-text" id="basic-addon1">Confirme a Senha</span>
                        <input type="password" class="form-control" placeholder="Senha" aria-label="Senha" aria-describedby="basic-addon1" onChange={(e)=>{setPassword(e.target.value)}}/>
                    </div>
                    <div class="input-group mb-3">
                        <label class="input-group-text" for="inputGroupSelect01">Tipo de Usuário</label>
                        <select class="form-select" id="inputGroupSelect01" onChange={(e)=>{setTipo(e.target.value)}}>
                            <option selected value='atleta'>atleta</option>
                            <option value='cliente'>Estabelecimento</option>
                        </select>
                    </div>
                    <div className='btn-signup-container'>
                        <button type='submit' className='btn btn-primary btn-login'>Concluir</button>
                    </div>
                </form>
            </div>
        )
    }

    const handleNewUser = () => {
        setIsSignUp(true)
    };

    return (
        <div className="default-page">
            <div className="body-login">
                <div className="background-image" />
                <form
                    type="submit"
                    className={`form-login ${isSignUp ? 'slide-out' : ''}`} // Add the sliding class here
                    onSubmit={(e) => handleLogin(e, user, pw)}
                >
                    <img
                        className="img-form"
                        src={logoApproach}
                        alt="logo approach"
                    />
                    <div className="input-container-login">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Username"
                            aria-label="Username"
                            aria-describedby="basic-addon1"
                            value={user}
                            onChange={(e) => setUser(e.target.value)}
                        />
                        <input
                            type="password"
                            className="form-control"
                            placeholder="Password"
                            aria-label="Username"
                            aria-describedby="basic-addon1"
                            value={pw}
                            onChange={(e) => setPw(e.target.value)}
                        />
                    </div>
                    <hr className="hr-global" />
                    <div className="login-btn-container">
                        <button className="btn btn-primary btn-login">Login</button>
                        <p onClick={handleNewUser}>criar usuário</p>
                    </div>
                </form>
            </div>   
            <div className={`form-signup-container ${isSignUp ? 'show' : ''}`}>
                <SignUp />
            </div>
        </div>
    );
};

export default Login;

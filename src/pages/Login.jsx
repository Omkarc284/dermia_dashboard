import React from 'react';
import {useNavigate} from 'react-router-dom'
import './login.css'
import axios from 'axios';


async function LoginUser(credentials) {
    return axios.post('http://localhost:3120/admin/login', credentials)
}
const Login = () => {
    const getToken =() =>{
        const tokenString = window.sessionStorage.getItem('token')
        const userToken = JSON.parse(tokenString)
        return userToken?.token
    } 
    const navigate = useNavigate()
    const [token, setToken] = React.useState(getToken())
    const saveToken = userToken => {
        console.log(userToken)
        window.sessionStorage.setItem('token', JSON.stringify(userToken))
        setToken(userToken)
        console.log( window.sessionStorage.getItem('token'))
    }
    
    const [username, setUsername] = React.useState('')
    const [password, setPassword] = React.useState('')
    const handleSubmit = async (e) => {
        e.preventDefault()
        const response = await LoginUser({
            username: username,
            password: password
        })
        if(response.status < 300){
            saveToken(response.data.token)
            window.sessionStorage.setItem('username', JSON.stringify(username))
            navigate(`/dashboard`)
        }
        
    }
    
  return (
    <>
        <div className="rectangleDiv">
            <div className="logintitle">
                LOGIN TO YOUR ACCOUNT
            </div>
            <div className="loginsubtitle">
                <p>Login to have easy access to your appointments at all times</p>
            </div>
            <form onSubmit={handleSubmit} className='form'>
                <input type="text" className='email' placeholder='Username' required onChange={(e)=>{setUsername(e.target.value)}}/>
                <input type="password" className='password' placeholder='Password' required onChange={(e)=>{setPassword(e.target.value)}}/>
                <button type="submit" className='loginButton' >LOGIN</button>
            </form>
        </div>
    </>
  )
}


export default Login
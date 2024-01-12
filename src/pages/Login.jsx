import React from 'react'
import './login.css'

const Login = () => {
    const [username, setUsername] = React.useState('')
    const [password, setPassword] = React.useState('')
  return (
    <>
        <div className="rectangleDiv">
            <div className="logintitle">
                LOGIN TO YOUR ACCOUNT
            </div>
            <div className="loginsubtitle">
                <p>Login to have easy access to your appointments at all times</p>
            </div>
            <form onSubmit={()=> {console.log({username,password})}} className='form'>
                <input type="email" className='email' placeholder='Email Address' pattern='/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g' required onChange={(e)=>{setUsername(e.target.value)}}/>
                <input type="password" className='password' placeholder='Password' required onChange={(e)=>{setPassword(e.target.value)}}/>
                <button type="submit" className='loginButton' onClick={()=> {console.log({username,password})}}>LOGIN</button>
            </form>
        </div>
    </>
  )
}

export default Login
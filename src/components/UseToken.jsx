import React, {useState} from 'react'


const useToken = () => {
    const getToken =() =>{
        const tokenString = window.sessionStorage.getItem('token')
        const userToken = JSON.parse(tokenString)
        return userToken?.token
    } 

    const [token, setToken] = useState(getToken())
    const saveToken = userToken => {
        window.sessionStorage.setItem('token', JSON.stringify(userToken))
        setToken(userToken.token)
      }
      return {
        setToken: saveToken,
        token
      }
    }

export default useToken
import { createContext, useEffect, useState, useRef } from "react";
import { CreateSesssion } from "../services/Api";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {io} from 'socket.io-client'


export const AuthContext = createContext()

export const AuthContextProvider = ({children}) => {

    const navigate = useNavigate()

    const socket = useRef()

    const [user, setUser] = useState(null)
    const [loginError, setLoginError] = useState(null)
    const [loginLoading, setLoginLoading] = useState(false)
    const [loadingUser, setLoadingUser] = useState(true)

    useEffect(() => {
        setLoadingUser(true)
        let user = JSON.parse(localStorage.getItem("users"))
        let token = localStorage.getItem('token')
        if(user && token) {
            setUser(user)
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
        }
        setLoadingUser(false)
    }, [])

    useEffect(() => {
        socket.current = io("https://chat-pedromoore-websocket.glitch.me")
    }, [user])

    const login = async (email, password) => {
        setLoginLoading(true)
        CreateSesssion(email, password)
            .then(response => {
                setUser(response.data)
                localStorage.setItem('users', JSON.stringify(response.data))
                localStorage.setItem('token', response.data.token)
                axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`
                navigate("/")
            })   
            .catch(err => setLoginError(err.response.data))
            .finally(() => setLoginLoading(false))
    }

    const logout = () => {
        localStorage.removeItem('users')
        localStorage.removeItem('token')
        navigate("/login")
        axios.defaults.headers.common['Authorization'] = null    
    }

    return(
        <AuthContext.Provider value={{login, logout, user, socket, loginError, loginLoading, loadingUser}}>
            {children}
        </AuthContext.Provider>
    )
}
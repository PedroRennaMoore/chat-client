import React, { useContext, useEffect } from "react";
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom'
import { AuthContext, AuthContextProvider } from './contexts/auth';
import { FriendRequestContextProvider } from "./contexts/friendRequest";

import Messenger from "./pages/Messenger";
import Login from "./pages/Login";
import Register from "./pages/Register";

const AppRoutes = () => {

    function Private({children}) {
        
        const {loadingUser, user} = useContext(AuthContext)
        
        if(!loadingUser) {
            if(!user) {
                return <Navigate to="/login"/>
            } else {
                return children
            }
        }
    }

    return(
        <Router>
            <AuthContextProvider>
                <FriendRequestContextProvider>
                    <Routes>
                        <Route path="/" element={<Private><Messenger /></Private>}/>
                        <Route path="/login" element={<Login />}/>
                        <Route path="/register" element={<Register />}/> 
                    </Routes>
                </FriendRequestContextProvider>
            </AuthContextProvider>
        </Router>
    )
}

export default AppRoutes
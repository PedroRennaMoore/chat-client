import { createContext, useState } from "react";


export const FriendRequestContext = createContext()

export const FriendRequestContextProvider = ({children}) => {

    const [newRequest, setNewRequest] = useState(null)
    const [arriveNotification, setArriveNotification] = useState(null)
    const [arriveFriend, setArriveFriend] = useState(null)
    
    const handleNewRequest = () => {
        setNewRequest(Date.now())
    }

    const handleArriveNotification = () => {
        setArriveNotification(Date.now())
    }

    const handleArriveFriend = () => {
        setArriveFriend(Date.now())
    }

    return(
        <FriendRequestContext.Provider value={{handleNewRequest, newRequest, handleArriveNotification, arriveNotification, handleArriveFriend, arriveFriend}}>
            {children}
        </FriendRequestContext.Provider>
    )
}
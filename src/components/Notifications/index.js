import { useContext, useEffect, useState, useRef } from "react"
import "./index.css"
import { AuthContext } from "../../contexts/auth"
import { getFriendsRequest } from "../../services/Api"
import FriendRequests from "../FriendRequests"
import { FriendRequestContext } from "../../contexts/friendRequest";

const Notifications = ({sendNotificationLength}) => {

    const {newRequest, arriveNotification} = useContext(FriendRequestContext)
    
    const notificationRef = useRef()

    const {user} = useContext(AuthContext)
    const [notifications, setNotifications] = useState(null)

    useEffect(() => {
        console.log(arriveNotification)
        getFriendsRequest(user?.user.id)
            .then(response => {
                setNotifications(response.data)
                sendNotificationLength(response.data.length)
            })
            .catch(err => console.log(err))
    },[newRequest, arriveNotification])

    const handleOnClick = () => {
        notificationRef.current.style.display = "none"
    }

    return(
        <div ref={notificationRef} className="notifications">
            <ul>
                {notifications?.map(notification => {
                    return <FriendRequests key={notification.senderId} senderId={notification.senderId} notificationId={notification.id}/>
                })}
            </ul>
            <div className="notification_close_button">
                <button onClick={handleOnClick}>close</button>
            </div>
            
        </div>
    )
}

export default Notifications
import "./index.css"
import Notifications from "../../components/Notifications";
import { useState } from "react";

const NotificationButton = ({socket}) => {

    const [notificationLength, setNotificationLenght] = useState(null)

    const handleOnClick = () => {
        let notifications = document.querySelector(".notifications")
        notifications.style.display = "flex"
    }

    return(
        <>
        <div onClick={handleOnClick} className="notification_button">
            <div className="notification_button_container">
                <span>&#128276;</span>
            </div>
                {notificationLength > 0 && 
                    <div className="notification_number">
                        <span>{notificationLength}</span>
                    </div>
                }
            </div>
            <Notifications sendNotificationLength={(size) => setNotificationLenght(size)} socket={socket}/>
        </>
        
    )
}

export default NotificationButton
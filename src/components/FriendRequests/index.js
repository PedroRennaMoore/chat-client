import { useContext, useEffect, useState } from "react"
import { createConversation, createFriendShip, deleteFriendRequest, getUserProfile } from "../../services/Api"
import "./index.css"


import { FriendRequestContext } from "../../contexts/friendRequest";
import { AuthContext } from "../../contexts/auth";

const FriendRequests = ({senderId, notificationId}) => {

    const {user, socket} = useContext(AuthContext)

    const {handleNewRequest} = useContext(FriendRequestContext)

    const [sender, setSender] = useState(null)

    useEffect(() => {
        getUserProfile(senderId)
            .then(response => setSender(response.data))
            .catch(err => console.log(err))
    }, [senderId])

    const handleOnClick = async() => {
        
        createFriendShip(senderId)
            .then(() => {
                deleteFriendRequest(notificationId)
                    .catch(err => console.log(err))
                    .finally(() => {
                        createConversation(user?.user.id, senderId)
                            .catch(err => console.log(err))
                            .finally(() => {
                                handleNewRequest()
                                socket.current.emit("NewFriend", senderId)
                            })
                    })
            })
            .catch(err => console.log(err))
        }

    return(
        <li className="request_list">
            <div className="sender_img">
                <img src={sender?.profile_img_url} alt="" />
            </div>
            <div className="sender_info">
                <p>{sender?.name} sent you a friend request</p>
            </div>
            <div className="accept_button">
                <button onClick={handleOnClick}>Accept</button>
            </div>
        </li>
    )
}

export default FriendRequests
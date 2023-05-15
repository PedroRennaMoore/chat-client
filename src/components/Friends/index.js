import { useContext, useEffect, useState } from "react"
import { getConversationIdByMembers, getMessages, getUserProfile } from "../../services/Api"
import "./index.css"
import { AuthContext } from "../../contexts/auth"

const Friend = ({friendId, setCurrentConversation, message, listKey, arrivalMessage}) => {

    const {user} = useContext(AuthContext)

    const [friendProfile, setFriendProfile] = useState(null)
    const [lastMessage, setLastMessage] = useState(null)
    const [conversation, setConversation] = useState(null)

    useEffect(() => {
        getUserProfile(friendId)
            .then(response => setFriendProfile(response.data))
    }, [])

    useEffect(() => {
        getConversationIdByMembers(user?.user.id, friendId)
            .then(response => setConversation(response.data[0]))
            .catch(err => console.log(err))
    }, [])

    useEffect(() => {
        if(conversation) {
            getMessages(user?.user.id, conversation.id)
            .then(response => setLastMessage(response.data[response.data.length -1]?.text))
        }
    },[conversation, message, arrivalMessage])

    return(
            <li key={listKey} className="friend" onClick={() => setCurrentConversation(conversation)}>
                <div className="friend_infos">
                    <div className="friend_img">
                        <img src={friendProfile?.profile_img_url} alt="" />
                    </div>
                    <div className="friend_name_message">
                        <div className="friend_name">
                            <p>{friendProfile?.name}</p>
                        </div>
                        <div className="friend_message">
                            <p>{lastMessage}</p>
                        </div>
                    </div>
                </div>
            </li>    
    )
}

export default Friend
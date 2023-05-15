import { useContext, useEffect, useState } from "react"
import { getUserProfile } from "../../services/Api"
import { AuthContext } from "../../contexts/auth"

import "./index.css"

const FriendInfo = ({currentFriend}) => {

    const {user} = useContext(AuthContext)

    const [friendProfile, setFriendProfile] = useState(null)

    useEffect(() => {
        if(currentFriend) {
            const friendId = currentFriend?.members?.find(member => member !== user?.user.id )
            getUserProfile(friendId)
                .then(response => setFriendProfile(response.data))
                .catch(err => console.log(err))
        }
    },[currentFriend])
    
    return(
        <div className="friend_header_info">
            <div className="friend_header_img">
                <img src={friendProfile?.profile_img_url} alt="" />
            </div>
            <div className="friend_header_name">
                <p>{friendProfile?.name}</p>
            </div>
        </div>
    )
}

export default FriendInfo
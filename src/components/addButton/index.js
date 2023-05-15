import { useContext, useEffect, useState } from "react"
import "./index.css"
import { AuthContext } from "../../contexts/auth"
import { checkFriendRequest, getFriends } from "../../services/Api"

const AddButton = ({onClick, friendId, newRequest}) => {

    const {user} = useContext(AuthContext)
    const [isFriend, setIsFriend] = useState(undefined)
    const [isRequested, setIsRequested] = useState(undefined)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setLoading(true)
        checkFriendRequest(friendId, user?.user.id)
            .then(response => {
                setIsRequested(response.data.isRequested)
                getFriends(user?.user.id)
                .then(response => {
                    if(response.data?.friends.includes(friendId)){
                        setIsFriend(true)
                    } else {
                        setIsFriend(false)
                    }
                })
                .catch(err => console.log(err))
                .finally(() => setLoading(false))
            })
            .catch(err => console.log(err))
    }, [newRequest])
    
    return(
        
        <div className="add_button">
            
            {loading
            ? <button className="loading_button"><div className="loading_animation"></div></button>
            : <button className={isRequested === false && isFriend === false ? "button" : "disabled_button"} onClick={isRequested === false &&  isFriend === false ? onClick : null}>add</button> 
            }
        </div>
    )
}

export default AddButton
import { useEffect, useState, useRef, useContext } from "react"
import "./index.css"
import { createFriendRequest, searchUsersByEmail } from "../../services/Api"
import {AuthContext} from "../../contexts/auth"
import AddButton from "../addButton"

const SearchUsers = () => {

    const {user, socket} = useContext(AuthContext)
    const searchRef = useRef()
    const [query, setQuery] = useState("")
    const [usersFinded, setUsersFinded] = useState(null)
    const [searchError, setSearchError] = useState(null)
    const [loading, setLoading] = useState(true)
    const [newRequest, setNewRequest] = useState(false)

    useEffect(() => {
        setLoading(true)
            searchUsersByEmail(query)
            .then(response => {
                setUsersFinded(response.data)
            })
            .catch(() => setSearchError("Internal Server Error"))
            .finally(() => setLoading(false))
    }, [query])

    const handleOnClick = async(id) => {

        try {
            await createFriendRequest(id, user?.user.id)
            socket.current.emit("SendNotification", id)
            setNewRequest(!newRequest)
            setQuery(query)
        } catch (error) {
            alert(error.response.data)
        }
        
    }

    const closeSearch = () => {
        searchRef.current.style.display = "none"
    }

    return(
        <div ref={searchRef} className="search_users">
            <div className="search_close">
                <button onClick={closeSearch}>close</button>
            </div>
            <div className="search_input">
                <input type="search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Type user email"/>
            </div>
            <div className="finded_users">
                {loading &&
                    <div className="loading">LOADING</div>
                } 
                
                {usersFinded?.length !== 0 && query.trim().length !== 0 && !loading &&
                    <ul>
                        {usersFinded?.map(user => {
                            return <li key={user.email}>
                                <div className="user_img">
                                    <img width={50} height={50} src={user.profile_img_url} alt="" />
                                </div>
                                <div className="user_info">
                                    <p>{user.name}</p>
                                    <p>{user.email}</p>
                                </div>
                                <div className="add_button">
                                         <AddButton onClick={() => handleOnClick(user.id)} friendId={user.id} newRequest={newRequest}/>      
                                </div>
                                
                            </li>
                        })}
                    </ul>
                }
            </div>
        </div>
    )
}

export default SearchUsers
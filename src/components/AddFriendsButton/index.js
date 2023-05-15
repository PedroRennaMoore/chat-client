import "./index.css"
import SearchUsers from "../../components/SearchUsers";

const AddFriends = ({socket}) => {

    const handleOnClick = () => {
        let searchElement = document.querySelector(".search_users")
        searchElement.style.display = "flex"
    }

    return(
        <>
        <div className="add_friends">
            <div className="add_friends_container" onClick={handleOnClick}>
                <span>+</span>
            </div>
        </div>
        <SearchUsers socket={socket}/>
        </>
    )
}

export default AddFriends
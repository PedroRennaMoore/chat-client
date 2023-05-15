import axios from 'axios'

const url = 'https://chat-server-khaki.vercel.app'

export const CreateSesssion = async(email, password) => {
    let endpoint = "/login"

    let response = await axios.post(url + endpoint, {email, password})
    return response
}

export const getUserProfile = async(id) => {
    let endpoint = `/users/${id}`

    let response = await axios.get(url + endpoint)
    return response
}

export const searchUsersByEmail = async(email) => {
    let endpoint = "/users/search"
    let query = `?email=${email}`

    let response = await axios.get(url + endpoint + query)
    return response
}

export const createFriendRequest = async(receiverId, senderId) => {
    let endpoint = "/friendrequest"
    
    let response = await axios.post(url + endpoint, {receiverId, senderId})
    return response
}

export const checkFriendRequest = async(receiverId, senderId) => {
    let endpoint = "/friendrequest/isfriend"
    let response = await axios.post(url + endpoint, {receiverId, senderId})
    return response
}

export const getFriendsRequest = async(id) => {
    let endpoint = `/friendrequest/${id}`

    let response = await axios.get(url + endpoint)
    return response
}

export const getFriends = async(id) => {
    let endpoint = `/users/${id}/friends`

    let response = await axios.get(url+ endpoint)
    return response
}

export const createFriendShip = async(friendId) => {
    let endpoint = `/users/friends`

    let response = await axios.put(url + endpoint, {friendId})
    return response
}

export const deleteFriendRequest = async(id) => {
    let endpoint = `/friendrequest/${id}/delete`

    let response = await axios.delete(url + endpoint)
    return response
}

export const createConversation = async(member1, member2) => {
    let endpoint = "/conversations"

    let response = await axios.post(url + endpoint, {member1, member2})
    return response
}

export const getMessages = async(userId, conversationId) => {
    let endpoint = `/messages/${userId}/${conversationId}`

    let response = await axios.get(url + endpoint)
    return response
}

export const createMessage = async(sender, text, conversationId ) => {
    let endpoint = "/messages"

    let response = await axios.post(url + endpoint, {sender, text, conversationId})
    return response
}

export const getConversationIdByMembers = async(member1, member2) => {
    let endpoint = `/conversations/${member1}/${member2}`

    let response = await axios.get(url + endpoint)
    return response
}
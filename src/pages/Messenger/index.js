import React, { useContext, useEffect, useState, useRef } from "react";
import "./index.css"
import { createMessage, getMessages, getUserProfile } from "../../services/Api";
import { AuthContext } from "../../contexts/auth";
import {AiFillInstagram, AiFillGithub, AiFillLinkedin, AiOutlineSend } from "react-icons/ai"


//components
import AddFriendsButton from "../../components/AddFriendsButton";
import NotificationButton from "../../components/NotificationButton";
import Friend from "../../components/Friends";
import Message from "../../components/Message";
import FriendInfo from "../../components/FriendInfo";

//api
import { getFriends } from "../../services/Api";

//contexts
import { FriendRequestContext } from "../../contexts/friendRequest";


const Messenger = () => {
    const {newRequest, handleArriveNotification, arriveFriend, handleArriveFriend} = useContext(FriendRequestContext)

    const {logout, user, socket} = useContext(AuthContext)

    const messageRef = useRef()

    const [loading, setLoading] = useState(true)
    const [userProfile, setUserProfile] = useState(null)
    const [friends, setFriends] = useState(null)
    const [currentConversation, setCurrentConversation] = useState(null)
    const [messages, setMessages] = useState(null)
    const [text, setText] = useState("")
    const [reRenderMessages, setReRenderMessages] = useState(false)
    const [arrivalMessage, setArrivalMessage] = useState(null)

    useEffect(() => {
        socket.current?.on("GetNotification", (id) => {
            handleArriveNotification()
        })
    },[socket])

    useEffect(() => {
        socket.current.on("GetFriends", (id) => {
            handleArriveFriend()
        })
    }, [socket])

    useEffect(() => {
        socket.current.on("GetMessages", (data) => {
            let now = new Date()
            let saoPauloHour = now.toLocaleString('en-Us', {timeZone: "America/Sao_Paulo", hour12: false})
            setArrivalMessage({
                sender: data.sender,
                text: data.text,
                msg_time: saoPauloHour,
                id: Date.now()
            })
        })
    },[socket])

    useEffect(() => {
        if(messages) {
            if(currentConversation?.members.includes(arrivalMessage?.sender))
            setMessages((prev) => [...prev, arrivalMessage])  
        }
    }, [arrivalMessage])

   
    useEffect(() => {
        socket.current.emit("user", user?.user.id)
        socket.current.on("getUsers", (users) => {
        })
    }, [user])

    useEffect(() => {
        getUserProfile(user?.user.id)
            .then(response => {
                setUserProfile(response.data)
                setLoading(false)
            })
            .catch(err => console.log(err))
    },[user])

    useEffect(() => {
        if(currentConversation) {
            getMessages(user?.user.id, currentConversation?.id)
                .then(response => {
                    setMessages(response.data)
                })
                .catch(err => console.log(err))
        }
    },[currentConversation, reRenderMessages])

    useEffect(() => {
        getFriends(user?.user.id)
            .then(response => setFriends(response.data))
            .catch(err => console.log(err))
    },[newRequest, user, arriveFriend])

    useEffect(() => {
        messageRef.current?.scrollIntoView({behavior: "smooth"})
    }, [messages])

    const handleSetCurrentConversation = (conversationId) => {
        setCurrentConversation(conversationId)
    }

    const sendMessage = async(e) => {
        e.preventDefault()
        if(text.trim().length !== 0) {
            try {
                await createMessage(user?.user.id, text, currentConversation?.id)

                let receiver = currentConversation?.members.find(member => member !== user.user.id)

                let socketOptions = {
                    sender: user.user.id,
                    text,
                    receiver
                }

                setText("")
    
                socket.current.emit("SendMessages", socketOptions)
                setReRenderMessages(!reRenderMessages)
                
            } catch (error) {
                console.log(error)
            }
        }
    }

    const handleLogout = () => {
         logout()
        
    }

    if(loading) {
        return <div className="loading">loading</div>
    }

    return(
        
        <div className="messenger">
            <div className="header">
                <div className="header_items">
                    <div className="user_profile">
                        <div className="profile_img">
                            <img src={userProfile?.profile_img_url} alt="" />
                        </div>
                        <div className="profile_name">
                            <p>{userProfile?.name}</p>
                        </div>
                    </div>
                    <div className="logout">
                        <button onClick={handleLogout}>Logout</button>
                    </div>
                </div>
            </div>
            <div className="body">
                <div className="chat_container">
                {currentConversation
                    ? <>
                        <div className="chat_messages">
                            <div className="friend_info">
                                <FriendInfo currentFriend={currentConversation}/>
                            </div>
                            <div className="messages">
                                <ul>
                                    {messages?.map(message => {
                                        return <Message key={message.id} listKey={message.id} reference={messageRef} message={message} own={message.sender === user?.user.id}/>
                                    })}
                                </ul>
                            </div>
                        </div>
                        <div className="chat_sender">
                            <form>
                                <div className="msg_input">
                                    <textarea value={text}  onChange={(e) => setText(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && sendMessage(e)} placeholder="type a message"></textarea>
                                </div>
                                <div className="msg_sender">
                                    <button onClick={sendMessage} ><AiOutlineSend style={{transform: "translateY(2px)"}} /></button>
                                </div>
                            </form>
                        </div>
                     </>
                    : <div className="select_conversation">
                        <p>Created by <b>Pedro Moore</b></p>
                        <div className="social_media">
                            <a href="https://www.instagram.com/kryerzz" target="_blank" rel="noreferrer"><AiFillInstagram /></a>
                            <a href="https://github.com/PedroRennaMoore/" target="_blank" rel="noreferrer"><AiFillLinkedin /></a>
                            <a href="https://www.linkedin.com/in/pedrorennamoore/" target="_blank" rel="noreferrer"><AiFillGithub /></a>
                        </div>
                    </div>
                }
                </div>
                <div className="friends_container">
                    <ul>
                        {friends?.friends.map(friend => {
                            return <Friend key={friend} listKey={friend} friendId={friend} setCurrentConversation={handleSetCurrentConversation} message={messages} arrivalMessage={arrivalMessage}/>
                        })}
                    </ul>
                </div>
            </div>
            <NotificationButton socket={socket} />
            <AddFriendsButton socket={socket}/>
        </div>  
    )
}

export default Messenger
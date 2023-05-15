import { useEffect, useState } from "react"
import "./index.css"

const Message = ({message, own, reference}) => {


    const [hour, setHour] = useState("")

    useEffect(() => {
        let now = new Date()
        let hour = now.getHours()
        let saoPauloHour = now.toLocaleString('en-Us', {timeZone: "America/Sao_Paulo", hour12: false}).slice(11,13)
        let timeZoneDifference = (hour - saoPauloHour)
        let messageHour = +message?.msg_time.slice(11, 13)+1
        let messageMinute = message?.msg_time.slice(14, 16)
        let currentMsgHour = messageHour + timeZoneDifference
        
        setHour(`${currentMsgHour}:${messageMinute}`)
    },[])

    return(
        <li ref={reference} className={own ? "message own" : "message"}>
            <div className="message_text">
                <p>{message.text}</p>
                <p className="hour">{hour}</p>
            </div>
        </li>
    )
}

export default Message
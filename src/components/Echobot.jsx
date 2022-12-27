import React, { useRef, useState } from 'react';
import styles from './Echobot.module.css'
import createChannel from '../utils/createChannel';
import ChatService from '../services/ChatService';


export default function Echobot() {
    const channel = useRef(createChannel());
    const apiRequest = channel.current.request;
    const apiController = channel.current.controller;
    const chatService = new ChatService(apiRequest);

    // declare initial state's
    const [outGoingMessage, setOutGoingMessage] = useState([]);
    const [inComingMessage, setInComingMessage] = useState([]);
    const [lastMessage, setLastMessage] = useState([]);

    console.log("oooo", outGoingMessage)
    const handleInputChange = (e) => {
        e.preventDefault();
        // const value = e.target.value
        setOutGoingMessage([e.target.value])
        // setLastMessage([...lastMessage, outGoingMessage])
    }
    // send message to API
    const sendCustomerMessage = (e) => {
        e.preventDefault();
        console.log("message------>>", outGoingMessage[outGoingMessage.length - 1])
        const payload = {
            textMessage: outGoingMessage
        }
        console.log("PAYLOAD ------->>", payload);
        chatService
            .sendCustomerMessage(payload)
            .then((res) => {
                console.log("RESPONSE------>>", res.data.data)
                setInComingMessage([...inComingMessage, res.data.data])
            })
            .catch((err) => {
                console.log("ERROR 💥", err)
            })
    }

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h2 className={styles.headerContent}>Canlı Destek</h2>
            </div>
            <div className={styles.content}>
                <div className={outGoingMessage.length && styles.outGoingMessage}>{outGoingMessage}</div>
                <div className={inComingMessage.length && styles.inComingMessage}>{inComingMessage}</div>
            </div>
            <div className={styles.textArea}>
                <form className={styles.form} onSubmit={sendCustomerMessage}>
                    {/* <label></label> */}
                    <input id='textArea' className={styles.input} placeholder="Mesajınızı yazınız..." onChange={handleInputChange}></input>
                    <button className={styles.button} onClick={sendCustomerMessage}>Gönder</button>
                </form>
            </div>
        </div>
    )
};
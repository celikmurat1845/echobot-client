import React, { useRef, useState } from 'react';
import styles from './Echobot.module.css'
import createChannel from '../utils/createChannel';
import ChatService from '../services/ChatService';


export default function Echobot() {
    const channel = useRef(createChannel());
    const apiRequest = channel.current.request;
    const chatService = new ChatService(apiRequest);

    // declare initial state and ref
    const [allMessages, setAllMessages] = useState([]);
    const inputRef = useRef();

    // send message to API
    const sendCustomerMessage = (e) => {
        e.preventDefault();
        // setAllMessages([...allMessages, { from: "customer", msg: inputRef.current.value }])

        const payload = {
            textMessage: inputRef.current.value
        };

        chatService
            .sendCustomerMessage(payload)
            .then((res) => {
                setAllMessages([...allMessages, { from: "customer", msg: inputRef.current.value }, { from: "server", msg: res.data.data }])
                inputRef.current.value = '';
            })
            .catch((err) => {
                console.log("ERROR 💥", err)
            })
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h2 className={styles.headerContent}>Canlı Destek</h2>
            </div>
            <div className={styles.content}>
                {allMessages.length > 0 && allMessages?.map((message, index) => {
                    return (
                        <div key={index} className={message.from === "customer" ? styles.outGoingMessage : styles.inComingMessage}><p>{message.msg}</p></div>
                    )
                })}
            </div>
            <div className={styles.textArea}>
                <form className={styles.form} onSubmit={sendCustomerMessage}>
                    <input ref={inputRef} id='textArea' className={styles.input} placeholder="Mesajınızı yazınız..."></input>
                    <button className={styles.button} type='submit'>Gönder</button>
                </form>
            </div>
        </div>
    )
};
import { Avatar } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import db from './firebase';
import './SidebarChat.css';

function SidebarChat({ id, name, addNewChat }) {

    const [seed, setSeed] = useState('');
    const [messages, setMessages] = useState('');

    useEffect(() => {
        if(id)
        {
            db.collection('rooms').doc(id)
            .collection('messages').orderBy('timestamp', 'desc')
            .onSnapshot(snap => (
                setMessages(snap.docs.map((doc) => doc.data()))
            ))
        }      
    }, [id])

    useEffect(() => {
      
        setSeed(Math.floor(Math.random() * 5000));
    
    }, [])

       
    const createChat = () => {
        const RoomName = prompt('Digite o nome da sala');

        if (RoomName) {

            db.collection('rooms').add({
                name: RoomName
            });
        }

    };

    return !addNewChat ? ( 
        <Link to={`/rooms/${id}`}>
           <div className='sidebarChat' >
                <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
                <div className="sidebarChat__info">
                    <h2> {name} </h2>
                    <p>{ messages[0]?.message }</p>
                </div>
            </div>     
        </Link>
        
    )
    :
    (
        <div onClick={createChat} className="sidebarChat"><h2> Adicionar Chat </h2></div>
    )
}

export default SidebarChat
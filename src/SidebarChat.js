import { Avatar } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import db from './firebase';
import './SidebarChat.css';

function SidebarChat({ id, name, addNewChat }) {

    const [seed, setSeed] = useState('');



    useEffect(() => {
      
        setSeed(Math.floor(Math.random() * 5000));
    
    }, [])

       
    const createChat = () => {
        const RoomName = prompt('Disite o nome da sala');

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
                    <p>Last message ...</p>
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
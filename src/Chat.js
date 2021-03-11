import { Avatar, IconButton } from '@material-ui/core';
import { AttachFile, InsertEmoticon, Mic, MoreVert, SearchOutlined } from '@material-ui/icons';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './Chat.css';
import db from './firebase';

function Chat() {


    const [seed, setSeed] = useState('')
    const [input, setInput] = useState('')
    const { roomId } = useParams();
    const [rooName, setRoomName] = useState('')

    useEffect(() => {
        if(roomId){
            db.collection('rooms').doc(roomId)
            .onSnapshot( snapshot => {
                setRoomName(snapshot.data().name);
            })
        }        
    }, [roomId])

    useEffect(() => {
      
        setSeed(Math.floor(Math.random() * 5000));
    
    }, [roomId]);

    const SendMessage = (e) => {
        e.preventDefault();
        console.log('Voce escreveu >> ', input);
        setInput('');
    }

    return (
        <div className='chat'>
                <div className="chat__header">
                    <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />

                    <div className="chat__headerInfo">
                        <h3>{rooName}</h3>
                        <p> Ultima vez visto</p>
                    </div>

                    <div className="chat_headerRight">
                        <IconButton>
                            <SearchOutlined />
                        </IconButton>
                        <IconButton>
                            <AttachFile />
                        </IconButton>
                        <IconButton>
                            <MoreVert />
                        </IconButton>
                        

                    </div>
                </div>
                <div className="chat__body">
                        <p className={`chat__message ${true && `chat__reciever`}`}>
                            <span className="chat__name">Douglas</span>
                            Ola pessoal
                            <span className="chat__timestamp">13:52</span>                       
                        </p>
                        
                        
                </div>
                <div className="chat__footer">
                    <InsertEmoticon /> 
                    <form>
                       <input value={input} 
                       onChange={ (e) => setInput(e.target.value) } 
                       placeholder="Escreva sua mensagem" 
                       text="text"  />

                       <button type="submit"  onClick={SendMessage}  >Send a message</button> 
                    </form> 
                    <Mic />
                </div>   
        </div>
    )
}

export default Chat

import { Avatar, IconButton } from '@material-ui/core';
import { AttachFile, InsertEmoticon, MessageSharp, Mic, MoreVert, SearchOutlined } from '@material-ui/icons';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './Chat.css';
import db from './firebase';
import { UseStateValue } from './StateProvider';
import firebase from 'firebase';

function Chat() {


    const [seed, setSeed] = useState('')
    const [input, setInput] = useState('')
    const { roomId } = useParams();
    const [rooName, setRoomName] = useState('')
    const [messages, setMessages] = useState([])
    const [{ user }, dispatch] = UseStateValue();

    useEffect(() => {
        if(roomId){
            
            db.collection('rooms').doc(roomId)
            .onSnapshot( snapshot => {
                setRoomName(snapshot.data().name);
            })

            db.collection('rooms').doc(roomId)
            .collection('messages').orderBy('timestamp', 'asc')
            .onSnapshot( snapshot => {
                setMessages(
                    snapshot.docs.map(doc => 
                            doc.data()
                        )
                    );
            })

        }        
    }, [roomId])

    useEffect(() => {
      
        setSeed(Math.floor(Math.random() * 5000));
    
    }, [roomId]);

    const SendMessage = (e) => {
        e.preventDefault();
        console.log('Voce escreveu >> ', input);

        db.collection('rooms').doc(roomId)
            .collection('messages').add({
                message: input,
                name: user.displayName,
                timestamp: firebase.firestore.FieldValue.serverTimestamp()
            })


        setInput('');
    }

    return (
        <div className='chat'>
                <div className="chat__header">
                    <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />

                    <div className="chat__headerInfo">
                        <h3>{rooName}</h3>
                        <p> Ultima vez visto
                            {
                                new Date(messages[messages.length - 1]?.timestamp?.toDate()).toLocaleDateString()
                            } 
                            { " as " }
                            {
                               new Date(messages[messages.length - 1]?.timestamp?.toDate()).toLocaleTimeString() 
                            }
                        </p>
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
                    { messages.map( (message) => (
                        
                        <p className={`chat__message ${
                            message.name === user.displayName
                            && `chat__reciever`}`}>
                            <span className="chat__name">{message.name}</span>
                            {message.message}
                            <span className="chat__timestamp">
                                {
                                    new Date(message.timestamp?.toDate()).toLocaleDateString()
                                }
                                &nbsp; 
                                {
                                    new Date(message.timestamp?.toDate()).toLocaleTimeString()
                                }
                            </span>                       
                        </p>

                    )) }
                        
                </div>
                <div className="chat__footer">
                    <InsertEmoticon /> 
                    <form>
                       <input value={input} 
                       onChange={ (e) => setInput(e.target.value) } 
                       placeholder="Escreva sua mensagem" 
                       text="text"  />

                       <button type="submit"  onClick={SendMessage} >Send a message</button> 
                    </form> 
                    <Mic />
                </div>   
        </div>
    )
}

export default Chat

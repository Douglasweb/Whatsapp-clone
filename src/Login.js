import { Button } from '@material-ui/core'
import React from 'react'
import { auth, provider } from './firebase'
import './Login.css'
import { actionTypes } from './reducer'
import { UseStateValue } from './StateProvider'

function Login() {

    const [{}, dispatch] = UseStateValue();

    const signIn = () => {
        
        auth.signInWithPopup(provider)
        .then( result => 
            dispatch({
               type: actionTypes.SET_USER,
               user: result.user 
            })
            )
        .catch(error => alert( error.message ));

    }
    
    return (
        <div className='Login'>
            <div className="login__container">
                <img src="https://logodownload.org/wp-content/uploads/2015/04/whatsapp-logo-1.png"  alt="" />

                <div className="login__text">
                    <h1>Sign in Whatsapp</h1>
                </div>

                <Button  onClick={signIn}>
                    Sign In with Google
                </Button>

            </div>
        </div>
    )
}

export default Login

import React, { useState } from 'react';
import {  Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import './App.css';
import Chat from './Chat';
import Login from './Login';
import Sidebar from './Sidebar';
import { UseStateValue } from './StateProvider';

function App() {

  const [{user}, dispatch] = UseStateValue();

  return (

    <div className="app">
        

        
          {!user ? 
          (
            <Login/>
          ) 
          : 
          (
            <div className="app__body">
              <Router>
                <Sidebar />
                <Switch>
                  <Route path="/rooms/:roomId">                
                    <Chat />
                  </Route>
                      
                  <Route path="/">
                    <Chat />
                  </Route>
                    
                </Switch>
              </Router>
              
            </div>
          )
          }
          

        
        

    </div>

   
  );
}

export default App;
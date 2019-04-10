import React, {Component} from 'react';
import NavBar from './NavBar.jsx';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';
import { getMessages } from "./message-svc";
import { addMessage } from "./message-svc";
const uuidv4 = require('uuid/v4');
const clientID = uuidv4();
console.log("Client: " +  clientID + " started ...");

// let ws; // Public Websocket, not created yet.

// function wsInitialization() {
//   ws = new WebSocket("ws://localhost:3001");
//   console.log("[***] >>> Init: WebSocket Client-side Created ...");

//   ws.onopen = function (event) {
//     console.log("[***] >>> Init: Sending a Message to the server ...");
//     var msg = {
//       type: "test",
//       text: "[***] >>> Init: Hello, this is Hao Jiang's Chatty App Client-side.",
//       id:   clientID,
//       date: Date.now()
//     };
//     ws.send(JSON.stringify(msg)); 
//   };
// }

// Send text to all users through the server
// function wsSendMessageToServer (message) {
//   // Construct a msg object containing the data the server needs to process the message from the chat client.
//   var msg = {
//     type: "message",
//     text: message,
//     id:   clientID,
//     date: Date.now()
//   };
//   // Send the msg object as a JSON-formatted string.
//   console.log("[***] >>> A new message is generated...", msg);
//   ws.send(JSON.stringify(msg));
// }

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      currentUser: {name: ""},
      
      messages: [
        // {
        //   id: 1,
        //   username: "Bob",
        //   content: "Has anyone seen my marbles?",
        // },
        // {
        //   id: 2,
        //   username: "Anonymous",
        //   content: "No, I think you lost them. You lost your marbles Bob. You lost them for good."
        // }
      ]
    };
    this.newMessage = this.newMessage.bind(this);
    // this.refreshMessage = this.refreshMessage.bind(this);
    this.wsc = new WebSocket("ws://localhost:3001");
  }

  

  newMessage(message){
    // Construct a msg object containing the data the server needs to process the message from the chat client.
    var msg = {
      type: "message",
      text: message,
      id:   clientID,
      date: Date.now()
    };
    // Send the msg object as a JSON-formatted string.
    console.log("[***] >>> A new message is generated...", msg);
    this.wsc.send(JSON.stringify(msg));
    
    
  }
  
  componentDidMount() {

    

    //wsInitialization();
    console.log("[***] >>> Init: WebSocket Client-side Created ...");

    this.wsc.onopen = function (event) {
      console.log("[***] >>> Init: Sending a Message to the server ...");
      var msg = {
        type: "test",
        text: "[***] >>> Init: Chatty App Client-side connected.",
        id:   clientID,
        date: Date.now()
      };
      console.log("this = ", this);
      this.send(JSON.stringify(msg)); 
    };

    this.wsc.onmessage =  (event) => {
      const dataJson = JSON.parse(event.data);
      const dataType = dataJson.type;
      if(dataType === "message") {
        addMessage(dataJson.text).then(mesage => {
  
          getMessages().then(messages => {
            
            this.setState({
              loading: false,
              currentUser: {name: ""},
              messages: messages
            });
            
          });
        });
        
      } else {
        console.log("[***] >>> test type message", dataJson.text);
      }
    }

    setTimeout(() => {
      // Add a new message to the list of messages in the data store
      // const newMessage = {id: 3, username: "Michelle", content: "Hello there!"};
      // const messages = this.state.messages.concat(newMessage)
      // Update the state of the app component.
      // Calling setState will trigger a call to render() in App and all child components.
      // this.setState({messages: messages})
      getMessages().then(messages => {
        this.setState({
          loading: false,
          currentUser: {name: ""},
          messages: messages
        });
      });
    }, 2000);
  }

  render() {
    return (
      <div className="container">
        <NavBar />
        <MessageList messages={this.state.messages} loading={this.state.loading}/>
        <ChatBar currentUser={this.state.currentUser.name} newMessage={this.newMessage} />
      </div>
    );
  }
}
export default App;

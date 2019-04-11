import React, {Component} from 'react';
import NavBar from './NavBar.jsx';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';
import { getMessages } from "./message-svc";
import { addMessage } from "./message-svc";
import { generateUserInfo } from "./utils";

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      notification: "Messages Loading ...",
      currentUser: generateUserInfo(),
      messages: [],
      userOnline: 1
    };
    this.newMessage = this.newMessage.bind(this);
    this.wsc = new WebSocket("ws://localhost:3001");
  }

  // A new message is submit by client and send to server
  newMessage(message){
    // Construct a msg object containing the data the server needs to process the message from the chat client.
    var msg = {
      type: "message",
      text: message,
      user: this.state.currentUser,
      date: Date.now()
    };
    // Send the msg object as a JSON-formatted string.
    console.log(`[${this.state.currentUser.name}] >>> A new message is submitted:`);
    console.log("   ", msg);
    this.wsc.send(JSON.stringify(msg));
  }
  
  componentDidMount() {
    // Web Socket Opening
    this.wsc.onopen = (event) => {
      var msg = {
        type: "test",
        text: `[${this.state.currentUser.name}] >>> Client-side connected.`,
        user: this.state.currentUser,
        date: Date.now()
      };
      this.wsc.send(JSON.stringify(msg)); 
    };
    // Web Socket Message Receiving (Timely)
    this.wsc.onmessage = (event) => {
      const dataJson = JSON.parse(event.data);
      const dataType = dataJson.type;
      switch(dataType) {
        case "message": {
          addMessage(dataJson.text).then(newMessage => {
            let notification = "";
            if(this.state.currentUser.name !== newMessage.username) {
              notification = `${this.state.currentUser.name} has changed name to ${newMessage.username}`;
            }         
            getMessages().then(messages => {
              this.setState({
                notification: notification,
                currentUser: {name: newMessage.username},
                messages: messages
              });
            });
          });
          break;
        }
        case "test": console.log(dataJson.text); break;
        case "userOnline": {
          this.setState({
            userOnline: dataJson.text
          });
          break;
        }
        default: console.log("Data Type Unknown... ", dataType); break;
      }
    }
    // After 1s, show the original message list
    setTimeout(() => {
      getMessages().then(messages => {
        this.setState({
          notification: "",
          messages: messages
        });
      });
    }, 1000);
  }

  render() {
    return (
      <div className="container">
        <NavBar userOnline={this.state.userOnline}/>
        <MessageList currentUserName={this.state.currentUser.name} messages={this.state.messages} notification={this.state.notification}/>
        <ChatBar currentUserName={this.state.currentUser.name} newMessage={this.newMessage} />
      </div>
    );
  }
}
export default App;

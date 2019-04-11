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
      system: "Message History Loading ...",
      currentUser: generateUserInfo(),
      messages: []
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
      if(dataType === "message") {
        addMessage(dataJson.text).then(newMessage => {
          let systemInfo = "";
          if(this.state.currentUser.name !== newMessage.username) {
            systemInfo = `${this.state.currentUser.name} has changed name to ${newMessage.username}`;
          }         
          getMessages().then(messages => {
            this.setState({
              system: systemInfo,
              currentUser: {name: newMessage.username},
              messages: messages
            });
          });
        });
      } else {
        console.log(dataJson.text);
      }
    }
    // After 1s, show the original message list
    setTimeout(() => {
      getMessages().then(messages => {
        this.setState({
          system: "",
          messages: messages
        });
      });
    }, 500);
  }

  render() {
    return (
      <div className="container">
        <NavBar />
        <MessageList currentUserName={this.state.currentUser.name} messages={this.state.messages} sysInfo={this.state.system}/>
        <ChatBar currentUserName={this.state.currentUser.name} newMessage={this.newMessage} />
      </div>
    );
  }
}
export default App;

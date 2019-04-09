import React, {Component} from 'react';
import NavBar from './NavBar.jsx';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';
import { getMessages } from "./message-svc";
import { addMessage } from "./message-svc";

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
  }

  newMessage(message){
    // const oldMessages = this.state.messages;
    // const newMessages = [...oldMessages, message];
    // this.setState({ 
    //   loading: false, 
    //   currentUser: {name: message.username},
    //   messages: newMessages
    // });
    // this.setState({
    //   loading: false
    // });
    addMessage(message).then(message => {

      getMessages().then(messages => {
        this.setState({
          loading: false,
          messages: messages
        });
      });
    });

  }

  componentDidMount() {
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

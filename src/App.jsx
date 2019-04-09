import React, {Component} from 'react';
import { generateRandomId } from "./utils";

class NavBar extends Component {
  render() {
    console.log("Rendering <NavBar />");
    return (
      <nav className="navbar">
        <a href="/" className="navbar-brand">Chatty</a>
      </nav>
    );
  }
}

class MessageItem extends Component {
  render() {
    return (
      <div className="message">
        <span className="message-username">{this.props.username}</span>
        <span className="message-content">{this.props.content}</span>
      </div>
    );
  }
}

class MessageList extends Component {
  render() {
    console.log("Rendering <MessageList />");
    return (
      <main className="messages">
        {
          this.props.messages.map(message => {
            return (
              <MessageItem
                key={message.id}
                username={message.username}
                content={message.content}  
              />
            )
          })
        }
        {/* <div className="message system">
          This is text area from message system.
        </div> */}
      </main>
    );
  }
}

class ChatBar extends Component {
  render() {
    console.log("Rendering <ChatBar />");
    const onSubmit = evt => {
      evt.preventDefault();
      const userNameInput = evt.target.elements.userName;
      const contentInput = evt.target.elements.contentInput;
      const new_message = {
        id: generateRandomId(),
        username: userNameInput.value,
        content: contentInput.value
      };
      this.props.newMessage(new_message);
      userNameInput.value = "";
      contentInput.value = "";
    };

    return (
      <form onSubmit={onSubmit}>
        <footer className="chatbar">
          <input name="userName" className="chatbar-username" placeholder="Your Name (Optional)" defaultValue={this.props.currentUser}/>
          <input name="contentInput" className="chatbar-message" placeholder="Type a message and hit ENTER / click Submit button" />
          <button type="submit">Submit</button>
        </footer>
      </form>
    );
  }
}

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      currentUser: {name: "Bob"}, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: [
        {
          id: 1,
          username: "Bob",
          content: "Has anyone seen my marbles?",
        },
        {
          id: 2,
          username: "Anonymous",
          content: "No, I think you lost them. You lost your marbles Bob. You lost them for good."
        }
      ]
    };
    this.newMessage = this.newMessage.bind(this);
  }

  newMessage(message){
    console.log(">>> message = ", message);
    const oldMessages = this.state.messages;
    console.log(">>> oldMessages = ", oldMessages);
    const newMessages = [...oldMessages, message];
    console.log(">>> newMessages = ", newMessages);
    this.setState({ 
      loading: false, 
      currentUser: {name: message.username},
      messages: newMessages
    });
  }

  componentDidMount() {
    //console.log("componentDidMount <App />");
    // setTimeout(() => {
    //   // Add a new message to the list of messages in the data store
    //   const newMessage = {id: 3, username: "Michelle", content: "Hello there!"};
    //   const messages = this.state.messages.concat(newMessage)
    //   // Update the state of the app component.
    //   // Calling setState will trigger a call to render() in App and all child components.
    //   this.setState({messages: messages})
    // }, 3000);
  }

  render() {
    return (
      // Main Container
      <div className="container">
        <NavBar />
        <MessageList messages={this.state.messages}/>
        <ChatBar currentUser={this.state.currentUser.name} newMessage={this.newMessage} />
      </div>
    );
  }
}
export default App;

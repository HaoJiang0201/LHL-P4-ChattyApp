import React, {Component} from 'react';
import Notification from './Notification.jsx';
import MessageItem from './MessageItem.jsx';

class MessageList extends Component {
    render() {
        const MessageArea = (
            this.props.messages.map(message => {
                if(message.username === "") {
                    return (
                        <Notification key={message.id} notification={message.content} />
                    )
                } else {
                    return (
                        <MessageItem
                            key={message.id}
                            username={message.username}
                            color={message.color}
                            content={message.content}  
                        />
                    )
                }                
            })
        );

        return (
            <main className="messages">
                { MessageArea }
                <Notification notification={this.props.notification} />
            </main>
        );
    }
}
export default MessageList;
  
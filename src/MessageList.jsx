import React, {Component} from 'react';
import Notification from './Notification.jsx';
import MessageItem from './MessageItem.jsx';

class MessageList extends Component {
    render() {
        const MessageArea = (
            this.props.messages.map(message => {
                return (
                    <MessageItem
                        key={message.id}
                        username={message.username}
                        content={message.content}  
                    />
                )
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
  
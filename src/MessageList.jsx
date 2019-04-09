import React, {Component} from 'react';
import Loading from './Loading.jsx';
import MessageItem from './MessageItem.jsx';

class MessageList extends Component {
    render() {
        const MessageArea = this.props.loading ? (
            <Loading />
            ) : (
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
            </main>
        );
    }
}
export default MessageList;
  
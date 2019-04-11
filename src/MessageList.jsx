import React, {Component} from 'react';
import SysInfo from './SysInfo.jsx';
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
                <SysInfo sysInfo={this.props.sysInfo} />
            </main>
        );
    }
}
export default MessageList;
  
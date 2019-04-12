import React, {Component} from 'react';
import ContentArea from './ContentArea.jsx';
import { generateRandomId } from "./utils";

class MessageItem extends Component {
    render() {
        let content = this.props.content;
        let contentArea;
        let reg = /(http(s?):)([/|.|\w|\s|-|\;|\=|\-])*\.(png|jpg|jpeg|gif|png|svg)/g;
        let imgUrlArray = content.match(reg);
        if(imgUrlArray) {
            let contentArray = [];
            for(let imgUrl of imgUrlArray) {
            let text = content.split(imgUrl)[0];
            content = content.split(imgUrl)[1];
            if(text) {
                contentArray.push({type:0, text: text});
            }
            contentArray.push({type:1, text: imgUrl});
            if(content && content.search(reg) < 0) {
                contentArray.push({type:0, text: content});
            }
            }
            contentArea = (
                contentArray.map(content => {
                    let id = generateRandomId();
                    return (
                        <ContentArea
                            key={id}
                            content={content}
                        />
                    )
                })
            );
        } else {
            contentArea = (<span>{content}</span>);
        }
        
        return (
            <div className="message">
                <span className="message-username" style={{ color: this.props.color }}>{this.props.username}</span>
                <div className="message-content">
                    {contentArea}
                </div>
            </div>
        );
    }
}

export default MessageItem;
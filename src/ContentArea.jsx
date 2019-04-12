import React, {Component} from 'react';

class ContentArea extends Component {
    render() {
        if(this.props.content.type === 0) {
            return (
                <div>
                    <span >{this.props.content.text}</span>
                    <br/>
                </div>
            );
        } else {
            return (
                <div>
                    <img src={this.props.content.text} className="message-image" />
                    <br/>
                </div>
            );
        }
    }
}

export default ContentArea;
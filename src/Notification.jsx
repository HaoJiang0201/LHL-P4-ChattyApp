import React, {Component} from 'react';

class Notification extends Component {
    render() {
        return (
            <div className="message system">
                <span className="notification-content">{this.props.notification}</span>
                {/* {this.props.notification} */}
            </div>
        );
    }
}

export default Notification;
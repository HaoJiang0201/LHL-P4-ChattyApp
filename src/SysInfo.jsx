import React, {Component} from 'react';

class SysInfo extends Component {
    render() {
        return (
            <div className="message system">
                {this.props.sysInfo}
            </div>
        );
    }
}

export default SysInfo;
import React, {Component} from 'react';

class NavBar extends Component {
    render() {
        return (
            <nav className="navbar">
                <a href="/" className="navbar-brand">Chatty</a>
                <span className="online-user">{this.props.userOnline} Users Online</span>
            </nav>
        );
    }
}
export default NavBar;
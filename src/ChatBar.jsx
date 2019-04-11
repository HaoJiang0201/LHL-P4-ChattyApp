import React, {Component} from 'react';
import { generateRandomId } from "./utils";

class ChatBar extends Component {
    render() {
        const onSubmit = evt => {
            evt.preventDefault();
            const userNameInput = evt.target.elements.userName;
            let userNameTrim = userNameInput.value.trim();
            if(userNameTrim.length === 0) {
                userNameTrim = "Anonymouse";
            }
            const contentInput = evt.target.elements.contentInput;
            const contentTrim = contentInput.value.trim();
            if(contentTrim.length === 0) {
                alert("Message is empty! Please input something.")
            } else {
                const new_message = {
                    //id: generateRandomId(),
                    username: userNameTrim,
                    content: contentInput.value
                };
                this.props.newMessage(new_message);
                //userNameInput.value = "";
                contentInput.value = "";
            }
        };

        return (
            <form onSubmit={onSubmit}>
                <footer className="chatbar">
                <input name="userName" className="chatbar-username" placeholder="Your Name (Optional)" defaultValue={this.props.currentUserName}/>
                <input name="contentInput" className="chatbar-message" placeholder="Type a message and hit ENTER / click Submit button" />
                <button className="chatbar-submit-btn" type="submit">Submit</button>
                </footer>
            </form>
        );
    }
}
export default ChatBar;
import messages from "./message.json";
import { generateRandomId } from "./utils";

function delay(t) {
  return new Promise(res => {
    setTimeout(res, t);
  });
}

const delayResolve = (value, t = 100) => {
  return delay(t).then(() => value);
};

export const getMessages = () => delayResolve(messages.map(message => ({ ...message })));

export const addMessage = messageInfo => {
  const newMessage = {
    id: generateRandomId(),
    username: messageInfo.username,
    content: messageInfo.content
    
  };
  messages.push(newMessage);
  return delayResolve({ ...newMessage });
};
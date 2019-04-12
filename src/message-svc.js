import messages from "./message.json";
import { generateRandomId } from "./utils";

function delay(t) {
  return new Promise(res => {
    setTimeout(res, t);
  });
}

const delayResolve = (value, t = 1) => {
  return delay(t).then(() => value);
};

export const getMessages = () => delayResolve(messages.map(message => ({ ...message })));

export const addMessage = messageInfo => {
  // const newMessage = {
  //   id: messageInfo.id,
  //   username: messageInfo.username,
  //   content: messageInfo.content
  // };
  messages.push(messageInfo);
  return delayResolve({ ...messageInfo });
};
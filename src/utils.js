export const generateRandomId = (alphabet => {
  const alphabetLength = alphabet.length;
  const randoIter = (key, n) => {
    if (n === 0) {
      return key;
    }
    const randoIndex = Math.floor(Math.random() * alphabetLength);
    const randoLetter = alphabet[randoIndex];
    return randoIter(key + randoLetter, n - 1);
  };
  return () => randoIter("", 5);
})("0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ");

export const generateUserInfo = () => {
  let userInfo = {};
  userInfo.id = generateRandomId();
  let name = "";
  switch(Math.floor(Math.random() * 10)){
    case 0: name = "Amy"; break;
    case 1: name = "Bob"; break;
    case 2: name = "Cathy"; break;
    case 3: name = "Dodge"; break;
    case 4: name = "Nick"; break;
    case 5: name = "Kate"; break;
    case 6: name = "Loopy"; break;
    case 7: name = "Irien"; break;
    case 8: name = "Rusy"; break;
    case 9: name = "Pola"; break;
    default: name = "Zark"; break;
  }
  userInfo.name = name;
  return userInfo;
}
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
  let color = "Black";
  switch(Math.floor(Math.random() * 10)){
    case 0: name = "Amy"; color = "DarkSlateGray"; break;
    case 1: name = "Bob"; color = "MidnightBlue"; break;
    case 2: name = "Cathy"; color = "DarkSlateBlue"; break;
    case 3: name = "Dodge"; color = "DarkRed"; break;
    case 4: name = "Nick"; color = "DimGray"; break;
    case 5: name = "Kate"; color = "SaddleBrown"; break;
    case 6: name = "Loopy"; color = "Indigo"; break;
    case 7: name = "Irien"; color = "SteelBlue"; break;
    case 8: name = "Rusy"; color = "Teal"; break;
    case 9: name = "Pola"; color = "DarkOliveGreen"; break;
    default: name = "Zark"; color = "Black"; break;
  }
  userInfo.name = name;
  userInfo.color = color;
  return userInfo;
}